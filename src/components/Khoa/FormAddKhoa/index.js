import React, { useEffect } from "react";
import { Modal, Form, Input, notification, Button } from "antd";
import { useMutation } from '@apollo/client';

import { get, isEmpty } from "lodash";
import queries from 'core/graphql';

const createKhoaMutation = queries.mutation.createKhoa();
const updateKhoaMutation = queries.mutation.updateKhoa();

const ModalKhoa = ({ visible, closeModal, type, data, onCreateComplete }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };

  const [actUpdateKhoa, { data: dataUpdateKhoa, loading: loadingUpdateKhoa }] = useMutation(updateKhoaMutation, {
    onCompleted: (dataReturn) => {
      const errors = get(dataReturn, 'updateKhoa.errors', []);
      if (!isEmpty(errors)) {
        return errors.map(item =>
          notification["error"]({
            message: item?.message,
          })
        )
      }

      const _data = get(dataReturn, 'updateKhoa.data', {});

      const status = get(dataReturn, 'updateKhoa.status', {})
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

  const [actCreateKhoa, { data: dataCreateKhoa, loading: loadingCreateKhoa }] = useMutation(createKhoaMutation,
    {
      onCompleted: (dataReturn) => {
        const errors = get(dataReturn, 'createKhoa.errors', []);
        if (!isEmpty(errors)) {
          return errors.map(item =>
            notification["error"]({
              message: item?.message,
            })
          )
        }
        const _data = get(dataReturn, 'createKhoa.data', {});
        const status = get(dataReturn, 'createKhoa.status', {})
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
      khoaVienId: data.khoaVienId,
      tenKhoaVien: data.tenKhoaVien,
      lienKet: data.lienKet,
    })
  }, [data])


  const renderForm = () => {
    return (
      <Form {...layout}
        form={form}
        name="nest-messages"
        onFinish={type === 'add' ? handleAddKhoa : handleEditKhoa}

      >
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
          <Input defaultValue={null} />
        </Form.Item>
        <Form.Item
          name={"lienKet"}
          label="Liên kết"
        >
          <Input value={null} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {type === 'add' ? "Thêm" : "Sửa"}
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const handleAddKhoa = () => {
    const _dataForm = form.getFieldsValue(true);
    actCreateKhoa({
      variables: {
        inputs: {
          tenKhoaVien: _dataForm?.tenKhoaVien,
          lienKet: _dataForm?.lienKet
        }
      }
    })
  }

  const handleEditKhoa = () => {
    const _dataForm = form.getFieldsValue(true);

    actUpdateKhoa({
      variables: {
        inputs: {
          tenKhoaVien: _dataForm?.tenKhoaVien,
          lienKet: _dataForm?.lienKet
        },
        maKhoa: _dataForm?.khoaVienId
      }
    })
  }

  return (
    <Modal
      title={type === 'add' ? 'Thêm khoa' : 'Sửa khoa'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      footer={null}
      confirmLoading={loadingCreateKhoa || loadingUpdateKhoa}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalKhoa;
