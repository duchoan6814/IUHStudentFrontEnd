import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, notification, Button } from "antd";
import queries from 'core/graphql';
import { get, isEmpty } from "lodash";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { createNamHocFragment } from "../fragment.CreateNamHoc";
import { getNamHocFragment } from "../fragment.NamHoc";

const createNamHocMutation = queries.mutation.createNamHoc(getNamHocFragment);

const updateNamHocMutation = queries.mutation.updateNamHoc(getNamHocFragment);
const ModalHocKy = ({ visible, closeModal, type, data, onCreateComplete }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  const [form] = Form.useForm();
  const [namBatDau, setnambatDau] = useState();
  const [namKetThuc, setnamketThuc] = useState();
  const [actCreateNamHocMutation, { data: dataCreateNamHoc, loading: loadingCreateNamHoc }] = useMutation(createNamHocMutation, {
    onCompleted: (dataReturn) => {
      const errors = get(dataReturn, 'createNamHoc.errors', []);
      if (!isEmpty(errors)) {
        return errors.map(item =>
          notification["error"]({
            message: item?.message,
          })
        )
      }

      const _data = get(dataReturn, 'createNamHoc.data', {});

      const status = get(dataReturn, 'createNamHoc.status', {})
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
  const [actUpdateNanHoc, { data: dataUpdateNamHoc, loading: loadingUpdateNamHoc }] = useMutation(updateNamHocMutation, {
    onCompleted: (dataReturn) => {
      const errors = get(dataReturn, 'updateNamHoc.errors', []);
      if (!isEmpty(errors)) {
        return errors.map(item =>
          notification["error"]({
            message: item?.message,
          })
        )
      }

      const _data = get(dataReturn, 'updateNamHoc.data', {});

      const status = get(dataReturn, 'updateNamHoc.status', {})
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
      namHocId: data?.namHocId,
      startDate: type === 'add' ? null : moment(data?.startDate),
      endDate: type === 'add' ? null : moment(data?.endDate)
    });
    setnambatDau(data?.startDate);
    setnamketThuc(data?.endDate);
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
          name={"namHocId"}
          label="Mã năm học"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={"startDate"}
          label="Năm học bắt đầu"
        >
          <DatePicker onChange={onChangeStart} placeholder='Năm học bắt đầu' />
        </Form.Item>
        <Form.Item
          name={"endDate"}
          label="Năm học kết thúc"
        >
          <DatePicker onChange={onChangeEnd} placeholder='Năm học kết thúc' />
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
    actCreateNamHocMutation({
      variables: {
        intputs: {
          startDate: namBatDau,
          endDate: namKetThuc,
        }
      }
    })
  }
  const handleUpdateHocKy = () => {
    const _dataForm = form.getFieldsValue(true);
    actUpdateNanHoc({
      variables: {
        inputs: {
          startDate: namBatDau,
          endDate: namKetThuc,
        },
        namHocId: _dataForm?.namHocId,
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
      confirmLoading={loadingCreateNamHoc || loadingUpdateNamHoc}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalHocKy;
