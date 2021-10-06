import React, { useEffect, useState } from "react";
import { Modal, Form, Input, } from "antd";

import { isEmpty } from "lodash";


const ModalChuyenNganh = ({ visible, closeModal, type, data }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  const [form] = Form.useForm();
  useEffect(() => {
    if (isEmpty(data)) {
      return;
    }
    form.setFieldsValue({
      maNamHoc: data.maNamHoc,
      namHocBatDau: data.namHocBatDau,
      namHocKetThuc: data.namHocKetThuc,
      hocKy:data.hocKy,
      moTa: data.moTa,
    })
  }, [data])


  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item
          name={"maNamHoc"}
          label="Mã năm học"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={"namHocBatDau"}
          label="Năm học bắt đầu"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"namHocKetThuc"}
          label="Năm học kết thúc"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"hocKy"}
          label="Học kỳ"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"moTa"}
          label="Mô tả"
        >
          <Input />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={type === 'add' ? 'Thêm chuyên ngành' : 'Sửa chuyên ngành'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalChuyenNganh;
