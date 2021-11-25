import React, { useEffect } from "react";
import { Modal, Form, Input,Select, notification } from "antd";

import {get, isEmpty } from "lodash";
import queries from 'core/graphql';
import { useMutation } from "@apollo/client";
const createChuyenNganh= queries.mutation.createChuyenNganh();
const updateChuyenNganh= queries.mutation.updateChuyenNganh();
const ModalChuyenNganh = ({ visible, closeModal, type, data,onCreateComplete }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  const [actCreateChuyenNganh,{data:dataCreateChuyenNganh,loading: loadingCreateChuyenNganh}]= useMutation(createChuyenNganh,{
    onCompleted: (dataReturn) => {
      const errors = get(dataReturn, 'createChuyenNganh.errors', []);
      if(!isEmpty(errors)) {
        return errors.map(item => 
            notification["error"]({
              message: item?.message,
            })
          )
      }

      const _data = get(dataReturn, 'createChuyenNganh.data', {});

      if(!isEmpty(_data)) {
        onCreateComplete(_data)
        return;
      }

      notification["error"]({
        message: "Loi ket noi",
      })
    }
  });
  const [actUpdateChuyenNganh,{data:dataUpdateChuyenNganh,loading: loadingUpdateChuyenNganh}]= useMutation(updateChuyenNganh,{
    onCompleted: (dataReturn) => {
      const errors = get(dataReturn, 'updateChuyenNganh.errors', []);
      if(!isEmpty(errors)) {
        return errors.map(item => 
            notification["error"]({
              message: item?.message,
            })
          )
      }

      const _data = get(dataReturn, 'updateChuyenNganh.data', {});

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
      chuyenNganhId: data.chuyenNganhId,
      tenChuyenNganh: data.tenChuyenNganh,
      khoa: data.khoa,
      moTa: data.moTa,
    })
  }, [data])
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const khoa = [
    { value: 'cnnt', label: 'CNTT' },
    { value: 'taiNgan', label: 'Tài ngân' },

  ]
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
  const handleUpdateChuyenNganh=()=>{
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
      <Form {...layout} form={form} name="nest-messages">
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
          <Input  />
        </Form.Item>
        
        <Form.Item
          label="Khoa"
        >
           <Select options={khoa} style={{ width: 290 }} placeholder='Khoa' onChange={handleChange} />
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
      onOk={type==='add'? handleAddChuyenNganh :handleUpdateChuyenNganh}
      onCreateComplete={loadingCreateChuyenNganh||loadingUpdateChuyenNganh}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalChuyenNganh;
