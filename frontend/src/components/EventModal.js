import { useState, useEffect, useRef } from 'react';
import { Modal, Input, Form, DatePicker } from 'antd';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const getDaysArray = function(start, end) {
    for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};

const EventModal = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        const dateList = getDaysArray(new Date(dateString[0]),new Date(dateString[1]));
        console.log(dateList);
    }

    return (
        <Modal
            open={open}
            title="Create a new event"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                .validateFields()
                .then((values) => {
                    form.resetFields();
                    onCreate(values);
                })
                .catch((e) => {
                    window.alert(e);
                });
            }}
        >
            <Form form={form} layout="vertical"
                name="form_in_modal">
                <Form.Item
                    name="EventName"
                    label="Event name"
                    rules={[
                        {
                            required: true,
                            message: 'Error: Please enter the name of the event!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="Dates"
                    label="Dates"
                    rules={[
                        {
                            required: true,
                            message: 'Error: Please enter the date of the event!',
                        },
                    ]}
                >
                    <RangePicker
                        // defaultValue={[dayjs('2022/12/01', dateFormat), dayjs('2022/12/10', dateFormat)]}
                        format={dateFormat}
                        onChange={onChange}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EventModal;