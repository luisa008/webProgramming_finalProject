export default {
    onMessage: (ws, wss) => (
        async (byteString) => {
            const {data} = byteString;
            const [task, payload] = JSON.parse(data);
            switch (task) {

                // receive username & return user data
                case "homepage": {
                    break;
                }

                // receive list of dates & return updated user data
                case "createEvent": {

                }

                // receive event Id & return updated user data
                case "joinEvent": {

                }

                // receive eventId & return event data for editing
                case "editSchedule": {
                    break;
                }

                // receive updated event data & broadcast change to all users w/ event open
                case "submitSchedule": {

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