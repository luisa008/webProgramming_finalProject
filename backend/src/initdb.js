import { EventModel, UserModel } from "./models/meet";

const dataInit = async () => {
    await EventModel.deleteMany({});
    await UserModel.deleteMany({});
}

export default dataInit;