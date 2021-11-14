import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, notification } from "antd";
import { get, isEmpty } from "lodash";
import queries from 'core/graphql';
import { useMutation } from "@apollo/client";

const createMonHocMutation = queries.mutation.createMonHoc();
const updateMonHocMutation = queries.mutation.updateMonHoc();

const ModalMonHoc = ({ visible, closeModal, type, data, onCreateComplete }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  

  const [actCreateMonHoc, { data: dataCreateKhoa, loading: loadingCreateMonHoc }] = useMutation(createMonHocMutation,
    {
      onCompleted: (dataReturn) => {
        const errors = get(dataReturn, 'createMonHoc.errors', []);
        if (!isEmpty(errors)) {
          return errors.map(item =>
            notification["error"]({
              message: item?.message,
            })
          )
        }

        const _data = get(dataReturn, 'createMonHoc.data', {});

        if (!isEmpty(_data)) {
          onCreateComplete(_data)
          return;
        }

        notification["error"]({
          message: "Loi ket noi",
        })
      }
    });
  const [actUpdateMonHoc, { data: dataUpdateKhoa, loading: loadingUpdateMonHoc }] = useMutation(updateMonHocMutation,{
    onCompleted: (dataReturn) => {
      const errors = get(dataReturn, 'updateMonHoc.errors', []);
        if(!isEmpty(errors)) {
          return errors.map(item => 
              notification["error"]({
                message: item?.message,
              })
            )
        }

        const _data = get(dataReturn, 'updateMonHoc.data', {});

        if(!isEmpty(_data)) {
          onCreateComplete(_data)
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
      monHocId: data.monHocId,
      tenMonHoc: data.tenMonHoc,
      moTa: data.moTa,
    })
  }, [data])

  const handleAddMonHoc = () => {
    const _dataForm = form.getFieldsValue(true);
    actCreateMonHoc({
      variables: {
        inputs: {
          tenMonHoc: _dataForm?.tenMonHoc,
          moTa: _dataForm?.moTa
        }
      }
    })
  }
  const handleEditMonHoc = () => {
    const _dataForm = form.getFieldsValue(true);

    actUpdateMonHoc({
      variables: {
        inputs: {
          tenMonHoc: _dataForm?.tenMonHoc,
          moTa: _dataForm?.moTa
        },
        monHocId: _dataForm?.monHocId
      }
    })
  }
  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item
          name={"monHocId"}
          label="Mã năm học"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={"tenMonHoc"}
          label="Tên môn học"
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
      title={type === 'add' ? 'Thêm môn học' : 'Sửa môn học'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      onOk={type === 'add' ? handleAddMonHoc : handleEditMonHoc}
      onCreateComplete={loadingCreateMonHoc || loadingUpdateMonHoc}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalMonHoc;
