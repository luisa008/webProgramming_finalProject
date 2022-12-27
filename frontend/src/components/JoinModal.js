import { useState, useEffect, useRef } from 'react';
import { Modal, Input, Form, DatePicker } from 'antd';

const JoinModal = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();

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
                    name="EventID"
                    label="Event ID"
                    rules={[
                        {
                            required: true,
                            message: 'Error: Please enter the ID of the event!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default JoinModal;