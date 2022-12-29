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
                    
                    const user = await UserModel.findOne({username});
                    if (!user) {
                        user = await new UserModel({username});
                        await user.save;
                    }

                    ws.user = user;
                    if (showingEvents[ws.state] && showingEvents[ws.state].has(ws)) {
                        showingEvents[ws.state].delete(ws);
                    }
                    ws.state = "homepage";
                    
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
                        timeSlots: form,
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

                        ws.state = id;
                    }
                    else {
                        sendData(["editEvent", event], ws);
                        ws.state = "edit";
                    }
                    break;
                }

                // receive event form data & return event data for showEvent
                case "submitEvent": {
                    const { id, form } = payload;
                    const user = ws.user;

                    const event = await EventModel.findOne({id});
                    if (!event) {
                        console.log("not found!")
                        sendData(["error", "Event not found!"], ws);
                    }
                    event.pplSubmitted.set(user.username, true);
                    event.timeSlots = form;
                    event.markModified("timeSlots");
                    await event.save();

                    user.eventSubmitted.set(id, true);
                    await user.save();

                    if (!showingEvents[id]) showingEvents[id] = new Set();
                    showingEvents[id].add(ws);
                    
                    ws.state = id;
                    
                    sendData(["showEvent", event], ws);
                    if (showingEvents[id]) {
                        showingEvents[id].forEach(client => {
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