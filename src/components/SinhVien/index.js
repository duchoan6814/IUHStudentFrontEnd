import React, { useState } from "react";
import { Table, Button, Select, Modal } from "antd";

import ModalAddSinhVien from "./FormAddStudent";
import "./SinhVien.scss";

const columns = [
  {
    title: "ID",
    width: 50,

    dataIndex: "id",
    key: "id",
    fixed: "left",
  },
  {
    title: "MSSV",
    width: 100,
    dataIndex: "mssv",
    key: "mssv",
    fixed: "left",
  },
  {
    title: "Họ tên",
    width: 250,

    dataIndex: "name",
    key: "name",
    fixed: "left",
  },

  {
    title: "Số điện thoại",
    dataIndex: "sdt",
    key: "sdt",
    width: 150,
  },
  {
    title: "CMND",
    dataIndex: "cmnd",
    key: "cmnd",

    width: 150,
  },
  {
    title: "Khoa",
    dataIndex: "khoa",
    key: "khoa",

    width: 200,
  },
  {
    title: "Chuyên ngành",
    dataIndex: "chuyenNganh",
    key: "chuyenNganh",

    width: 230,
  },
  {
    title: "Bậc đào tạo",
    dataIndex: "bacDaoTao",
    key: "bacDaoTao",

    width: 150,
  },
  {
    title: "Khóa học",
    dataIndex: "khoaHoc",
    key: "khoahoc",
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",

    width: 200,
  },
  {
    title: "Mã hồ sơ",
    dataIndex: "mahs",
    key: "mahs",

    width: 100,
  },
  {
    title: "Ngày sinh",
    dataIndex: "ngaySinh",
    key: "ngaySinh",

    width: 100,
  },
  {
    title: "Ngày vào trường",
    dataIndex: "ngayVaoTruong",
    key: "ngayVaoTruong",

    width: 150,
  },
  {
    title: "Ngày vào đoàn",
    dataIndex: "ngayVaoDoan",
    key: "ngayVaoDoan",

    width: 150,
  },
  {
    title: "Ngày vào Đảng",
    dataIndex: "ngayVaoDang",
    key: "ngayVaoDang",

    width: 150,
  },
  {
    title: "Mã khu vực",
    dataIndex: "maKhuVuc",
    key: "maKhuVuc",

    width: 120,
  },
  {
    title: "Địa chỉ liên hệ",
    dataIndex: "diaChilh",
    key: "diaChilh",

    width: 500,
  },
  {
    title: "Hộ khẩu thường trú",
    dataIndex: "hoKhau",
    key: "hoKhau",

    width: 500,
  },
  {
    title: "Trạng thái học tập",
    dataIndex: "trangThaiHocTap",
    key: "trangThaiHocTap",

    width: 150,
  },
  {
    title: "Loại hình đào tạo",
    dataIndex: "loaiHinhDaoTao",
    key: "loaiHinhDaoTao",

    width: 150,
  },
  {
    title: "Dân tộc",
    dataIndex: "danToc",
    key: "danToc",

    width: 150,
  },
  {
    title: "Tôn giáo",
    dataIndex: "tonGiao",
    key: "tonGiao",

    width: 150,
  },
  {
    title: "Đói tượng",
    dataIndex: "doiTuong",
    key: "doiTuong",

    width: 150,
  },
  {
    title: "Thao tác",
    key: "operation",
    fixed: "right",
    width: 200,
    render: () => (
      <div>
        <Button danger>Chỉnh sửa</Button> <Button>Xóa</Button>
      </div>
    ),
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    id: `${i}`,
    name: `Nguyễn Hoàng Anh Nhân ${i}`,
    mssv: 18050711,
    address: `London Park no. ${i}`,
    sdt: `023191233${i}`,
    cmnd: `2138631${i}`,
    khoa: `Khoa Công nghệ thông tin`,
    chuyenNganh: `Kỹ thuật phần mềm`,
    bacDaoTao: `Đại học`,
    khoaHoc: `2018-2022`,
    email: `email`,
    mahs: `${i}`,
    ngaySinh: `1/2/2000`,
    ngayVaoTruong: `1/2/2017`,
    ngayVaoDoan: `1/2/2017`,
    ngayVaoDang: `1/2/2020`,
    maKhuVuc: 1,
    diaChilh: `11 Phan Huy Ích,p7,Quân Bình Thạnh,Tp.Hồ Chí Minh, Việt Nam`,
    hoKhau: `11 Phan Huy Ích,p7,Quân Bình Thạnh,Tp.Hồ Chí Minh, Việt Nam`,
    trangThaiHocTap: `Đang học`,
    loaiHinhDaoTao: `Tiên tiến`,
    danToc: `Kinh`,
    tonGiao: `Phật`,
    doiTuong: `Không`,
  });
}

const { Option } = Select;
const khoaData = ["CNTT", "Công nghệ may", "Kinh doanh quốc tế"];

const SinhVienComponent = () => {
  React.useState(khoaData[0]);

  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <div className="sinhvien">
      <h1>DANH SÁCH SINH VIÊN</h1>
      <div className="combox-sv">
        <span>Khoa</span>
        <Select
          className="ant-select-selector"
          defaultValue={khoaData[0]}
          style={{ width: 300 }}
        >
          {khoaData.map((khoaData) => (
            <Option key={khoaData}>{khoaData}</Option>
          ))}
        </Select>
      </div>
      <Button
        onClick={() => setVisibleModal(true)}
        className="ant-btn-primary"
        type="primary"
      >
        + Thêm sinh viên
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 1500, y: "50vh" }}
      />

      <ModalAddSinhVien
        type="sfsdfads"
        visible={visibleModal}
        closeModal={setVisibleModal}
      />

    </div>
  );
};

export default SinhVienComponent;
