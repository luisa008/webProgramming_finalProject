import { EventModel, UserModel } from "./models/meet";

const showingEvents = {}

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data)); 
};

const makeEventId = async () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    var exists = true;
    var id;
    while (exists) {
        id = '';
        for ( var i = 0; i < 10; i++ ) {
            id += chars.charAt(Math.floor(Math.random() * 26));
        }
        exists = await EventModel.findOne({id});
    }
    return id;
}

export default {
    onMessage: (ws, wss) => (
        async (byteString) => {
            const { data } = byteString;
            const [task, payload] = JSON.parse(data);
            console.log(`task: ${task}\npayload: ${JSON.stringify(payload)}`);
            
            switch (task) {
                // receive username & return user data
                case "homepage": {
                    const username = payload;
                    
                    let user = await UserModel.findOne({username});
                    if (!user) {
                        user = await new UserModel({
                            username: username,
                            events: [],
                            eventSubmitted: new Map([]),
                        });
                        await user.save;
                    }

                    ws.user = user;
                    if (ws.state === "show" && showingEvents[ws.eventId] && showingEvents[ws.eventId].has(ws)) {
                        showingEvents[ws.eventId].delete(ws);
                    }
                    ws.state = "homepage";
                    ws.eventId = "";
                    
                    await user.populate({ path: "events", select: [
                        "id",
                        "name",
                        "creator",
                        "pplNum",
                    ]});
                    sendData(["homepage", user], ws);
                    break;
                }

                // receive list of dates & return updated user data
                case "createEvent": {
                    const { name, form } = payload;
                    const id = await makeEventId();
                    const user = ws.user;

                    const event = new EventModel({
                        id: id,
                        name: name,
                        creator: user.username,
                        pplNum: 1,
                        pplNames: [user.username],
                        pplSubmitted: {[user.username]: false},
                        timeSlots: [],
                    })
                    form.forEach((time) => {
                        var tempTime = [];
                        time.forEach((timeOfDay) => {
                            tempTime.push({
                                date: timeOfDay.date,
                                time: timeOfDay.time,
                                availableNum: 0,
                                availablePpl: [],
                                notAvailablePpl: [user.username],
                                isAvailable: {[user.username]: false},
                            })
                        })
                        event.timeSlots.push(tempTime);
                    })
                    await event.save();

                    user.events.push(event._id);
                    user.eventSubmitted.set(event.id, false);
                    await user.save();

                    await user.populate({ path: "events", select: [
                        "id",
                        "name",
                        "creator",
                        "pplNum",
                    ]});
                    sendData(["homepage", user], ws);
                    console.log(JSON.stringify(event));
                    break;
                }

                // receive event Id & return updated user data
                case "joinEvent": {
                    const id = payload;
                    const user = ws.user;

                    const event = await EventModel.findOne({id});
                    if (!event) {
                        console.log("not found");
                        sendData(["error", "Event not found!"], ws);
                        break;
                    }
                    if (event.pplNames.includes(user.username)) {
                        console.log("already joined!");
                        sendData(["error", "Alreadly joined this event!"], ws);
                        break;
                    }
                    event.pplNum += 1;
                    event.pplNames.push(user.username);
                    event.pplSubmitted.set(user.username, false);
                    event.timeSlots.forEach((time) => {
                        time.forEach((timeOfDay) => {
                            timeOfDay.notAvailablePpl.push(user.username);
                            timeOfDay.isAvailable[user.username] = false;
                        })
                    });
                    event.markModified("timeSlots");
                    await event.save();

                    user.events.push(event._id);
                    user.eventSubmitted.set(event.id, false);
                    await user.save();

                    await user.populate({ path: "events", select: [
                        "id",
                        "name",
                        "creator",
                        "pplNum",
                    ]});
                    sendData(["homepage", user], ws);
                    break;
                }

                // receive eventId & return event data for editing
                case "editEvent": {
                    const id = payload;
                    const user = ws.user;

                    const event = await EventModel.findOne({id});
                    if (!event) {
                        console.log("not found!");
                        sendData(["error", "Event not found!"], ws);
                        break;
                    }

                    if (user.eventSubmitted.get(id)) {
                        sendData(["showEvent", event], ws);
                        if (!showingEvents[id]) showingEvents[id] = new Set();
                        showingEvents[id].add(ws);

                        ws.state = "show";
                        ws.eventId = id;
                    }
                    else {
                        const timeSlots = [];
                        event.timeSlots.forEach((time) => {
                            var tempTime = [];
                            time.forEach((timeOfDay) => {
                                tempTime.push({
                                    date: timeOfDay.date, 
                                    time: timeOfDay.time,
                                    available: timeOfDay.isAvailable[user.username],
                                })
                            })
                            timeSlots.push(tempTime);
                        })

                        sendData(["editEvent", {timeSlots}], ws);
                        ws.state = "edit";
                        ws.eventId = id;
                    }
                    break;
                }

                // receive event form data & return event data for showEvent
                case "submitEvent": {
                    const user = ws.user;

                    const event = await EventModel.findOne({id: ws.eventId});
                    if (!event) {
                        console.log("not found!")
                        sendData(["error", "Event not found!"], ws);
                    }
                    event.pplSubmitted.set(user.username, true);
                    for (var i = 0; i < payload.length; i++) {
                        for (var j = 0; j < payload[i].length; j++) {
                            if (payload[i][j].available && !event.timeSlots[i][j].isAvailable[user.username]) {
                                event.timeSlots[i][j].availableNum += 1;
                                event.timeSlots[i][j].availablePpl.push(user.username);
                                event.timeSlots[i][j].notAvailablePpl = event.timeSlots[i][j].notAvailablePpl.filter(username => username !== user.username);
                                event.timeSlots[i][j].isAvailable[user.username] = true;
                            }if (!payload[i][j].available && event.timeSlots[i][j].isAvailable[user.username]) {
                                event.timeSlots[i][j].availableNum -= 1;
                                event.timeSlots[i][j].availablePpl = event.timeSlots[i][j].availablePpl.filter(username => username !== user.username);
                                event.timeSlots[i][j].NotAvailablePpl.push(user.username);
                                event.timeSlots[i][j].isAvailable[user.username] = false;
                            }
                            console.log(event.timeSlots[i][j].availableNum);
                            console.log(event.timeSlots[i][j].availablePpl);
                            console.log(event.timeSlots[i][j].notAvailablePpl);
                            console.log(JSON.stringify(event.timeSlots[i][j].isAvailable));
                        }
                    }
                    event.markModified("timeSlots");
                    await event.save();

                    user.eventSubmitted.set(ws.eventId, true);
                    await user.save();

                    if (!showingEvents[ws.eventId]) showingEvents[ws.eventId] = new Set();
                    showingEvents[ws.eventId].add(ws);
                    
                    ws.state = "show";
                    
                    sendData(["showEvent", event], ws);
                    if (showingEvents[ws.eventId]) {
                        showingEvents[ws.eventId].forEach((client) => {
                            if (client !== ws) {
                                sendData(["updateEvent", event], client);
                            }
                        });
                    }
                    console.log(event);
                    console.log(user);
                    break;
                }

                default: break;
            }
        }
    )
};