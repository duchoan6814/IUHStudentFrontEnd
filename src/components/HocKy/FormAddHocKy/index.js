import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, notification } from "antd";
import queries from 'core/graphql';
import { get, isEmpty } from "lodash";
import moment from "moment";
import { useMutation } from "@apollo/client";

const createHocKyMutation = queries.mutation.createHocKy();
const updateHocKyMutation = queries.mutation.updateHocKy();
const ModalHocKy = ({ visible, closeModal, type, data, onCreateComplete }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  const [form] = Form.useForm();
  const [nambatDau, setnambatDau] = useState();
  const [namketThuc, setnamketThuc] = useState();
  const [actCreateHocKy, { data: dataCreateHocKy, loading: loadingCreateHocKy }] = useMutation(createHocKyMutation,{
    onCompleted: (dataReturn) => {
      const errors = get(dataReturn, 'createHocKy.errors', []);
      if(!isEmpty(errors)) {
        return errors.map(item => 
            notification["error"]({
              message: item?.message,
            })
          )
      }

      const _data = get(dataReturn, 'createHocKy.data', {});

      if(!isEmpty(_data)) {
        onCreateComplete(_data)
        return;
      }

      notification["error"]({
        message: "Loi ket noi",
      })
    }
  });
  const [actUpdatehocKy,{data: dataUpdateHocKy,loading:loadingUpdateHocKy}]= useMutation(updateHocKyMutation,{
    onCompleted: (dataReturn) => {
      const errors = get(dataReturn, 'updateHocKy.errors', []);
      if(!isEmpty(errors)) {
        return errors.map(item => 
            notification["error"]({
              message: item?.message,
            })
          )
      }

      const _data = get(dataReturn, 'updateHocKy.data', {});

      if(!isEmpty(_data)) {
        onCreateComplete(_data)
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
      hocKyId: data.hocKyId,
      moTa: data.moTa,
    });
    setnambatDau(data.namBatDau);
    setnamketThuc(data.namKetThuc);
  }, [data])
  const onChangeStart = (date, dateString) => {
    setnambatDau(dateString);
  }
  const onChangeEnd = (date, dateString) => {
    setnamketThuc(dateString);
  }

  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
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
          <DatePicker onChange={onChangeStart} value={type === 'add' ? null : moment(nambatDau)} picker="year" placeholder='Năm học bắt đầu' />
        </Form.Item>
        <Form.Item
          name={"namKetThuc"}
          label="Năm học kết thúc"
        >
          <DatePicker onChange={onChangeEnd} value={type === 'add' ? null : moment(namketThuc)} picker="year" placeholder='Năm học kết thúc' />
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
  const handleAddHocKy = () => {
    const _dataForm = form.getFieldsValue(true);
    actCreateHocKy({
      variables: {
        inputs: {
          namBatDau: nambatDau,
          namKetThuc: namketThuc,
          moTa: _dataForm?.moTa,
        }
      }
    })
  }
  const handleUpdateHocKy = () => {
    const _dataForm = form.getFieldsValue(true);
    actUpdatehocKy({
      variables:{
        inputs:{
          namBatDau: nambatDau,
          namKetThuc: namketThuc,
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
      onOk={type === 'add' ? handleAddHocKy : handleUpdateHocKy}
      onCreateComplete={loadingCreateHocKy|| loadingUpdateHocKy}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalHocKy;
