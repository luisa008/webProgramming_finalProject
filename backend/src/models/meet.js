import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/******* Event Schema *******/
const EventSchema = new Schema({
    id: {type: String, required: [true, 'id field is required.']},
    name: {type: String, required: [true, 'name field is required.']},
    creator: {type: String, required: [true, 'creator field is required.']},
    pplNum: {type:  Number, required: [true, 'participantNum field is required']},
    pplNames: [{type: String}],
    pplSubmitted: {type: Map, of: String},
    timeSlots: [[{type: mongoose.Types.ObjectId, ref: 'TimeSlot'}]],
});
const EventModel = mongoose.model('Event', EventSchema);

/******* TimeSlot Schema *******/
const TimeSlotSchema = new Schema({
    date: {type: String, required: [true, 'date field is required.']},
    time: {type: String, required: [true, 'time field is required.']},
    availableNum: {type: String, required: [true, 'availableNum field is required.']},
    availablePpl: [{type: String}], 
    notAvailablePpl: [{type: String}],
});
const TimeSlotModel = mongoose.model('TimeSlot', TimeSlotSchema);

/******* User Schema *******/
const UserSchema = new Schema({
    username: {type: String, required: [true, 'name field is required.']},
    events: [{type: mongoose.Types.ObjectId, ref: 'Event'}],
    eventSubmitted: {type: Map, of: String},
});
const UserModel = mongoose.model('User', UserSchema);

export {EventModel, TimeSlotModel, UserModel};