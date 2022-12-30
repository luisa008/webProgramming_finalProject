import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/******* Event Schema *******/
const EventSchema = new Schema({
    id: {type: String, required: [true, 'id field is required.']},
    name: {type: String, required: [true, 'name field is required.']},
    creator: {type: String, required: [true, 'creator field is required.']},
    pplNum: {type:  Number, required: [true, 'participantNum field is required']},
    pplNames: [{type: String}],
    pplSubmitted: {type: Map, of: Boolean},
    timeSlots: {},
});
const EventModel = mongoose.model('Event', EventSchema);

/******* User Schema *******/
const UserSchema = new Schema({
    username: {type: String, required: [true, 'name field is required.']},
    events: [{type: mongoose.Types.ObjectId, ref: 'Event'}],
    eventSubmitted: {type: Map, of: Boolean},
});
const UserModel = mongoose.model('User', UserSchema);

export {EventModel, UserModel};