import React, { useEffect, useState } from "react";
import { Table, Button, Select } from "antd";

import ModalAddSinhVien from "./FormAddStudent";
import "./SinhVien.scss";
import { useQuery } from "@apollo/client";

import { getSinhVienFragment } from "./fragment";
import queries from "core/graphql";
import { getKhoafragment } from "components/Khoa/fragment";

const getSinhVienQuery = queries.query.getSinhViens(getSinhVienFragment);
const getKhoaQuery = queries.query.getKhoas(getKhoafragment);

const SinhVienComponent = () => {

  const { data: dataGetSinhViens, loading: loadingGetSinhViens } = useQuery(getSinhVienQuery);
  const { data: dataGetKhoas} = useQuery(getKhoaQuery);

  const [visibleModal1, setVisibleModal1] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [sinhVien, setSinhVien] = useState({});
  const [data, setDataSinhVien] = useState([]);
  const [dataKhoa,setDataKhoa] = useState([]);
  const [currentKhoa, setCurrentKhoa] = useState({});

  const columns = [
    {
      title: "ID",
      width: 50,
      dataIndex: "sinhVienId",
      key: "sinhVienId",
      fixed: "left",
    },
    {
      title: "MSSV",
      width: 100,
      dataIndex: "maSinhVien",
      key: "maSinhVien",
      fixed: "left",
    },
    {
      title: "Họ tên đệm",
      width: 200,
      dataIndex: "hoTenDem",
      key: "hoTenDem",
      fixed: "left",
    },
    {
      title: "Tên",
      width: 80,
      dataIndex: "ten",
      key: "ten",
      fixed: "left",
    },
    {
      title: "Ngày sinh",
      width: 250,
      dataIndex: "ngaySinh",
      key: "ngaySinh",
    },
    {
      title: "Bậc đào tạo",
      width: 250,
      dataIndex: "bacDaoTao",
      key: "bacDaoTao",
    },
    {
      title: "Trạng thái",
      width: 250,
      dataIndex: "trangThai",
      key: "trangThai",
    },
    {
      title: "Loại hình đào tạo",
      width: 250,
      dataIndex: "loaiHinhDaoTao",
      key: "loaiHinhDaoTao",
    },
    {
      title: "Ngày vào trường",
      width: 250,
      dataIndex: "ngayVaoTruong",
      key: "ngayVaoTruong",
    },
    {
      title: "Ngày vào đoàn",
      width: 250,
      dataIndex: "ngayVaoDoan",
      key: "ngayVaoDoan",
    },
    {
      title: "Giới tính",
      width: 250,
      dataIndex: "gioiTinh",
      key: "gioiTinh",
    },
    {
      title: "Số điện thoại",
      width: 250,
      dataIndex: "soDienThoai",
      key: "soDienThoai",
    },
    {
      title: "Địa chỉ",
      width: 250,
      dataIndex: "diaChi",
      key: "diaChi",
    },
    {
      title: "Nơi sinh",
      width: 250,
      dataIndex: "noiSinh",
      key: "noiSinh",
    },
    {
      title: "Hộ khẩu thường trú",
      width: 250,
      dataIndex: "hoKhauThuongTru",
      key: "hoKhauThuongTru",
    },
    {
      title: "Dân tộc",
      width: 250,
      dataIndex: "danToc",
      key: "danToc",
    },
    {
      title: "Ngày vào đảng",
      width: 250,
      dataIndex: "ngayVaoDang",
      key: "ngayVaoDang",
    },
    {
      title: "Email",
      width: 250,
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tôn giáo",
      width: 250,
      dataIndex: "tonGiao",
      key: "tonGiao",
    },
    {
      title: "Thao tác",
      key: "operation",
      fixed: "right",
      width: 200,

      render: (e) => (
        <div>
          <Button danger onClick={() => handlerEditButton(e)}>
            Chỉnh sửa
          </Button>
          <Button style={{ marginLeft: 10 }}>Xóa</Button>
        </div>
      ),
    },
  ];

  const handlerEditButton = (sinhVien) => {
    setSinhVien(sinhVien);
    setVisibleModal1(true);
  };

  const handleChangeKhoa = (e) => {
    console.log('e', e);
    const _currentKhoa = dataKhoa?.find(item => item?.khoaVienId === e);
    setCurrentKhoa(_currentKhoa);
  }

  useEffect(() => {
    const _listSinhVien = dataGetSinhViens?.getSinhViens?.data;
    console.log(_listSinhVien);
    setDataSinhVien(_listSinhVien);

  }, [dataGetSinhViens])
  useEffect(()=>{
    const _listKhoa = dataGetKhoas?.getKhoas?.data;
    setDataKhoa(_listKhoa);
    setCurrentKhoa(_listKhoa?.[0])
  }, [dataGetKhoas?.getKhoas?.data])

  const handleCreateSinhVien = (e) => {
    setVisibleModal(false);
    let _data = data;
    _data = [e, ..._data];
    setDataSinhVien(_data);
  }
  const handleUpdateSinhVien = (e) => {
    setVisibleModal1(false);
    let _data = data;
    _data = [e, ..._data];
    setDataSinhVien(_data);
  }
  const { Option } = Select;
  // get list khoa
  
  return (
    <div className="sinhvien">
      <h1>DANH SÁCH SINH VIÊN</h1>
      <div className="combox-sv">
        <span>Khoa</span>
        <Select
          className="ant-select-selector"
          value={currentKhoa?.tenKhoaVien}
          style={{ width: 300 }}
          onChange={handleChangeKhoa}
        >
          {dataKhoa?.map((khoaData) => (
            <Option key={khoaData?.khoaVienId}>{khoaData?.tenKhoaVien}</Option>
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
        type="add"
        visible={visibleModal}
        closeModal={setVisibleModal}
        onCreateComplete={(e)=>{handleCreateSinhVien(e)}}
      />
      <ModalAddSinhVien
        type="sua"
        visible={visibleModal1}
        closeModal={setVisibleModal1}
        data={
          sinhVien
        }
        onCreateComplete={(e)=>{handleUpdateSinhVien(e)}}
      />
    </div>
  );
};

export default SinhVienComponent;
