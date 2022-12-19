import React from 'react';
import { Avatar, List, Button } from 'antd';
import styled from 'styled-components';

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
    return(
        <List
            itemLayout="horizontal"
            dataSource={data}
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