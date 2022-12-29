import React from 'react';
import { Button, Space } from 'antd';
import styled from 'styled-components';
import './CreateEvent.css';
import { useNavigate } from "react-router-dom";
import { MeetProvider, useMeet } from './hooks/useMeet';
import { useState, useEffect, createContext, useContext } from "react";

let tempArray = [
    [{date: "12/7", time: "9:00", available: false},{date: "12/8", time: "9:00", available: false},{date: "12/9", time: "9:00", available: false}],
    [{date: "12/7", time: "9:30", available: false},{date: "12/8", time: "9:30", available: false},{date: "12/9", time: "9:30", available: false}],
    [{date: "12/7", time: "10:00", available: false},{date: "12/8", time: "10:00", available: false},{date: "12/9", time: "10:00", available: false}],
    [{date: "12/7", time: "10:30", available: false},{date: "12/8", time: "10:30", available: false},{date: "12/9", time: "10:30", available: false}],
    [{date: "12/7", time: "11:00", available: false},{date: "12/8", time: "11:00", available: false},{date: "12/9", time: "11:00", available: false}],
    [{date: "12/7", time: "11:30", available: false},{date: "12/8", time: "11:30", available: false},{date: "12/9", time: "11:30", available: false}],
    [{date: "12/7", time: "12:00", available: false},{date: "12/8", time: "12:00", available: false},{date: "12/9", time: "12:00", available: false}],
    [{date: "12/7", time: "12:30", available: false},{date: "12/8", time: "12:30", available: false},{date: "12/9", time: "12:30", available: false}],
    [{date: "12/7", time: "13:00", available: false},{date: "12/8", time: "13:00", available: false},{date: "12/9", time: "13:00", available: false}],
    [{date: "12/7", time: "13:30", available: false},{date: "12/8", time: "13:30", available: false},{date: "12/9", time: "13:30", available: false}],
    [{date: "12/7", time: "14:00", available: false},{date: "12/8", time: "14:00", available: false},{date: "12/9", time: "14:00", available: false}],
    [{date: "12/7", time: "14:30", available: false},{date: "12/8", time: "14:30", available: false},{date: "12/9", time: "14:30", available: false}],
    [{date: "12/7", time: "15:00", available: false},{date: "12/8", time: "15:00", available: false},{date: "12/9", time: "15:00", available: false}],
    [{date: "12/7", time: "15:30", available: false},{date: "12/8", time: "15:30", available: false},{date: "12/9", time: "15:30", available: false}],
    [{date: "12/7", time: "16:00", available: false},{date: "12/8", time: "16:00", available: false},{date: "12/9", time: "16:00", available: false}],
    [{date: "12/7", time: "16:30", available: false},{date: "12/8", time: "16:30", available: false},{date: "12/9", time: "16:30", available: false}],
    [{date: "12/7", time: "17:00", available: false},{date: "12/8", time: "17:00", available: false},{date: "12/9", time: "17:00", available: false}],
    [{date: "12/7", time: "17:30", available: false},{date: "12/8", time: "17:30", available: false},{date: "12/9", time: "17:30", available: false}],
    [{date: "12/7", time: "18:00", available: false},{date: "12/8", time: "18:00", available: false},{date: "12/9", time: "18:00", available: false}],
    [{date: "12/7", time: "18:30", available: false},{date: "12/8", time: "18:30", available: false},{date: "12/9", time: "18:30", available: false}],
    [{date: "12/7", time: "19:00", available: false},{date: "12/8", time: "19:00", available: false},{date: "12/9", time: "19:00", available: false}],
    [{date: "12/7", time: "19:30", available: false},{date: "12/8", time: "19:30", available: false},{date: "12/9", time: "19:30", available: false}],
    [{date: "12/7", time: "20:00", available: false},{date: "12/8", time: "20:00", available: false},{date: "12/9", time: "20:00", available: false}],
    [{date: "12/7", time: "20:30", available: false},{date: "12/8", time: "20:30", available: false},{date: "12/9", time: "20:30", available: false}],
    [{date: "12/7", time: "21:00", available: false},{date: "12/8", time: "21:00", available: false},{date: "12/9", time: "21:00", available: false}],
    [{date: "12/7", time: "21:30", available: false},{date: "12/8", time: "21:30", available: false},{date: "12/9", time: "21:30", available: false}],
    [{date: "12/7", time: "22:00", available: false},{date: "12/8", time: "22:00", available: false},{date: "12/9", time: "22:00", available: false}],
    [{date: "12/7", time: "22:30", available: false},{date: "12/8", time: "22:30", available: false},{date: "12/9", time: "22:30", available: false}],
]

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
    const {submitEvent} = useMeet();
    const [block, setBlock] = useState(tempArray);
    const navigate = useNavigate();

    const handleCell = (i, j) => {
        let temp = [...block];
        temp[i][j].available = !temp[i][j].available;
        setBlock(temp);
        console.log(block[i][j].available)
    }

    const handleSubmit = () => {
        navigate('/ShowEvent');
        submitEvent();
    }

    return (
        <div className="mainContainer">
            <header className='Title'>
                <TitleWrapper><h1>Let's Meeting</h1></TitleWrapper>
            </header>
            <div className="FormContent">
                <ContentBoxesWrapper>
                    <TitleWrapper><h1 style={{marginRight: '20px'}}>Event Name</h1>
                    <Button type="primary" onclick={handleSubmit}>
                        Submit Event
                    </Button></TitleWrapper>
                    <FormWrapper>
                        {block.map((items, i) => (
                            <div key={"row"+i} id={"row"+i} style={{display:'flex'}}>
                                {items.map((item, j) => (
                                    <div className='cell' key={j} id={j} date={item.date} time={item.time}
                                     available={item.available} onClick={() => handleCell(i, j)}
                                     style={{ backgroundColor: item.available ? "green" : "white" }}></div>
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