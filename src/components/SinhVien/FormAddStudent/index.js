import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";

import { isEmpty } from "lodash";
const { Option, OptGroup } = Select;

const ModalStudent = ({ visible, closeModal, type, data }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
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
    { value: 'Cd', label: 'Cao dang' },
    { value: 'dh', label: 'Dai hoc' },
    { value: 'tc', label: 'Trung cap' }
  ]
  const khoaHoc = [
    { value: 'k14', label: '2018-2022' },
    { value: 'k13', label: '2019-2022' },

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
        <Select style={{ width: 200, margin: 10, marginLeft: 40 }} placeholder='Chuyên ngành' onChange={handleChange}>
          <OptGroup label="CNTT">
            <Option value="jack">Ky thuat phan mem</Option>
            <Option value="lucy">Khoa hoc du lieu</Option>
          </OptGroup>
          <OptGroup label="Tai ngan">
            <Option value="tcnh">Tai chinh ngan hang</Option>
          </OptGroup>
        </Select>
        <Select options={bacDaoTao} style={{ width: 290, margin: 10, marginLeft: 40 }} placeholder='Bậc đào tạo' onChange={handleChange} />
        <Select options={khoaHoc} style={{ width: 290, margin: 10, marginLeft: 40 }} placeholder='Khóa học' onChange={handleChange} />
        <Form.Item
          name={"ten"}
          label="Tên"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"mahs"}
          label="Mã hồ sơ"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"soDienThoai"}
          label="Số điện thoại"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Ngày sinh">
          <DatePicker placeholder='Ngày sinh' />
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
          name={"email"}
          label="Email"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"tonGiao"}
          label="Tôn giáo"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"hoKhauThuongTru"}
          label="Hộ khẩu thường trú"
        >
          <Input />
        </Form.Item>
        <Select options={khoaHoc} style={{ width: 290, margin: 10, marginLeft: 160 }} placeholder='Trang thái học tập' onChange={handleChange} />
        <Select options={khoaHoc} style={{ width: 290, margin: 10, marginLeft: 160 }} placeholder='Loại hình đào tạo' onChange={handleChange} />
        <Select options={khoaHoc} style={{ width: 290, margin: 10, marginLeft: 160 }} placeholder='Dân tộc' onChange={handleChange} />
        <Select options={khoaHoc} style={{ width: 290, margin: 10, marginLeft: 160 }} placeholder='Tôn giáo' onChange={handleChange} />
        <Select options={khoaHoc} style={{ width: 290, margin: 10, marginLeft: 160 }} placeholder='Đối tượng' onChange={handleChange} />
      </Form>
    );
  };

  return (
    <Modal
      title={type === 'add' ? 'Thêm sinh viên' : 'Sửa sinh viên'}
      centered
      visible={visible}
      onCancel={() => closeModal(false)}
      width={1000}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalStudent;
