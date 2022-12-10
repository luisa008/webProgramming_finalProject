import React from 'react';
import { Button, Space } from 'antd';
import styled from 'styled-components';
import './Homepage.css';
import { MeetProvider, useMeet } from './hooks/useMeet';
import { useState, useEffect, createContext, useContext } from "react";
import EventContent from '../components/EventContent';

const SlideBoxesWrapper = styled.div`
    width: 100%;
    background: #eeeeee52;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`;

const ContentBoxesWrapper = styled.div`
    width: 100%;
    background: #eeeeee52;
    margin: 20px;
    padding: 20px;
    overflow: auto;
    border: 1px solid gray;
    border-radius: 10px;
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
                <SlideBoxesWrapper>
                    <p>User: {user}</p>
                    <Space direction="vertical">
                        <Button type="primary">
                            Create Event
                        </Button>
                        <Button type="primary">
                            Create Routine Schedule
                        </Button>
                        <Button type="primary">
                            Join Event
                        </Button>
                    </Space>
                </SlideBoxesWrapper>
            </div>
            <div className="Content">
                <ContentBoxesWrapper>
                    <EventContent></EventContent>
                </ContentBoxesWrapper>
            </div>
            <div className="Bottom"></div>
        </div>
      );
}

export default Homepage;