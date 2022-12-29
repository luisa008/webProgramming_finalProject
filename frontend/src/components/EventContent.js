import React from 'react';
import { Avatar, List, Button } from 'antd';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useMeet } from '../containers/hooks/useMeet';

const data = [
    {
      title: 'Event one',
      description: "creator: Luisa | participants: 4"
    },
    {
      title: 'Event one',
      description: "creator: Luisa | participants: 4"
    },
    {
      title: 'Event one',
      description: "creator: Luisa | participants: 4"
    },
    {
      title: 'Event one',
      description: "creator: Luisa | participants: 4"
    },
  ];

const EventContent = () => {
  const {eventList, editEvent} = useMeet();
  // setEventList(data);
  const navigate = useNavigate();

  const handleClick = (id, submitted) => {
    console.log(id)
    if(submitted){
      navigate('ShowEvent');
      editEvent(id);
    }
    else{
      navigate('/CreateEvent');
      editEvent(id);
    }
  }

    return(
        <List
            itemLayout="horizontal"
            dataSource={eventList}
            renderItem={(item) => (
            <List.Item>
                <List.Item.Meta
                title={item.title}
                description={item.description}
                />
                <Button nClick={() => {handleClick(item.id, item.submitted)}}>Go Event</Button>
            </List.Item>
            )}
        />
    );
}

export default EventContent;