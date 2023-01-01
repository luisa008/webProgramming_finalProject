import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import './CreateEvent.css';
import { useNavigate } from "react-router-dom";
import { MeetProvider, useMeet } from './hooks/useMeet';
import { useState, useEffect, createContext, useContext } from "react";

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
    font-size: 3em;
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    padding: 50px;
`;

const RoutineSchedule = () => {
    const {submitEvent, roSchedule, setRoSchedule} = useMeet();
    // const [block, setBlock] = useState(tempArray);
    const navigate = useNavigate();

    const handleCell = (i, j) => {
        let temp = [...roSchedule];
        temp[i][j].routine = !temp[i][j].routine;
        setRoSchedule(temp);
        console.log(roSchedule[i][j].routine)
    }

    const handleSubmit = () => {
        navigate('/HomePage');
        submitEvent(roSchedule);
    }

    return (
        <div className="mainContainer">
            <header className='Title'>
                <TitleWrapper><h1>Let's Meet</h1></TitleWrapper>
            </header>
            <div className="FormContent">
                <ContentBoxesWrapper>
                    <TitleWrapper><h1 style={{marginRight: '20px'}}>Routine Schedule</h1>
                    <Button type="primary" onClick={handleSubmit}>
                        Submit Schedule
                    </Button></TitleWrapper>
                    <FormWrapper>
                        <div className='cellIntroBlock'>
                            {roSchedule.length !== 0 ? roSchedule[0].map((item, j) => (
                                <div className='cellIntro' key={j}>{item.day}</div>
                            )) : <></>}
                        </div>
                        {roSchedule.map((items, i) => (
                            <div key={"row"+i} id={"row"+i} style={{display:'flex'}}>
                                <div className='cellIntro'>{items[0].time}</div>
                                {items.map((item, j) => (
                                    <div className='cell' key={j} id={j} date={item.date} time={item.time}
                                     available={item.available? true: undefined} onClick={() => handleCell(i, j)}
                                     style={{ backgroundColor: item.routine ? "green" : "white" }}></div>
                                ))}
                            </div>
                        ))}
                    </FormWrapper>
                </ContentBoxesWrapper>
            </div>
            <div className="Bottom"></div>
        </div>
      );
}

// onMouseMove={() => handleCell(i, j)}

export default RoutineSchedule;