import React, { useEffect } from "react";
import { Modal, Form, Input, Select, notification, Button } from "antd";

import { get, isEmpty } from "lodash";
import queries from 'core/graphql';
import { useMutation } from "@apollo/client";
const createChuyenNganh = queries.mutation.createChuyenNganh();
const updateChuyenNganh = queries.mutation.updateChuyenNganh();
const ModalChuyenNganh = ({ visible, closeModal, type, data, onCreateComplete }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  const [actCreateChuyenNganh, { data: dataCreateChuyenNganh, loading: loadingCreateChuyenNganh }] = useMutation(createChuyenNganh, {
    onCompleted: (dataReturn) => {
      const errors = get(dataReturn, 'createChuyenNganh.errors', []);
      if (!isEmpty(errors)) {
        return errors.map(item =>
          notification["error"]({
            message: 'Thông báo',
            description: item?.message,
          })
        )
      }

      const _data = get(dataReturn, 'createChuyenNganh.data', {});

      const status = get(dataReturn, 'createChuyenNganh.status', {})
      if (!isEmpty(_data)) {
        onCreateComplete(_data);
        notification.open({
          message: 'Thông báo',
          description: `Thêm ${status} chuyên ngành`,
        })
        return;
      }

      notification["error"]({
        message: "Loi ket noi",
      })
    }
  });
  const [actUpdateChuyenNganh, { data: dataUpdateChuyenNganh, loading: loadingUpdateChuyenNganh }] = useMutation(updateChuyenNganh, {
    onCompleted: (dataReturn) => {
      const errors = get(dataReturn, 'updateChuyenNganh.errors', []);
      if (!isEmpty(errors)) {
        return errors.map(item =>
          notification["error"]({
            message: item?.message,
          })
        )
      }

      const _data = get(dataReturn, 'updateChuyenNganh.data', {});

      const status = get(dataReturn, 'updateChuyenNganh.status', {})
      if (!isEmpty(_data)) {
        onCreateComplete(_data);
        notification.open({
          message: 'Thông báo',
          description: status,
        })
        return;
      }

      notification["error"]({
        message: "Loi ket noi",
      })
    }
  });

  const [form] = Form.useForm();
  useEffect(() => {
    if (isEmpty(data)) {
      return;
    }
    form.setFieldsValue({
      chuyenNganhId: data.chuyenNganhId,
      tenChuyenNganh: data.tenChuyenNganh,
      khoa: data.khoa,
      moTa: data.moTa,
    })
  }, [data])

  const handleAddChuyenNganh = () => {
    const _dataForm = form.getFieldsValue(true);
    actCreateChuyenNganh({
      variables: {
        inputs: {
          tenChuyenNganh: _dataForm?.tenChuyenNganh,
        }
      }
    })
  }
  const handleUpdateChuyenNganh = () => {
    const _dataForm = form.getFieldsValue(true);

    actUpdateChuyenNganh({
      variables: {
        inputs: {
          tenChuyenNganh: _dataForm?.tenChuyenNganh,
        },
        chuyenNganhId: _dataForm?.chuyenNganhId
      }
    })
  }
  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages" onFinish={type === 'add' ? handleAddChuyenNganh : handleUpdateChuyenNganh}>
        <Form.Item
          name={"chuyenNganhId"}
          label="Mã chuyên ngành"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={"tenChuyenNganh"}
          label="Tên chuyên ngành"
        >
          <Input value={null} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {type === 'add' ? "Thêm" : "Sửa"}
          </Button>
        </Form.Item>
        {/* <Form.Item
          label="Khoa"
        >
           <Select options={khoa} style={{ width: 290 }} placeholder='Khoa' onChange={handleChange} />
        </Form.Item> */}
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
      footer={null}
      confirmLoading={loadingCreateChuyenNganh || loadingUpdateChuyenNganh}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalChuyenNganh;
