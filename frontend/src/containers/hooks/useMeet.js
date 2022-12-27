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
    const createEvent = (dateList) => {
        sendData(["createEvent", dateList]);
    }
    // join an event using event id
    const joinEvent = (eventId) => {
        sendData(["joinEvent", eventId]);
    }
    // request event data for editing
    const editSchedule = (eventId) => {
        sendData(["editSchedule", eventId]);
    }
    // submit schedule after editing
    const submitSchedule = (timeSlots) => {
        sendData(["submitSchedule", timeSlots])
    }
    // request event data for showing
    const showEvent = (eventId) => {
        sendData(["showEvent", eventId]);
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

            // receive user data to switch to homepage
            case "homepage": {
                // payload: user schema
                break;
            }

            // receive event data to switch to editing
            case "editSchedule": {
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
            }}
            {...props}
        />
    );
}

const useMeet = () => useContext(MeetContext);

export { MeetProvider, useMeet };