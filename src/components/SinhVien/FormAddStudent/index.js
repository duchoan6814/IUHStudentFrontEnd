import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Select, notification, Button } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { get, isEmpty } from "lodash";
import queries from "core/graphql";
import moment from 'moment';
import 'moment/locale/zh-cn';
import { getKhoafragment } from "components/Khoa/fragment";

const createSinhVienMutation = queries.mutation.createSinhVien();
const updateSinhVienMutation = queries.mutation.updateSinhVien();
const { Option, OptGroup } = Select;



const ModalStudent = ({ visible, closeModal, type, data, onCreateComplete }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
  };
  const [ngaySinh, setngaySinh] = useState();
  const [ngayVaoDoan, setngayVaoDoan] = useState();
  const [ngayVaoTruong, setngayVaoTruong] = useState();
  const [ngayVaoDang, setngayVaoDang] = useState();
  const [trangThai1, settrangThai] = useState();
  const [bacDaoTao1, setbacDaoTao] = useState();
  const [loaiHinhDaoTao1, setloaiHinhDaoTao] = useState();
  const [tonGiao1, settonGiao] = useState();

  const [actUpdateSinhVien, { data: dataUpdateSinhVien, loading: lodingUpdateSinhVien }] = useMutation(updateSinhVienMutation,
    {
      onCompleted: (dataReturn) => {
        const errors = get(dataReturn, 'updateSinhVien.errors', []);
        if (!isEmpty(errors)) {
          return errors.map(item =>
            notification["error"]({
              message: 'Thông báo',
              description: item?.message,
            })
          )
        }

        const _data = get(dataReturn, 'updateSinhVien.data', {});
        const status = get(dataReturn, 'updateSinhVien.status', {})
        if (!isEmpty(_data)) {
          onCreateComplete(_data);
          notification.open({
            message: 'Thông báo',
            description: status,
          })
          return;
        }

        notification["error"]({
          message: 'Thông báo',
          description: "Loi ket noi",
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
              message: 'Thông báo',
              description: item?.message,
            })
          )
        }

        const _data = get(dataReturn, 'createSinhVien.data', {});

        const status = get(dataReturn, 'createSinhVien.status', {})
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
      sinhVienId: data.sinhVienId,
      maSinhVien: data.maSinhVien,
      name: data.name,
      maHoSo: data.maHoSo,
      image: data.image,
      hoTenDem: data.hoTenDem,
      ten: data.ten,
      gioiTinh: data.gioiTinh,
      soDienThoai: data.soDienThoai,
      diaChi: data.diaChi,
      noiSinh: data.noiSinh,
      hoKhauThuongTru: data.hoKhauThuongTru,
      danToc: data.danToc,
      email: data.email,
    })
    setngaySinh(data.ngaySinh);
    setngayVaoDang(data.ngayVaoDang);
    setngayVaoDoan(data.ngayVaoDoan);
    setngayVaoTruong(data.ngayVaoTruong);
    setbacDaoTao(data.bacDaoTao);
    setloaiHinhDaoTao(data.loaiHinhDaoTao);
    settrangThai(data.trangThai);
    settonGiao(data.tonGiao);
  }, [data]);

  const bacDaoTao = [
    { value: 'CAO_DANG', label: 'CAO_DANG' },
    { value: 'DAI_HOC', label: 'DAI_HOC' },
  ]
  const trangThai = [
    { value: 'DANG_HOC', label: 'DANG_HOC' },
    { value: 'RA_TRUONG', label: 'RA_TRUONG' },
    { value: 'BAO_LUU', label: 'BAO_LUU' },
  ]
  const loaiHinhDaoTao = [
    { value: 'TIEN_TIEN', label: 'TIEN_TIEN' },
    { value: 'DAI_TRA', label: 'DAI_TRA' },
  ]
  const tonGiao = [
    { value: 'PHAT_GIAO', label: 'PHAT_GIAO' },
    { value: 'KHONG', label: 'KHONG' },
  ]
  function handleChange(type, value) {
    if (type === 'BacDaoTao') {
      setbacDaoTao(value);
    }
    if (type === 'tonGiao') {
      settonGiao(value);
    }
    if (type === 'loaiHinhDaoTao') {
      setloaiHinhDaoTao(value);
    }
    if (type === 'trangThai') {
      settrangThai(value);
    }
  }

  const handleChangeNgay = (type, date, dateString) => {
    if (type === 'ngaySinh') {
      setngaySinh(dateString);
    }
    if (type === 'ngayVaoTruong') {
      setngayVaoTruong(dateString);
    }
    if (type === 'ngayVaoDang') {
      setngayVaoDang(dateString);
    }
    if (type === 'ngayVaoDoan') {
      setngayVaoDoan(dateString);
    }
  }
  const renderForm = () => {
    return (
      <Form {...layout}
        onFinish={type === 'add' ? handleAddSinhVien : handleUpdateSinhVien}
        form={form}
        name="nest-messages"
      >
        <Form.Item
          name={"sinhVienId"}
          label="sinhVienId"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={"maSinhVien"}
          label="MSSV"
          rules={[{ required: true, message: 'Yêu cầu nhập mã sinh viên!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"maHoSo"}
          label="Mã hồ sơ"
          rules={[{ required: true, message: 'Yêu cầu nhập mã hồ sơ!' }]}
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
          rules={[{ required: true, message: 'Yêu cầu nhập họ tên đệm!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"ten"}
          label="Tên"
          rules={[{ required: true, message: 'Yêu cầu nhập tên sinh viên!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="ngaySinh" label="Ngày sinh">
          <DatePicker
            onChange={(date, dateString) => handleChangeNgay('ngaySinh', date, dateString)}
            value={type === 'add' ? null : moment(ngaySinh, 'DD-MM-YYYY')}
            placeholder='Ngày sinh' />
        </Form.Item>


        <Form.Item label="Bậc đào tạo">
          <Select
            options={bacDaoTao}
            style={{ width: 290 }}
            value={bacDaoTao1}
            placeholder='Bậc đào tạo'
            onChange={(value) => handleChange('BacDaoTao', value)} />
        </Form.Item>

        <Form.Item label="Trạng thái">
          <Select
            options={trangThai}
            style={{ width: 290 }}
            value={trangThai1}
            placeholder='Trạng thái'
            onChange={(value) => handleChange('trangThai', value)} />
        </Form.Item>
        <Form.Item label="Loại hình đào tạo">
          <Select
            options={loaiHinhDaoTao}
            style={{ width: 290 }}
            value={loaiHinhDaoTao1}
            placeholder='Loại hình đào tạo'
            onChange={(value) => handleChange('loaiHinhDaoTao', value)} />
        </Form.Item>

        <Form.Item name="ngayVaoTruong" label="Ngày vào trường">
          <DatePicker
            onChange={(date, dateString) => handleChangeNgay('ngayVaoTruong', date, dateString)}
            value={type === 'add' ? null : ngayVaoTruong}
            placeholder='Ngày vào trường' />
        </Form.Item>
        <Form.Item name="ngayVaoDoan" label="Ngày vào đoàn" >
          <DatePicker
            onChange={(date, dateString) => handleChangeNgay('ngayVaoDoan', date, dateString)}
            value={type === 'add' ? null : moment(ngayVaoDoan, 'DD-MM-YYYY')}
            placeholder='Ngày vào đoàn' />
        </Form.Item>
        <Form.Item name="ngayVaoDang" label="Ngày vào Đảng" >
          <DatePicker
            onChange={(date, dateString) => handleChangeNgay('ngayVaoDang', date, dateString)}
            value={type === 'add' ? null : moment(ngayVaoDang, 'DD-MM-YYYY')}
            placeholder='Ngày vào Đảng' />
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

        >
          <Input defaultValue={"KINH"} />
        </Form.Item>

        <Form.Item
          name={"email"}
          label="Email"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Tôn giáo">
          <Select
            options={tonGiao}
            style={{ width: 290 }}
            value={tonGiao1}
            placeholder='Tôn giáo'
            onChange={(value) => handleChange("tonGiao", value)} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {type === 'add' ? "Thêm" : "Sửa"}
          </Button>
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
            ngaySinh: ngaySinh,
            bacDaoTao: bacDaoTao1,
            trangThai: trangThai1,
            loaiHinhDaoTao: loaiHinhDaoTao1,
            ngayVaoTruong: ngayVaoTruong,
            ngayVaoDoan: ngayVaoDoan,
            soDienThoai: _dataForm?.soDienThoai,
            diaChi: _dataForm?.diaChi,
            noiSinh: _dataForm?.noiSinh,
            hoKhauThuongTru: _dataForm?.hoKhauThuongTru,
            danToc: _dataForm?.danToc,
            ngayVaoDang: ngayVaoDang,
            email: _dataForm?.email,
            tonGiao: tonGiao1
          }
        }
      }
    })
  }
  const handleUpdateSinhVien = () => {
    const _dataForm = form.getFieldsValue(true);
    actUpdateSinhVien({
      variables: {
        inputs: {
          maHoSo: _dataForm?.maHoSo,
          hoTenDem: _dataForm?.hoTenDem,
          ten: _dataForm?.ten,
          ngaySinh: ngaySinh,
          bacDaoTao: bacDaoTao1,
          trangThai: trangThai1,
          loaiHinhDaoTao: loaiHinhDaoTao1,
          ngayVaoTruong: ngayVaoTruong,
          ngayVaoDoan: ngayVaoDoan,
          soDienThoai: _dataForm?.soDienThoai,
          diaChi: _dataForm?.diaChi,
          noiSinh: _dataForm?.noiSinh,
          hoKhauThuongTru: _dataForm?.hoKhauThuongTru,
          danToc: _dataForm?.danToc,
          ngayVaoDang: ngayVaoDang,
          email: _dataForm?.email,
          tonGiao: tonGiao1
        },
        maSinhVien: _dataForm?.maSinhVien
      }
    })
  }

  return (
    <Modal
      title={type === 'add' ? 'Thêm sinh viên' : 'Sửa sinh viên'}
      centered
      visible={visible}
      footer={null}
      onCancel={() => closeModal(false)}
      width={1000}
      onCreateComplete={loadingSinhVien || lodingUpdateSinhVien}
    >
      {renderForm()}
    </Modal>
  );
};

export default ModalStudent;
