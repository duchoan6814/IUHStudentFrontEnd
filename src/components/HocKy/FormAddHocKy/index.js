import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, notification, Button } from "antd";
import queries from 'core/graphql';
import { get, isEmpty } from "lodash";
import moment from "moment";
import { useMutation } from "@apollo/client";

const createHocKyMutation = queries.mutation.createHocKy();
const updateHocKyMutation = queries.mutation.updateNamHoc();
const ModalHocKy = ({ visible, closeModal, type, data, onCreateComplete }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  const [form] = Form.useForm();
  const [namBatDau, setnambatDau] = useState();
  const [namKetThuc, setnamketThuc] = useState();
  const [actCreateHocKy, { data: dataCreateHocKy, loading: loadingCreateHocKy }] = useMutation(createHocKyMutation, {
    onCompleted: (dataReturn) => {
      const errors = get(dataReturn, 'createHocKy.errors', []);
      if (!isEmpty(errors)) {
        return errors.map(item =>
          notification["error"]({
            message: item?.message,
          })
        )
      }

      const _data = get(dataReturn, 'createHocKy.data', {});

      const status = get(dataReturn, 'createHocKy.status', {})
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
  const [actUpdatehocKy, { data: dataUpdateHocKy, loading: loadingUpdateHocKy }] = useMutation(updateHocKyMutation, {
    onCompleted: (dataReturn) => {
      const errors = get(dataReturn, 'updateHocKy.errors', []);
      if (!isEmpty(errors)) {
        return errors.map(item =>
          notification["error"]({
            message: item?.message,
          })
        )
      }

      const _data = get(dataReturn, 'updateHocKy.data', {});

      const status = get(dataReturn, 'updateHocKy.status', {})
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
  })
  useEffect(() => {
    if (isEmpty(data)) {
      return;
    }
    form.setFieldsValue({
      hocKyId: data?.hocKyId,
      moTa: data?.moTa,
      namBatDau: type === 'add' ? null : moment(data?.namBatDau),
      namKetThuc: type === 'add' ? null : moment(data?.namKetThuc)
    });

  }, [data])
  const onChangeStart = (date, dateString) => {
    setnambatDau(dateString);
  }
  const onChangeEnd = (date, dateString) => {
    setnamketThuc(dateString);
  }

  const renderForm = () => {
    return (
      <Form {...layout}
        form={form}
        onFinish={type === 'add' ? handleAddHocKy : handleUpdateHocKy}
        name="nest-messages"
      >
        <Form.Item
          name={"hocKyId"}
          label="Mã năm học"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={"namBatDau"}
          label="Năm học bắt đầu"
        >
          <DatePicker onChange={onChangeStart} picker="year" placeholder='Năm học bắt đầu' />
        </Form.Item>
        <Form.Item
          name={"namKetThuc"}
          label="Năm học kết thúc"
        >
          <DatePicker onChange={onChangeEnd} picker="year" placeholder='Năm học kết thúc' />
        </Form.Item>
        <Form.Item
          name={"moTa"}
          label="Mô tả"
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {type === 'add' ? "Thêm" : "Sửa"}
          </Button>
        </Form.Item>
      </Form>
    );
  };
  const handleAddHocKy = () => {
    const _dataForm = form.getFieldsValue(true);
    actCreateHocKy({
      variables: {
        inputs: {
          namBatDau: namBatDau,
          namKetThuc: namKetThuc,
          moTa: _dataForm?.moTa,
        }
      }
    })
  }
  const handleUpdateHocKy = () => {
    const _dataForm = form.getFieldsValue(true);
    actUpdatehocKy({
      variables: {
        inputs: {
          namBatDau: namBatDau,
          namKetThuc: namKetThuc,
          moTa: _dataForm?.moTa,
        },
        maHocKy: _dataForm?.hocKyId,
      }
    })
  }
  return (
    <Modal
      title={type === 'add' ? 'Thêm học kỳ' : 'Sửa học kỳ'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      footer={null}
      confirmLoading={loadingCreateHocKy || loadingUpdateHocKy}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalHocKy;
