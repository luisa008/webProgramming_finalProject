import React from 'react';
import { Button, Space } from 'antd';
import styled from 'styled-components';
import './Homepage.css';
import { MeetProvider, useMeet } from './hooks/useMeet';
import { useNavigate } from "react-router-dom";
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

const dateTime = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
                    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
                    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"]

const getDaysArray = function(start, end) {
    for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};

const Homepage = () => {
    const {user, eventList, setEventList, joinEvent, createEvent} = useMeet();
    const [eventModalOpen, setEventModalOpen] = useState(false);
    const [joinModalOpen, setJoinModalOpen] = useState(false);
    const navigate = useNavigate();
    // console.log(user)

    // useEffect(() => {
    //     setUser("lisa");
    // }, []);

    const handleSchedule = () => {
        navigate('/RoutineSchedule');
    }

    return (
        <div className="mainContainer">
            <header className='Title'>
                <TitleWrapper><h1>Let's Meet</h1></TitleWrapper>
            </header>
            <div className="Slide">
                <SlideBoxesWrapper>
                    <p>User: {user}</p>
                    <p>Total events: {eventList.length}</p>
                    <Space direction="vertical">
                        <Button type="primary" onClick={()=>{setEventModalOpen(true)}}>
                            Create Event
                        </Button>
                        <Button type="primary" onClick={handleSchedule}>
                            Create Routine Schedule
                        </Button>
                        <Button type="primary" onClick={()=>{setJoinModalOpen(true)}}>
                            Join Event
                        </Button>
                        <EventModal
                            open={eventModalOpen}
                            onCreate={(values) => {
                                const dateList = getDaysArray(values.Dates[0].$d,values.Dates[1].$d);
                                const date = dateList.map((v)=>v.toISOString().slice(0,10)+v.toString().slice(0,3));
                                console.log(date)
                                var form = [];
                                for(var i = 0; i < 28; i++){
                                    form.push([]);
                                    for(var j = 0; j < date.length; j++){
                                        form[i].push({date: date[j],
                                             time: dateTime[i], availableNum: 0, availablePpl: [], notAvailablePpl: []});
                                    }
                                }
                                createEvent({
                                    name: values.EventName,
                                    // description: `creator: ${user} | participants: 1`,
                                    // id: id,
                                    form: form,
                                    // participants: 1
                                })
                                setEventModalOpen(false);
                            }}
                            onCancel={() => { setEventModalOpen(false);}}
                        />
                        <JoinModal
                            open={joinModalOpen}
                            onCreate={(values) => {
                                console.log(values.EventID);
                                joinEvent(values.EventID);
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