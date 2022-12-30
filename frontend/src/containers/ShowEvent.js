import React from 'react';
import { Button, Space } from 'antd';
import styled from 'styled-components';
import './CreateEvent.css';
import { MeetProvider, useMeet } from './hooks/useMeet';
import { useState, useEffect, createContext, useContext } from "react";

let tempArray = [
    [{date: "12/7", time: "9:00", available: 0},{date: "12/8", time: "9:00", available: 0},{date: "12/9", time: "9:00", available: 0}],
    [{date: "12/7", time: "9:30", available: 0},{date: "12/8", time: "9:30", available: 0},{date: "12/9", time: "9:30", available: 0}],
    [{date: "12/7", time: "10:00", available: 0},{date: "12/8", time: "10:00", available: 0},{date: "12/9", time: "10:00", available: 0}],
    [{date: "12/7", time: "10:30", available: 1},{date: "12/8", time: "10:30", available: 0},{date: "12/9", time: "10:30", available: 0}],
    [{date: "12/7", time: "11:00", available: 1},{date: "12/8", time: "11:00", available: 0},{date: "12/9", time: "11:00", available: 0}],
    [{date: "12/7", time: "11:30", available: 1},{date: "12/8", time: "11:30", available: 0},{date: "12/9", time: "11:30", available: 0}],
    [{date: "12/7", time: "12:00", available: 1},{date: "12/8", time: "12:00", available: 2},{date: "12/9", time: "12:00", available: 0}],
    [{date: "12/7", time: "12:30", available: 0},{date: "12/8", time: "12:30", available: 2},{date: "12/9", time: "12:30", available: 0}],
    [{date: "12/7", time: "13:00", available: 0},{date: "12/8", time: "13:00", available: 2},{date: "12/9", time: "13:00", available: 0}],
    [{date: "12/7", time: "13:30", available: 0},{date: "12/8", time: "13:30", available: 2},{date: "12/9", time: "13:30", available: 0}],
    [{date: "12/7", time: "14:00", available: 0},{date: "12/8", time: "14:00", available: 3},{date: "12/9", time: "14:00", available: 0}],
    [{date: "12/7", time: "14:30", available: 0},{date: "12/8", time: "14:30", available: 3},{date: "12/9", time: "14:30", available: 0}],
    [{date: "12/7", time: "15:00", available: 0},{date: "12/8", time: "15:00", available: 3},{date: "12/9", time: "15:00", available: 0}],
    [{date: "12/7", time: "15:30", available: 0},{date: "12/8", time: "15:30", available: 1},{date: "12/9", time: "15:30", available: 0}],
    [{date: "12/7", time: "16:00", available: 0},{date: "12/8", time: "16:00", available: 1},{date: "12/9", time: "16:00", available: 0}],
    [{date: "12/7", time: "16:30", available: 0},{date: "12/8", time: "16:30", available: 0},{date: "12/9", time: "16:30", available: 0}],
    [{date: "12/7", time: "17:00", available: 0},{date: "12/8", time: "17:00", available: 0},{date: "12/9", time: "17:00", available: 0}],
    [{date: "12/7", time: "17:30", available: 0},{date: "12/8", time: "17:30", available: 0},{date: "12/9", time: "17:30", available: 0}],
    [{date: "12/7", time: "18:00", available: 0},{date: "12/8", time: "18:00", available: 0},{date: "12/9", time: "18:00", available: 0}],
    [{date: "12/7", time: "18:30", available: 0},{date: "12/8", time: "18:30", available: 0},{date: "12/9", time: "18:30", available: 0}],
    [{date: "12/7", time: "19:00", available: 0},{date: "12/8", time: "19:00", available: 0},{date: "12/9", time: "19:00", available: 0}],
    [{date: "12/7", time: "19:30", available: 0},{date: "12/8", time: "19:30", available: 0},{date: "12/9", time: "19:30", available: 0}],
    [{date: "12/7", time: "20:00", available: 0},{date: "12/8", time: "20:00", available: 1},{date: "12/9", time: "20:00", available: 0}],
    [{date: "12/7", time: "20:30", available: 1},{date: "12/8", time: "20:30", available: 1},{date: "12/9", time: "20:30", available: 0}],
    [{date: "12/7", time: "21:00", available: 1},{date: "12/8", time: "21:00", available: 0},{date: "12/9", time: "21:00", available: 0}],
    [{date: "12/7", time: "21:30", available: 0},{date: "12/8", time: "21:30", available: 2},{date: "12/9", time: "21:30", available: 0}],
    [{date: "12/7", time: "22:00", available: 0},{date: "12/8", time: "22:00", available: 0},{date: "12/9", time: "22:00", available: 0}],
    [{date: "12/7", time: "22:30", available: 0},{date: "12/8", time: "22:30", available: 0},{date: "12/9", time: "22:30", available: 0}],
]

const ContentBoxesWrapper = styled.div`
    width: 100%;
    background: #eeeeee52;
    margin: 20px;
    padding: 20px;
    overflow: auto;
    border: 1px solid gray;
    border-radius: 10px;
    display:grid;
    grid-template-columns:[line1] 70% [line2] 30% [line3];
    grid-template-rows:[row1] 50% [row2] 50% [row3];
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
    margin: 0;
    font-size: 3em;
`;

const SubTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
    margin: 0;
    font-size: 2em;
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    padding: 50px;
`;

const ScheduleWrapper = styled.div`
    background: #eeeeee52;
    margin: 20px;
    overflow: auto;
    border: 1px solid gray;
    border-radius: 10px;
    grid-column: 1/2;
    grid-row: 1/3;
`;
const PeopleWrapper = styled.div`
    background: #eeeeee52;
    margin: 20px;
    overflow: auto;
    border: 1px solid gray;
    border-radius: 10px;
    grid-column: 2/3;
    grid-row: 1/2;
`;

const ResultWrapper = styled.div`
    background: #eeeeee52;
    margin: 20px;
    overflow: auto;
    border: 1px solid gray;
    border-radius: 10px;
    grid-column: 2/3;
    grid-row: 2/3;
`;

const addHexColor = (c1, c2) => {
    var hexStr = (parseInt(c1, 16) - parseInt(c2, 16)).toString(16);
    while (hexStr.length < 6) { hexStr = '0' + hexStr; } // Zero pad.
    return hexStr;
}

const ShowEvent = () => {
    const {showList, setShowList} = useMeet();
    const [avaList, setAvaList] = useState([]);
    const [notAvaList, setNotAvaList] = useState([]);

    const chooseColor = (num) => {
        var max = 0;
        for(var i = 0; i < showList.length; i++){
            for(var j = 0; j < showList[i].length; j++){
                if(showList[i][j].available > max) max = showList[i][j].available;
            }
        }
        // console.log(max);
        // console.log(addHexColor("008000", (num*4096).toString(16)));
        return addHexColor("ffffff", (num*8192).toString(16));
    }

    const handleShow = (i, j) => {
        // console.log(showList[i][j].availablePpl);
        setAvaList(showList[i][j].availablePpl);
        setNotAvaList(showList[i][j].notAvailablePpl);
    }

    return (
        <div className="mainContainer">
            <header className='Title'>
                <TitleWrapper><h1>Let's Meeting</h1></TitleWrapper>
            </header>
            <div className="FormContent">
                <ContentBoxesWrapper>
                    <ScheduleWrapper>
                        <SubTitleWrapper>
                            <h1 style={{marginRight: '20px'}}>Event Name</h1>
                            <Button type='primary'>Update Event</Button>
                        </SubTitleWrapper>
                        <FormWrapper>
                            {showList.map((items, i) => (
                                <div key={"row"+i} id={"row"+i} style={{display:'flex'}}>
                                    {items.map((item, j) => (
                                        <div className='cell' key={j} id={j} date={item.date} time={item.time}
                                        available={item.availableNum} onMouseOver={() => handleShow(i, j)}
                                        style={{ backgroundColor: "#"+chooseColor(item.availableNum) }}></div>
                                    ))}
                                </div>
                            ))}
                        </FormWrapper>
                    </ScheduleWrapper>
                    <PeopleWrapper>
                        <SubTitleWrapper><h1>Available people</h1></SubTitleWrapper>
                        <div className='available'>
                            <div>
                                <h2>Available</h2>
                                <ul>
                                    {avaList.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h2>Unavailable</h2>
                                <ul>
                                    {notAvaList.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </PeopleWrapper>
                    <ResultWrapper>
                        <SubTitleWrapper><h1>Best Time</h1></SubTitleWrapper>
                    </ResultWrapper>
                </ContentBoxesWrapper>
            </div>
            <div className="Bottom"></div>
        </div>
      );
}

export default ShowEvent;