import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import './Homepage.css';
import { MeetProvider, useMeet } from './hooks/useMeet';
import { useState, useEffect, createContext, useContext } from "react";

const ChatBoxesWrapper = styled.div`
    width: 100%;
    background: #eeeeee52;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
    margin: 0;
    margin-left: 20px;
    font-size: 3em;
`;

const Homepage = () => {
    const {user, setUser} = MeetProvider().props.value;
    console.log(user)

    useEffect(() => {
        setUser("lisa");
    }, []);

    return (
        <div className="mainContainer">
            <header className='Title'>
                <TitleWrapper><h1>Let's Meeting</h1></TitleWrapper>
            </header>
            <div className="Slide">
                <ChatBoxesWrapper>
                    <p>User: {user}</p>
                    <Button type="primary">
                        Create Event
                    </Button>
                </ChatBoxesWrapper>
            </div>
            <div className="Content">
            </div>
            <div className="Bottom"></div>
        </div>
      );
}

export default Homepage;