import { EventModel, TimeSlotModel, UserModel } from "./models/meet";

const dataInit = async () => {

    await EventModel.deleteMany({});
    await TimeSlotModel.deleteMany({});
    await UserModel.deleteMany({});

    const giftExchange = new EventModel({
        id: "abcdefghij",
        name: "gift exchange",
        creator: "luisa",
        pplNum: 2,
        pplNames: ["luisa", "angela"],
        pplSubmitted: {
            luisa: true,
            angela: false,
        },
        timeSlots: [],
    });
    const meeting = new EventModel({
        id: "xyzuvwrstk",
        name: "meeting",
        creator: "alice",
        pplNum: 2,
        pplNames: ["angela", "alice"],
        pplSubmitted: {
            angela: false,
            alice: false,
        },
        timeSlots: [],
    })

    const luisa = new UserModel({
        username: "luisa",
        events: [giftExchange._id],
        eventSubmitted: {[giftExchange.id]: false},
    })
    const angela = new UserModel({
        username: "angela",
        events: [giftExchange._id, meeting._id],
        eventSubmitted: {[giftExchange.id]: false, [meeting.id]: false},
    })
    const alice = new UserModel({
        username: "alice",
        events: [meeting._id],
        eventSubmitted: {[meeting.id]: false},
    })

    await meeting.save();
    await giftExchange.save();
    await luisa.save();
    await angela.save();
    await alice.save();
}

export default dataInit;