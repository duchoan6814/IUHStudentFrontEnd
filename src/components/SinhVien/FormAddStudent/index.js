import React from "react";
import { Modal, Form, Input, InputNumber } from "antd";

const ModalStudent = ({ visible, closeModal, type }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };

  const renderForm = () => {
    return (
      <Form {...layout} name="nest-messages">
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[{ type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "age"]}
          label="Age"
          rules={[{ type: "number", min: 0, max: 99 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={["user", "website"]} label="Website">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "introduction"]} label="Introduction">
          <Input.TextArea />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={type === 'add' ? 'Thêm sinh viên' : 'Sửa sinh viên'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalStudent;
