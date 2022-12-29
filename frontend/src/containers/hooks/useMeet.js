import { useState, useEffect, createContext, useContext } from "react";

const client = new WebSocket('ws://localhost:4000');

const MeetContext = createContext({
    user: "",
    eventRange: [],
    eventName: [],
    eventBar: [],
    eventList: [],
});

const MeetProvider = (props) => {
    const [user, setUser] = useState("");
    const [eventRange, setEventRange] = useState([]);
    const [eventName, setEventName] = useState("");
    const [eventBar, setEventBar] = useState([]);
    const [eventList, setEventList] = useState([]);

    /* Call the methods below to notify server */
    // request user data for homepage
    const homepage = (username) => {
        sendData(["homepage", username]);
    }
    // send data of created schedule
    const createEvent = (event) => {
        sendData(["createEvent", event]);
    }
    // join an event using event id(need to add user to this event and update the user's eventlist)
    const joinEvent = (eventId) => {
        sendData(["joinEvent", eventId]);
    }
    // edit event
    const editEvent = (eventId) => {
        sendData(["editEvent", eventId]);
    }
    // submit event
    const submitEvent = (event) => {
        sendData(["submitEvent", event]);
    }

    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        console.log(`task: ${task}`);
        console.log(`payload: ${payload}`);
        switch(task) {

            // receive user data to switch to homepage(return user's whole events)
            case "homepage": {
                // payload: user schema
                const temp = [];
                for(var event of payload.events){
                    console.log(event)
                    temp.push({
                        title: event.name,
                        description: `creator: ${event.creator} | participants: ${event.pplNum}`,
                        id: event.id,
                        submitted: payload.eventSubmitted[event.id]
                    })
                }
                setEventList([...temp]);
                break;
            }

            // receive event data to switch to editing
            case "editEvent": {
                // payload: event schema
                break;
            }

            // receive event data to switch to showing
            case "showEvent": {
                // payload: event schema
                break;
            }

            // receive event data when someone else updates
            case "updateEvent": {
                // payload: event schema
                break;
            }
            
            default: break;
        }
    }

    return (
        <MeetContext.Provider
            value={{
                user, setUser, eventRange, setEventRange, eventName, setEventName, eventBar, setEventBar, eventList, setEventList,
                homepage, createEvent, joinEvent, editEvent, submitEvent
            }}
            {...props}
        />
    );
}

const useMeet = () => useContext(MeetContext);

export { MeetProvider, useMeet };