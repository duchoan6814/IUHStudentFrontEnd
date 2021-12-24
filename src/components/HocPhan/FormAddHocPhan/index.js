import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, notification } from "antd";
import { get, isEmpty } from "lodash";
import queries from 'core/graphql';
import { useMutation, useQuery } from "@apollo/client";
import { hocPhanFragment } from "../fragment";
const createHocPhan = queries.mutation.createHocPhan(hocPhanFragment);
const updateHocPhanMutation = queries.mutation.updateHocPhan(hocPhanFragment);
const getMonHocQuery = queries.query.getMonHocs(`
monHocId
tenMonHoc
`)
const ModalHocPhan = ({ visible, closeModal, type, data, onCreateComplete }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  const [hocPhan, setHocPhan] = useState({});
  const [batBuoc, setbatBuoc] = useState();

  const {data: dataGetMonHoc} = useQuery(getMonHocQuery);

  const [actCreateKhoaHocPhan, { data: dataCreateHocPhan, loading: loadingCreateHocPhan }] = useMutation(createHocPhan,
    {
      onCompleted: (dataReturn) => {
        const errors = get(dataReturn, 'createHocPhan.errors', []);
        if (!isEmpty(errors)) {
          return errors.map(item =>
            notification["error"]({
              message: item?.message,
            })
          )
        }
        const _data = get(dataReturn, 'createHocPhan.data', {});
        const status = get(dataReturn, 'createHocPhan.status', {})
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
  const [actUpdateHocPhan, { data: dataUpdateHocPhan, loading: loadingUpdateHocPhan }] = useMutation(updateHocPhanMutation, {
    onCompleted: (dataReturn) => {
      const errors = get(dataReturn, 'updateHocPhan.errors', []);
      if (!isEmpty(errors)) {
        return errors.map(item =>
          notification["error"]({
            message: item?.message,
          })
        )
      }

      const _data = get(dataReturn, 'updateHocPhan.data', {});

      const status = get(dataReturn, 'updateHocPhan.status', {})
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
  const handleAdd = () => {
    const _dataForm = form.getFieldsValue(true);
    actCreateKhoaHocPhan({
      variables: {
        inputs: {
          maHocPhan: _dataForm?.maHocPhan,
          batBuoc: batBuoc,
          moTa: _dataForm?.moTa,
        }
      }
    })
  }
  const handleEdit = () => {
    const _dataForm = form.getFieldsValue(true);

    actUpdateHocPhan({
      variables: {
        inputs: {
          maHocPhan: _dataForm?.maHocPhan,
          batBuoc: batBuoc,
          moTa: _dataForm?.moTa,
        },
        hocPhanId: _dataForm?.hocPhanId
      }
    })
  }

  const [form] = Form.useForm();
  useEffect(() => {
    if (isEmpty(data)) {
      return;
    }
    form.setFieldsValue({
      hocPhanId: data.hocPhanId,
      maHocPhan: data.maHocPhan,
      moTa: data.moTa,
    })
    setbatBuoc(data.batBuoc);
  }, [data])
  const hocPhanBatBuoc1 = [
    { value: 'true', label: 'Bắt buộc' },
    { value: 'false', label: 'Không bắt buộc' },
  ];

  function handleChange(type, value) {

    if (type === 'batBuoc') {
      setbatBuoc(value);
    }
  }
  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages" onFinish={type === 'add' ? handleAdd : handleEdit}>
        <Form.Item
          name={"hocPhanId"}
          label="học phần ID"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={"maHocPhan"}
          label="Mã học phần"
          rules={[{ required: true, message: 'Yêu cầu nhập mã học phần!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"batBuoc"}
          label="Học phần bắt buộc"
        >
          <Select
            options={hocPhanBatBuoc1}
            style={{ width: 290 }}
            value={type === "add" ? "" : (batBuoc ? "Bắt buộc" : "Không bắt buộc")}
            onChange={(value) => handleChange('batBuoc', value)} />
        </Form.Item>
        <Form.Item
          name={"moTa"}
          label="Mô tả"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Tên môn học">
          <Select
            style={{ width: 290 }}
            placeholder="Môn học"
            options={dataGetMonHoc?.getMonHocs?.data?.map((item) => ({
              label: item?.tenMonHoc,
              value: item?.monHocId,
            }))}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {type === 'add' ? "Thêm" : "Sửa"}
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return (
    <Modal
      title={type === 'add' ? 'Thêm học phần' : 'Sửa học phần'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      footer={null}
      confirmLoading={loadingCreateHocPhan || loadingUpdateHocPhan}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalHocPhan;
