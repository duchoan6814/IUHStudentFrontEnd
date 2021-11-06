import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

import { isEmpty } from "lodash";


const ModalKhoa = ({ visible, closeModal, type, data }) => {
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
      khoaVienId: data.khoaVienId,
      tenKhoaVien: data.tenKhoaVien,
      lienKet: data.lienKet,
    })
  }, [data])

 
  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item
          name={"khoaVienId"}
          label="Mã khoa"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={"tenKhoaVien"}
          label="Tên khoa viện"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"lienKet"}
          label="Liên kết"
        >
          <Input />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={type === 'add' ? 'Thêm khoa' : 'Sửa khoa'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalKhoa;
