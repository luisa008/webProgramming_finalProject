import React from 'react';
import { Button, Space } from 'antd';
import styled from 'styled-components';
import './Homepage.css';
import { MeetProvider, useMeet } from './hooks/useMeet';
import { useState, useEffect, createContext, useContext } from "react";
import EventContent from '../components/EventContent';
import EventModal from '../components/EventModal';
import JoinModal from '../components/JoinModal';

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

const getDaysArray = function(start, end) {
    for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};

const Homepage = () => {
    const {user, eventRange, setEventRange} = useMeet();
    const [eventModalOpen, setEventModalOpen] = useState(false);
    const [joinModalOpen, setJoinModalOpen] = useState(false);
    // console.log(user)

    // useEffect(() => {
    //     setUser("lisa");
    // }, []);

    return (
        <div className="mainContainer">
            <header className='Title'>
                <TitleWrapper><h1>Let's Meeting</h1></TitleWrapper>
            </header>
            <div className="Slide">
                <SlideBoxesWrapper>
                    <p>User: {user}</p>
                    <p>Total events: 4</p>
                    <Space direction="vertical">
                        <Button type="primary" onClick={()=>{setEventModalOpen(true)}}>
                            Create Event
                        </Button>
                        <Button type="primary">
                            Create Routine Schedule
                        </Button>
                        <Button type="primary" onClick={()=>{setJoinModalOpen(true)}}>
                            Join Event
                        </Button>
                        <EventModal
                            open={eventModalOpen}
                            onCreate={(values) => {
                                const dateList = getDaysArray(values.Dates[0].$d,values.Dates[1].$d);
                                // dateList.map((v)=>v.toISOString().slice(0,10)).join("")
                                console.log(dateList)
                                setEventModalOpen(false);
                            }}
                            onCancel={() => { setEventModalOpen(false);}}
                        />
                        <JoinModal
                            open={joinModalOpen}
                            onCreate={(eventId) => {
                                setJoinModalOpen(false);
                            }}
                            onCancel={() => { setJoinModalOpen(false);}}
                        />
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