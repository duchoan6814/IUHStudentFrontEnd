import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Select, notification } from "antd";
import { useMutation } from "@apollo/client";
import { get, isEmpty } from "lodash";
import queries from "core/graphql";
import moment from 'moment';
import 'moment/locale/zh-cn';

const createSinhVienMutation = queries.mutation.createSinhVien();
const updateSinhVienMutation = queries.mutation.updateSinhVien();
const { Option, OptGroup } = Select;



const ModalStudent = ({ visible, closeModal, type, data, onCreateComplete }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  const [actUpdateSinhVien, { data: dataUpdateSinhVien, loading: lodingUpdateSinhVien }] = useMutation(updateSinhVienMutation,
    {
      onCompleted: (dataReturn) => {
        const errors = get(dataReturn, 'updateSinhVien.errors', []);
        if (!isEmpty(errors)) {
          return errors.map(item =>
            notification["error"]({
              message: item?.message,
            })
          )
        }

        const _data = get(dataReturn, 'updateSinhVien.data', {});

        if (!isEmpty(_data)) {
          onCreateComplete(_data)
          return;
        }

        notification["error"]({
          message: "Loi ket noi",
        })
      }
    });
  const [actCreateSinhVien, { data: dataCreateSinhVien, loading: loadingSinhVien }] = useMutation(createSinhVienMutation,
    {
      onCompleted: (dataReturn) => {
        const errors = get(dataReturn, 'createSinhVien.errors', []);
        if (!isEmpty(errors)) {
          return errors.map(item =>
            notification["error"]({
              message: item?.message,
            })
          )
        }

        const _data = get(dataReturn, 'createSinhVien.data', {});

        if (!isEmpty(_data)) {
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
      sinhVienId: data.sinhVienId,
      maSinhVien: data.maSinhVien,
      name: data.name,
      maHoSo: data.maHoSo,
      image: data.image,
      hoTenDem: data.hoTenDem,
      ten: data.ten,
      gioiTinh: data.gioiTinh,
      ngaySinh: data.ngaySinh,
      bacDaoTao: data.bacDaoTao,
      trangThai: data.trangThai,
      loaiHinhDaoTao: data.loaiHinhDaoTao,
      ngayVaoTruong: data.ngayVaoTruong,
      ngayVaoDoan: data.ngayVaoDoan,
      soDienThoai: data.soDienThoai,
      loaiHinhDaoTao: data.loaiHinhDaoTao,
      diaChi: data.diaChi,
      noiSinh: data.noiSinh,
      hoKhauThuongTru: data.hoKhauThuongTru,
      danToc: data.danToc,
      ngayVaoDang: data.ngayVaoDang,
      email: data.email,
      tonGiao: data.tonGiao,
    })
  }, [data])

  const bacDaoTao = [
    { value: 'Cd', label: 'CAO_DANG' },
    { value: 'dh', label: 'DAI_HOC' },
  ]
  const trangThai = [
    { value: 'dh', label: 'DANG_HOC' },
    { value: 'rh', label: 'RA_TRUONG' },
    { value: 'bl', label: 'BAO_LUU' },
  ]
  const loaiHinhDaoTao = [
    { value: 'tt', label: 'TIEN_TIEN' },
    { value: 'dt', label: 'DAI_TRA' },
  ]
  const tonGiao = [
    { value: 'pg', label: 'PHAT_GIAO' },
    { value: 'k', label: 'KHONG' },
  ]
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const renderForm = () => {
    return (
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item
          name={"sinhVienId"}
          label="sinhVienId"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={"maSinhVien"}
          label="MSSV"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"maHoSo"}
          label="Mã hồ sơ"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"image"}
          label="image"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"hoTenDem"}
          label="Họ tên đệm"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"ten"}
          label="Tên"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Chuyên ngành">
          <Select style={{ width: 200 }} placeholder='Chuyên ngành' onChange={handleChange}>
            <OptGroup label="CNTT">
              <Option value="jack">Ky thuat phan mem</Option>
              <Option value="lucy">Khoa hoc du lieu</Option>
            </OptGroup>
          </Select>
        </Form.Item>

        <Form.Item label="Bậc đào tạo">
          <Select options={bacDaoTao} style={{ width: 290 }} defaultValue={"Cd"} placeholder='Bậc đào tạo' onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Trạng thái">
          <Select options={trangThai} style={{ width: 290 }} defaultValue={"dh"} placeholder='Trạng thái' onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Loại hình đào tạo">
          <Select options={loaiHinhDaoTao} style={{ width: 290 }} placeholder='Loại hình đào tạo' onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Ngày sinh">
          <DatePicker defaultValue={moment("2021-02-21", 'YYYY-MM-DD')} getPopupContainer={(trigger) => { console.log(trigger) }} placeholder='Ngày sinh' />
        </Form.Item>
        <Form.Item label="Ngày vào trường">
          <DatePicker placeholder='Ngày vào trường' />
        </Form.Item>
        <Form.Item label="Ngày vào đoàn" >
          <DatePicker placeholder='Ngày vào đoàn' />
        </Form.Item>
        <Form.Item label="Ngày vào Đảng" >
          <DatePicker placeholder='Ngày vào Đảng' />
        </Form.Item>

        <Form.Item
          name={"soDienThoai"}
          label="Số điện thoại"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"diaChi"}
          label="Địa chỉ"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"noiSinh"}
          label="Nơi sinh"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"hoKhauThuongTru"}
          label="Hộ khẩu thường trú"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"danToc"}
          label="Dân tộc"
          defaultValue={"KINH"}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"email"}
          label="Email"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Tôn giáo">
          <Select options={tonGiao} style={{ width: 290 }} placeholder='Tôn giáo' onChange={handleChange} />
        </Form.Item>
      </Form>
    );
  };
  const handleAddSinhVien = () => {
    const _dataForm = form.getFieldsValue(true);
    console.log("data", _dataForm);
    actCreateSinhVien({
      variables: {
        inputs: {
          username: _dataForm?.maSinhVien,
          password: "123456",
          sinhVien: {
            maSinhVien: _dataForm?.maSinhVien,
            maHoSo: _dataForm?.maHoSo,
            hoTenDem: _dataForm?.hoTenDem,
            ten: _dataForm?.ten,
            ngaySinh: _dataForm?.ngaySinh,
            // bacDaoTao:
            // trangThai
            // loaiHinhDaoTao
            ngayVaoTruong: _dataForm?.ngayVaoTruong,
            ngayVaoDoan: _dataForm?.ngayVaoDoan,
            soDienThoai: _dataForm?.soDienThoai,
            diaChi: _dataForm?.diaChi,
            noiSinh: _dataForm?.noiSinh,
            hoKhauThuongTru: _dataForm?.hoKhauThuongTru,
            // danToc
            ngayVaoDang: _dataForm?.ngayVaoDang,
            email: _dataForm?.email,
            // tonGiao
          }
        }
      }
    })
  }
  const handleUpdateSinhVien = () => {
    const _dataForm = form.getFieldsValue(true);
    console.log("data", _dataForm);
    actUpdateSinhVien({
      variables: {
        inputs: {
            maHoSo: _dataForm?.maHoSo,
            hoTenDem: _dataForm?.hoTenDem,
            ten: _dataForm?.ten,
            // ngaySinh: _dataForm?.ngaySinh,
            // bacDaoTao:
            // trangThai
            // loaiHinhDaoTao
            // ngayVaoTruong: _dataForm?.ngayVaoTruong,
            // ngayVaoDoan: _dataForm?.ngayVaoDoan,
            soDienThoai: _dataForm?.soDienThoai,
            diaChi: _dataForm?.diaChi,
            noiSinh: _dataForm?.noiSinh,
            hoKhauThuongTru: _dataForm?.hoKhauThuongTru,
            // danToc
            // ngayVaoDang: _dataForm?.ngayVaoDang,
            email: _dataForm?.email,
            // tonGiao
          
        },
        maSinhVien:_dataForm?.maSinhVien
      }
    })
  }
  return (
    <Modal
      title={type === 'add' ? 'Thêm sinh viên' : 'Sửa sinh viên'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
      onOk={type === 'add' ? handleAddSinhVien : handleUpdateSinhVien}
      conformLoading={loadingSinhVien || lodingUpdateSinhVien}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalStudent;
