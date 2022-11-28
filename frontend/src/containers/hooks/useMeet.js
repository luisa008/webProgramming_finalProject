import { useState, useEffect, createContext, useContext } from "react";

// const client = new WebSocket('ws://localhost:4000');

const MeetContext = createContext({
    user: "",
    // setUser: () => {},
});

const MeetProvider = (props) => {
    const [user, setUser] = useState("lll");

    return (
        <MeetContext.Provider
            value={{
                user, setUser
            }}
            {...props}
        />
    );
}

const useMeet = () => useContext(MeetContext);

export { MeetProvider, useMeet };