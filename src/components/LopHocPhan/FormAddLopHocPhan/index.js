import React, { useEffect, useState } from "react";
import { Modal, Form, Input, notification, Button, Select } from "antd";

import { isEmpty } from "lodash";
import { useMutation, useQuery } from "@apollo/client";

import { get } from "lodash";
import queries from "core/graphql";

const createLopHocPhanMutation = queries.mutation.createLopHocPhan();
const updateLopHocPhanMutation = queries.mutation.updateLopHocPhan();
const getHocPhanQuery = queries.query.getHocPhans(`
hocPhanId
maHocPhan
moTa
batBuoc
`);

const ModalAddLopHocPhan = ({
  visible,
  closeModal,
  type,
  data,
  onCompleteAction,
}) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  const [trangThaiLopHocPhan, setTrangThaiLopHocPhan] = useState();

  const {data: dataGetHocPhan, loading: loadingGetHocPhan} = useQuery(getHocPhanQuery);

  const [
    actCreateLopHocPhan,
    { data: dataCreateLopHocPhan, loading: loadingCreateLopHocPhan },
  ] = useMutation(createLopHocPhanMutation, {
    onCompleted: (dataReturn) => {
      const errors = get(dataReturn, "createLopHocPhan.errors", []);
      if (!isEmpty(errors)) {
        return errors.map((item) =>
          notification["error"]({
            message: `Thông báo`,
            description: item?.message,
          })
        );
      }

      const _data = get(dataReturn, "createLopHocPhan.data", {});
      const status = get(dataReturn, "createLopHocPhan.status", {});
      if (!isEmpty(_data)) {
        onCompleteAction(_data);
        notification.open({
          message: "Thông báo",
          description: status,
        });
        return;
      }

      notification["error"]({
        message: "Loi ket noi",
      });
    },
  });
  const [
    actUpdateLopHocPhan,
    { data: dataUpdateLopHocPhan, loading: loadingUpdateLopHocPhan },
  ] = useMutation(updateLopHocPhanMutation, {
    onCompleted: (dataReturn) => {
      const errors = get(dataReturn, "updateLopHocPhan.errors", []);
      if (!isEmpty(errors)) {
        return errors.map((item) =>
          notification["error"]({
            message: item?.message,
          })
        );
      }

      const _data = get(dataReturn, "updateLopHocPhan.data", {});

      const status = get(dataReturn, "updateLopHocPhan.status", {});
      if (!isEmpty(_data)) {
        onCompleteAction(_data);
        notification.open({
          message: "Thông báo",
          description: status,
        });
        return;
      }

      notification["error"]({
        message: "Loi ket noi",
      });
    },
  });
  const [form] = Form.useForm();
  useEffect(() => {
    if (isEmpty(data)) {
      return;
    }
    form.setFieldsValue({
      lopHocPhanId: data.lopHocPhanId,
      maLopHocPhan: data.maLopHocPhan,
      tenVietTat: data.tenVietTat,
      tenLopHocPhan: data.tenLopHocPhan,
      soNhomThucHanh: data.soNhomThucHanh,
      soLuongToiDa: data.soLuongToiDa,
      moTa: data.moTa,
    });
    setTrangThaiLopHocPhan(data.trangThaiLopHocPhan);
  }, [data]);
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  const handleAddLop = () => {
    const _dataForm = form.getFieldsValue(true);
    actCreateLopHocPhan({
      variables: {
        inputs: {
          maLopHocPhan: _dataForm?.maLopHocPhan,
          tenVietTat: _dataForm?.tenVietTat,
          tenLopHocPhan: _dataForm?.tenLopHocPhan,
          soNhomThucHanh: _dataForm?.soNhomThucHanh,
          trangThaiLopHocPhan: trangThaiLopHocPhan,
          soLuongToiDa: _dataForm?.soLuongToiDa,
          moTa: _dataForm?.moTa,
        },
      },
    });
  };
  const handleEditLop = () => {
    const _dataForm = form.getFieldsValue(true);
    actUpdateLopHocPhan({
      variables: {
        inputs: {
          maLopHocPhan: _dataForm?.maLopHocPhan,
          tenVietTat: _dataForm?.tenVietTat,
          tenLopHocPhan: _dataForm?.tenLopHocPhan,
          soNhomThucHanh: _dataForm?.soNhomThucHanh,
          trangThaiLopHocPhan: trangThaiLopHocPhan,
          soLuongToiDa: _dataForm?.soLuongToiDa,
          moTa: _dataForm?.moTa,
        },
        lopHocPhanId: _dataForm.lopHocPhanId,
      },
    });
  };
  function handleChange(type, value) {
    if (type === "trangThaiLopHocPhan") {
      setTrangThaiLopHocPhan(value);
    }
  }
  const trangThaiLopHocPhan1 = [
    { value: "DANG_LEN_KE_HOACH", label: "DANG_LEN_KE_HOACH" },
    { value: "CHO_SINH_VIEN_DANG_KY", label: "CHO_SINH_VIEN_DANG_KY" },
    { value: "CHAP_NHAN_MO_LOP", label: "CHAP_NHAN_MO_LOP" },
    { value: "HUY_LOP_HOC_PHAN", label: "HUY_LOP_HOC_PHAN" },
    { value: "DA_KHOA", label: "DA_KHOA" },
  ];
  const renderForm = () => {
    return (
      <Form
        {...layout}
        onFinish={type === "add" ? handleAddLop : handleEditLop}
        form={form}
        name="nest-messages"
      >
        <Form.Item name={"lopHocPhanId"} label="Lop ID">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={"maLopHocPhan"}
          label="Mã lớp học phần"
          rules={[{ required: true, message: "Yêu cầu nhập mã lớp học phần!" }]}
        >
          <Input value={null} />
        </Form.Item>
        <Form.Item name={"tenVietTat"} label="Tên viết tắt">
          <Input value={null} />
        </Form.Item>
        <Form.Item name={"tenLopHocPhan"} label="Tên lớp học phần">
          <Input value={null} />
        </Form.Item>
        <Form.Item name={"soNhomThucHanh"} label="Số nhóm thực hành">
          <Input type={"number"} />
        </Form.Item>
        <Form.Item label="Trạng thái lớp học phần">
          <Select
            options={trangThaiLopHocPhan1}
            style={{ width: 290 }}
            value={trangThaiLopHocPhan}
            placeholder="Trạng thái lớp học phần"
            onChange={(value) => handleChange("trangThaiLopHocPhan", value)}
          />
        </Form.Item>
        <Form.Item name={"soLuongToiDa"} label="Số lượng tối đa">
          <Input type={"number"} />
        </Form.Item>
        <Form.Item name={"moTa"} label="Mô tả">
          <Input />
        </Form.Item>
        <Form.Item label="Mã học phần">
          <Select
            style={{ width: 290 }}
            placeholder="Học phần"
            options={dataGetHocPhan?.getHocPhans?.data?.map((item) => ({
              label: item?.maHocPhan,
              value: item?.hocPhanId,
            }))}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {type === "add" ? "Thêm" : "Sửa"}
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return (
    <Modal
      title={type === "add" ? "Thêm lớp học phần" : "Sửa lớp học phần"}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      footer={null}
      confirmLoading={loadingCreateLopHocPhan || loadingUpdateLopHocPhan}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalAddLopHocPhan;
