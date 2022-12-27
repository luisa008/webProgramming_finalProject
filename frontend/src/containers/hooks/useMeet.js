import { useState, useEffect, createContext, useContext } from "react";

// const client = new WebSocket('ws://localhost:4000');

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