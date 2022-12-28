import { EventModel, TimeSlotModel, UserModel } from "./models/meet";
import crypto from 'crypto';

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
                        // send error message?
                        console.log("not found");
                        break;
                    }
                    if (event.pplNames.includes(user.username)) {
                        console.log("already joined!");
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
                    break;
                }

                // receive eventId & return event data for showing
                case "showEvent": {
                    break;
                }

                default: break;
            }
        }
    )
};