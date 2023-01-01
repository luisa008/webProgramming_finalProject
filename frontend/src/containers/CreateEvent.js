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

const CreateEvent = () => {
    const {submitEvent, eventRange, setEventRange, eventName} = useMeet();
    // const [block, setBlock] = useState(tempArray);
    const navigate = useNavigate();

    const handleCell = (i, j) => {
        let temp = [...eventRange];
        temp[i][j].available = !temp[i][j].available;
        setEventRange(temp);
        console.log(eventRange[i][j].available)
    };

    const handleSubmit = () => {
        navigate('/ShowEvent');
        submitEvent(eventRange);
    };

    const handleBlock = (item, i, j) => {
        if(item.routine){
            return (
                <div className='cell' key={j} id={j} date={item.date} time={item.time}
                available={item.available? true: undefined}
                style={{ backgroundColor: "gray" }}></div>
            )
        }
        else{
            return(
                <div className='cell' key={j} id={j} date={item.date} time={item.time}
                    available={item.available? true: undefined} onClick={() => handleCell(i, j)}
                    style={{ backgroundColor: item.available ? "pink" : "white" }}></div>
            )
        }
    };

    return (
        <div className="mainContainer">
            <header className='Title'>
                <TitleWrapper><h1>Let's Meet</h1></TitleWrapper>
            </header>
            <div className="FormContent">
                <ContentBoxesWrapper>
                    <TitleWrapper><h1 style={{marginRight: '20px'}}>{eventName}</h1>
                    <Button type="primary" onClick={handleSubmit}>
                        Submit Event
                    </Button></TitleWrapper>
                    <FormWrapper>
                        <div className='cellIntroBlock'>
                            {eventRange.length !== 0 ? eventRange[0].map((item, j) => (
                                <div className='cellIntro' key={j}>{item.date.slice(5,10)}</div>
                            )) : <></>}
                        </div>
                        <div className='cellIntroBlock'>
                            {eventRange.length !== 0 ? eventRange[0].map((item, j) => (
                                <div className='cellIntro' key={j}>{item.date.slice(10,13)}</div>
                            )) : <></>}
                        </div>
                        {eventRange.map((items, i) => (
                            <div key={"row"+i} id={"row"+i} style={{display:'flex'}}>
                                <div className='cellIntro'>{items[0].time}</div>
                                {items.map((item, j) => (
                                    handleBlock(item, i, j)
                                    // <div className='cell' key={j} id={j} date={item.date} time={item.time}
                                    //  available={item.available? true: undefined} onClick={() => handleCell(i, j)}
                                    //  style={{ backgroundColor: item.available ? "pink" : "white" }}></div>
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

export default CreateEvent;