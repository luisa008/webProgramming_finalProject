import { EventModel, UserModel } from "./models/meet";

const schedule = [
    [
      { day: 'Sun', time: '09:00', routine: true },
      { day: 'Mon', time: '09:00', routine: true },
      { day: 'Tue', time: '09:00', routine: true },
      { day: 'Wed', time: '09:00', routine: true },
      { day: 'Thu', time: '09:00', routine: true },
      { day: 'Fri', time: '09:00', routine: true },
      { day: 'Sat', time: '09:00', routine: true }
    ],
    [
      { day: 'Sun', time: '09:30', routine: false },
      { day: 'Mon', time: '09:30', routine: false },
      { day: 'Tue', time: '09:30', routine: false },
      { day: 'Wed', time: '09:30', routine: false },
      { day: 'Thu', time: '09:30', routine: false },
      { day: 'Fri', time: '09:30', routine: false },
      { day: 'Sat', time: '09:30', routine: false }
    ],
    [
      { day: 'Sun', time: '10:00', routine: false },
      { day: 'Mon', time: '10:00', routine: false },
      { day: 'Tue', time: '10:00', routine: false },
      { day: 'Wed', time: '10:00', routine: false },
      { day: 'Thu', time: '10:00', routine: false },
      { day: 'Fri', time: '10:00', routine: false },
      { day: 'Sat', time: '10:00', routine: false }
    ],
    [
      { day: 'Sun', time: '10:30', routine: false },
      { day: 'Mon', time: '10:30', routine: false },
      { day: 'Tue', time: '10:30', routine: false },
      { day: 'Wed', time: '10:30', routine: false },
      { day: 'Thu', time: '10:30', routine: false },
      { day: 'Fri', time: '10:30', routine: false },
      { day: 'Sat', time: '10:30', routine: false }
    ],
    [
      { day: 'Sun', time: '11:00', routine: false },
      { day: 'Mon', time: '11:00', routine: false },
      { day: 'Tue', time: '11:00', routine: false },
      { day: 'Wed', time: '11:00', routine: false },
      { day: 'Thu', time: '11:00', routine: false },
      { day: 'Fri', time: '11:00', routine: false },
      { day: 'Sat', time: '11:00', routine: false }
    ],
    [
      { day: 'Sun', time: '11:30', routine: false },
      { day: 'Mon', time: '11:30', routine: false },
      { day: 'Tue', time: '11:30', routine: false },
      { day: 'Wed', time: '11:30', routine: false },
      { day: 'Thu', time: '11:30', routine: false },
      { day: 'Fri', time: '11:30', routine: false },
      { day: 'Sat', time: '11:30', routine: false }
    ],
    [
      { day: 'Sun', time: '12:00', routine: false },
      { day: 'Mon', time: '12:00', routine: false },
      { day: 'Tue', time: '12:00', routine: false },
      { day: 'Wed', time: '12:00', routine: false },
      { day: 'Thu', time: '12:00', routine: false },
      { day: 'Fri', time: '12:00', routine: false },
      { day: 'Sat', time: '12:00', routine: false }
    ],
    [
      { day: 'Sun', time: '12:30', routine: false },
      { day: 'Mon', time: '12:30', routine: false },
      { day: 'Tue', time: '12:30', routine: false },
      { day: 'Wed', time: '12:30', routine: false },
      { day: 'Thu', time: '12:30', routine: false },
      { day: 'Fri', time: '12:30', routine: false },
      { day: 'Sat', time: '12:30', routine: false }
    ],
    [
      { day: 'Sun', time: '13:00', routine: false },
      { day: 'Mon', time: '13:00', routine: false },
      { day: 'Tue', time: '13:00', routine: false },
      { day: 'Wed', time: '13:00', routine: false },
      { day: 'Thu', time: '13:00', routine: false },
      { day: 'Fri', time: '13:00', routine: false },
      { day: 'Sat', time: '13:00', routine: false }
    ],
    [
      { day: 'Sun', time: '13:30', routine: false },
      { day: 'Mon', time: '13:30', routine: false },
      { day: 'Tue', time: '13:30', routine: false },
      { day: 'Wed', time: '13:30', routine: false },
      { day: 'Thu', time: '13:30', routine: false },
      { day: 'Fri', time: '13:30', routine: false },
      { day: 'Sat', time: '13:30', routine: false }
    ],
    [
      { day: 'Sun', time: '14:00', routine: false },
      { day: 'Mon', time: '14:00', routine: false },
      { day: 'Tue', time: '14:00', routine: false },
      { day: 'Wed', time: '14:00', routine: false },
      { day: 'Thu', time: '14:00', routine: false },
      { day: 'Fri', time: '14:00', routine: false },
      { day: 'Sat', time: '14:00', routine: false }
    ],
    [
      { day: 'Sun', time: '14:30', routine: false },
      { day: 'Mon', time: '14:30', routine: false },
      { day: 'Tue', time: '14:30', routine: false },
      { day: 'Wed', time: '14:30', routine: false },
      { day: 'Thu', time: '14:30', routine: false },
      { day: 'Fri', time: '14:30', routine: false },
      { day: 'Sat', time: '14:30', routine: false }
    ],
    [
      { day: 'Sun', time: '15:00', routine: false },
      { day: 'Mon', time: '15:00', routine: false },
      { day: 'Tue', time: '15:00', routine: false },
      { day: 'Wed', time: '15:00', routine: false },
      { day: 'Thu', time: '15:00', routine: false },
      { day: 'Fri', time: '15:00', routine: false },
      { day: 'Sat', time: '15:00', routine: false }
    ],
    [
      { day: 'Sun', time: '15:30', routine: false },
      { day: 'Mon', time: '15:30', routine: false },
      { day: 'Tue', time: '15:30', routine: false },
      { day: 'Wed', time: '15:30', routine: false },
      { day: 'Thu', time: '15:30', routine: false },
      { day: 'Fri', time: '15:30', routine: false },
      { day: 'Sat', time: '15:30', routine: false }
    ],
    [
      { day: 'Sun', time: '16:00', routine: false },
      { day: 'Mon', time: '16:00', routine: false },
      { day: 'Tue', time: '16:00', routine: false },
      { day: 'Wed', time: '16:00', routine: false },
      { day: 'Thu', time: '16:00', routine: false },
      { day: 'Fri', time: '16:00', routine: false },
      { day: 'Sat', time: '16:00', routine: false }
    ],
    [
      { day: 'Sun', time: '16:30', routine: false },
      { day: 'Mon', time: '16:30', routine: false },
      { day: 'Tue', time: '16:30', routine: false },
      { day: 'Wed', time: '16:30', routine: false },
      { day: 'Thu', time: '16:30', routine: false },
      { day: 'Fri', time: '16:30', routine: false },
      { day: 'Sat', time: '16:30', routine: false }
    ],
    [
      { day: 'Sun', time: '17:00', routine: false },
      { day: 'Mon', time: '17:00', routine: false },
      { day: 'Tue', time: '17:00', routine: false },
      { day: 'Wed', time: '17:00', routine: false },
      { day: 'Thu', time: '17:00', routine: false },
      { day: 'Fri', time: '17:00', routine: false },
      { day: 'Sat', time: '17:00', routine: false }
    ],
    [
      { day: 'Sun', time: '17:30', routine: false },
      { day: 'Mon', time: '17:30', routine: false },
      { day: 'Tue', time: '17:30', routine: false },
      { day: 'Wed', time: '17:30', routine: false },
      { day: 'Thu', time: '17:30', routine: false },
      { day: 'Fri', time: '17:30', routine: false },
      { day: 'Sat', time: '17:30', routine: false }
    ],
    [
      { day: 'Sun', time: '18:00', routine: false },
      { day: 'Mon', time: '18:00', routine: false },
      { day: 'Tue', time: '18:00', routine: false },
      { day: 'Wed', time: '18:00', routine: false },
      { day: 'Thu', time: '18:00', routine: false },
      { day: 'Fri', time: '18:00', routine: false },
      { day: 'Sat', time: '18:00', routine: false }
    ],
    [
      { day: 'Sun', time: '18:30', routine: false },
      { day: 'Mon', time: '18:30', routine: false },
      { day: 'Tue', time: '18:30', routine: false },
      { day: 'Wed', time: '18:30', routine: false },
      { day: 'Thu', time: '18:30', routine: false },
      { day: 'Fri', time: '18:30', routine: false },
      { day: 'Sat', time: '18:30', routine: false }
    ],
    [
      { day: 'Sun', time: '19:00', routine: false },
      { day: 'Mon', time: '19:00', routine: false },
      { day: 'Tue', time: '19:00', routine: false },
      { day: 'Wed', time: '19:00', routine: false },
      { day: 'Thu', time: '19:00', routine: false },
      { day: 'Fri', time: '19:00', routine: false },
      { day: 'Sat', time: '19:00', routine: false }
    ],
    [
      { day: 'Sun', time: '19:30', routine: false },
      { day: 'Mon', time: '19:30', routine: false },
      { day: 'Tue', time: '19:30', routine: false },
      { day: 'Wed', time: '19:30', routine: false },
      { day: 'Thu', time: '19:30', routine: false },
      { day: 'Fri', time: '19:30', routine: false },
      { day: 'Sat', time: '19:30', routine: false }
    ],
    [
      { day: 'Sun', time: '20:00', routine: false },
      { day: 'Mon', time: '20:00', routine: false },
      { day: 'Tue', time: '20:00', routine: false },
      { day: 'Wed', time: '20:00', routine: false },
      { day: 'Thu', time: '20:00', routine: false },
      { day: 'Fri', time: '20:00', routine: false },
      { day: 'Sat', time: '20:00', routine: false }
    ],
    [
      { day: 'Sun', time: '20:30', routine: false },
      { day: 'Mon', time: '20:30', routine: false },
      { day: 'Tue', time: '20:30', routine: false },
      { day: 'Wed', time: '20:30', routine: false },
      { day: 'Thu', time: '20:30', routine: false },
      { day: 'Fri', time: '20:30', routine: false },
      { day: 'Sat', time: '20:30', routine: false }
    ],
    [
      { day: 'Sun', time: '21:00', routine: false },
      { day: 'Mon', time: '21:00', routine: false },
      { day: 'Tue', time: '21:00', routine: false },
      { day: 'Wed', time: '21:00', routine: false },
      { day: 'Thu', time: '21:00', routine: false },
      { day: 'Fri', time: '21:00', routine: false },
      { day: 'Sat', time: '21:00', routine: false }
    ],
    [
      { day: 'Sun', time: '21:30', routine: false },
      { day: 'Mon', time: '21:30', routine: false },
      { day: 'Tue', time: '21:30', routine: false },
      { day: 'Wed', time: '21:30', routine: false },
      { day: 'Thu', time: '21:30', routine: false },
      { day: 'Fri', time: '21:30', routine: false },
      { day: 'Sat', time: '21:30', routine: false }
    ],
    [
      { day: 'Sun', time: '22:00', routine: false },
      { day: 'Mon', time: '22:00', routine: false },
      { day: 'Tue', time: '22:00', routine: false },
      { day: 'Wed', time: '22:00', routine: false },
      { day: 'Thu', time: '22:00', routine: false },
      { day: 'Fri', time: '22:00', routine: false },
      { day: 'Sat', time: '22:00', routine: false }
    ],
    [
      { day: 'Sun', time: '22:30', routine: false },
      { day: 'Mon', time: '22:30', routine: false },
      { day: 'Tue', time: '22:30', routine: false },
      { day: 'Wed', time: '22:30', routine: false },
      { day: 'Thu', time: '22:30', routine: false },
      { day: 'Fri', time: '22:30', routine: false },
      { day: 'Sat', time: '22:30', routine: false }
    ]
];

const dataInit = async () => {

    await EventModel.deleteMany({});
    await UserModel.deleteMany({});

    const giftExchange = new EventModel({
        id: "abcdefghij",
        name: "gift exchange",
        creator: "luisa",
        pplNum: 2,
        pplNames: ["luisa", "angela"],
        pplSubmitted: {
            luisa: false,
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
        routineSchedule: schedule,
        events: [giftExchange._id],
        eventSubmitted: {[giftExchange.id]: false},
    })
    const angela = new UserModel({
        username: "angela",
        routineSchedule: schedule,
        events: [giftExchange._id, meeting._id],
        eventSubmitted: {[giftExchange.id]: false, [meeting.id]: false},
    })
    const alice = new UserModel({
        username: "alice",
        routineSchedule: schedule,
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