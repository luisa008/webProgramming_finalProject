import { EventModel, UserModel } from "./models/meet";

const showingEvents = {};
const homepageEvents = {};

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data)); 
};

const makeEventId = async () => {
    const chars = "abcdefghijklmnopqrstuvwxyz";
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

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
                "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
                "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"]

export default {
    onMessage: (ws, wss) => (
        async (byteString) => {
            const { data } = byteString;
            const [task, payload] = JSON.parse(data);
            // console.log(`task: ${task}\npayload: ${JSON.stringify(payload)}`);
            console.log(`task: ${task}`);
            
            switch (task) {
                // receive username & return user data
                case "homepage": {
                    const username = payload;
                    
                    var user = await UserModel.findOne({username});
                    if (!user) {
                        user = await new UserModel({
                            username: username,
                            routineSchedule: [],
                            events: [],
                            eventSubmitted: new Map([]),
                        });
                        times.forEach((time) => {
                            var temp = [];
                            weekDays.forEach((day) => {
                                temp.push({
                                    day: day,
                                    time: time,
                                    routine: false,
                                })
                            })
                            user.routineSchedule.push(temp);
                        })
                        await user.save();
                    }

                    user.events.forEach((event) => {
                        if (!homepageEvents[event.id]) homepageEvents[event.id] = new Set();
                        homepageEvents[event.id].add(ws);
                    })

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

                // receive routine schedule & add to user schema
                case "routineSchedule": {
                    const user = ws.user;
                    sendData(["routineSchedule", user.routineSchedule], ws);
                    ws.state = "routine";
                    // console.log(user.routineSchedule);
                    user.routineSchedule.forEach((time) => {
                        time.forEach((timeOfDay) => {
                            console.log(JSON.stringify(timeOfDay));
                        })
                    })
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

                    homepageEvents[event.id] = new Set();
                    homepageEvents[event.id].add(ws);

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

                    // broadcast updated participant number to other ppl
                    homepageEvents[id].forEach(async (client) => {
                        if (client !== ws && client.state === "homepage") {
                            await client.user.populate({ path: "events", select: [
                                "id",
                                "name",
                                "creator",
                                "pplNum",
                            ]});
                            sendData(["homepage", client.user], client);
                        }
                    })
                    homepageEvents[id].add(ws);
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
                        var startingWeekDay = weekDays.indexOf(event.timeSlots[0][0].date.slice(-3));
                        for (var i = 0; i < event.timeSlots.length; i++) {
                            var tempTime = [];
                            var day = startingWeekDay;
                            for (var j = 0; j < event.timeSlots[i].length; j++) {
                                tempTime.push({
                                    date: event.timeSlots[i][j].date,
                                    time: event.timeSlots[i][j].time,
                                    available: event.timeSlots[i][j].isAvailable[user.username],
                                    routine: user.routineSchedule[i][day].routine,
                                })
                                day = (day + 1) % 7;
                            }
                            timeSlots.push(tempTime);
                        }

                        sendData(["editEvent", {timeSlots}], ws);
                        ws.state = "edit";
                        ws.eventId = id;
                    }
                    break;
                }

                // receive eventId & return event data for editing
                case "reviseEvent": {
                    const id = payload;
                    const user = ws.user;

                    const event = await EventModel.findOne({id});
                    if (!event) {
                        console.log("not found!");
                        sendData(["error", "Event not found!"], ws);
                        break;
                    }

                    const timeSlots = [];
                    var startingWeekDay = weekDays.indexOf(event.timeSlots[0][0].date.slice(-3));
                    for (var i = 0; i < event.timeSlots.length; i++) {
                        var tempTime = [];
                        var day = startingWeekDay;
                        for (var j = 0; j < event.timeSlots[i].length; j++) {
                            tempTime.push({
                                date: event.timeSlots[i][j].date,
                                time: event.timeSlots[i][j].time,
                                available: event.timeSlots[i][j].isAvailable[user.username],
                                routine: user.routineSchedule[i][day].routine,
                            })
                            day = (day + 1) % 7;
                        }
                        timeSlots.push(tempTime);
                    }

                    sendData(["editEvent", {timeSlots}], ws);
                    ws.state = "edit";
                    ws.eventId = id;
                    break;
                }

                // receive event form data & return event data for showEvent
                case "submitEvent": {
                    const user = ws.user;

                    // for routine schedule submission
                    if (ws.state === "routine") {
                        user.routineSchedule = payload;
                        user.markModified("routineSchedule");
                        await user.save();
                        break;
                    }

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
                                event.timeSlots[i][j].notAvailablePpl.push(user.username);
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
                    break;
                }

                default: break;
            }
        }
    )
};