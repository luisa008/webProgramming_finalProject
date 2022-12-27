import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/******* Event Schema *******/
const EventSchema = new Schema({
    id: {type: String, required: [true, 'id field is required.']},
    name: {type: String, required: [true, 'name field is required.']},
    creator: {type: String, required: [true, 'creator field is required.']},
    participantNum: {type:  Number, required: [true, 'participantNum field is required']},
    participantNames: [{type: String}],
    participantSubmitted: {type: Map, of: String},
    timeSlots: [{type: mongoose.Types.ObjectId, ref: 'TimeSlot'}],
});
const EventModel = mongoose.model('Event', EventSchema);

/******* TimeSlot Schema *******/
const TimeSlotSchema = new Schema({
    dateTime: {type: Date, required: [true, 'dateTime field is required']},
    availableParticipants: [{type: String}], // string or ref?
});
const TimeSlotModel = mongoose.model('TimeSlot', TimeSlotSchema);

/******* User Schema *******/
const UserSchema = new Schema({
    name: {type: String, required: [true, 'name field is required.']},
    events: [{type: mongoose.Types.ObjectId, ref: 'Event'}],
});
const UserModel = mongoose.model('User', UserSchema);

export {EventModel, TimeSlotModel, UserModel};