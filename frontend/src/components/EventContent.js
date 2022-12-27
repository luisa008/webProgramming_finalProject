import React from 'react';
import { Avatar, List, Button } from 'antd';
import styled from 'styled-components';
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
  const {eventList, setEventList} = useMeet();
  setEventList(data);

    return(
        <List
            itemLayout="horizontal"
            dataSource={eventList}
            renderItem={(item) => (
            <List.Item>
                <List.Item.Meta
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.description}
                />
            </List.Item>
            )}
        />
    );
}

export default EventContent;