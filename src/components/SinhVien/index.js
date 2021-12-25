import React, { useEffect, useState } from "react";
import { Table, Button, Select, notification } from "antd";
import * as XLSX from 'xlsx';
import ModalAddSinhVien from "./FormAddStudent";
import "./SinhVien.scss";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { get, isEmpty, reject } from "lodash";
import { getSinhVienFragment } from "./fragment";
import queries from "core/graphql";
import { getKhoafragment } from "components/Khoa/fragment";
import { getNamHocWithKhoaVienIdFragment } from "./fragment.NamVaoTruong";

const getSinhVienWithKhoaVienIdQuery = queries.query.getSinhVienWithKhoaVienId(getSinhVienFragment);
const getKhoaQuery = queries.query.getKhoas(getKhoafragment);
const getNamHocWithKhoaVienIdQuery = queries.query.getNamHocWithKhoaVienId(getNamHocWithKhoaVienIdFragment);
const getSinhVienWithKhoaVienIdAndNgayVaoTruongQuery = queries.query.getSinhVienWithKhoaVienIdAndNgayVaoTruong(getSinhVienFragment);
const deteleSinhVienMutation = queries.mutation.deleteSinhVien();
const SinhVienComponent = () => {


  const [visibleModal1, setVisibleModal1] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [sinhVien, setSinhVien] = useState({});
  const [data, setDataSinhVien] = useState([]);
  const [dataKhoa, setDataKhoa] = useState([]);
  const [currentKhoa, setCurrentKhoa] = useState([]);
  const [currentNamVaoTruong, setCurrentNamVaoTruong] = useState([]);
  const [dataNamVaoTruong, setDataNamVaoTruong] = useState([]);


  const createSinhVienMutation = queries.mutation.createSinhVien();
  const { data: dataGetSinhViens, loading: loadingGetSinhViens } = useQuery(getSinhVienWithKhoaVienIdQuery, {
    variables: {
      khoaVienId: currentKhoa?.khoaVienId,
    }
  });
  const { data: dataGetKhoas } = useQuery(getKhoaQuery);

  const { data: dataNamHoc, loading: loadingGetNamHoc } = useQuery(getNamHocWithKhoaVienIdQuery, {
    variables: {
      khoaVienId: currentKhoa?.khoaVienId,
    }
  });
  const [actGetSinhVienWithNam, { data: dataGetSinhViensWithNam, loading: loadingGetSinhViensWithNam }] = useLazyQuery(getSinhVienWithKhoaVienIdAndNgayVaoTruongQuery, {
    onCompleted: (data) => {
      const _listSinhVien = data?.getSinhVienWithKhoaVienIdAndNgayVaoTruong?.data || [];
      console.log(_listSinhVien);
      setDataSinhVien(_listSinhVien);
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
          handleCreateSinhVien(_data);

          notification.open({
            message: 'Thông báo',
            description: `Thêm 1 sinh viên`,
          })
          return;
        }

        notification["error"]({
          message: "Loi ket noi",
        })
      }
    });
  const [actDeteleSinhVien, { data: dataDeleteSinhVien, loading: loadingDeleteSinhVien }] = useMutation(deteleSinhVienMutation);
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
      width: 100,
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
      render: item => {
        return item ? "Nữ" : "Nam"
      }
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
          <Button
            onClick={() => handlerDeteleButton(e)}
            style={{ marginLeft: 10 }}>Xóa</Button>
        </div >
      ),
    },
  ];



  useEffect(() => {
    const _listSinhVien = dataGetSinhViens?.getSinhVienWithKhoaVienId?.data || [];
    setDataSinhVien(_listSinhVien);
  }, [dataGetSinhViens?.getSinhVienWithKhoaVienId?.data]);

  useEffect(() => {
    const _listKhoa = dataGetKhoas?.getKhoas?.data;
    setDataKhoa(_listKhoa);
    setCurrentKhoa(_listKhoa?.[3])
  }, [dataGetKhoas?.getKhoas?.data]);

  useEffect(() => {
    const _listNam = dataNamHoc?.getNamHocWithKhoaVienId?.data;
    setDataNamVaoTruong(_listNam);
  }, [dataNamHoc?.getNamHocWithKhoaVienId?.data]);


  const handlerEditButton = (sinhVien) => {
    setSinhVien(sinhVien);
    setVisibleModal1(true);
  };

  const handleChangeKhoa = (e) => {
    const _currentKhoa = dataKhoa?.find(item => item?.khoaVienId === e);
    setCurrentKhoa(_currentKhoa);
  }

  const handleCreateSinhVien = (e) => {
    setVisibleModal1(false);
    let _data = data || [];
    _data = [e, ..._data];
    setDataSinhVien(_data);
  }
  const handleUpdateSinhVien = (e) => {
    const _index = data?.findIndex(item => item?.sinhVienId === e?.sinhVienId) || [];
    setVisibleModal1(false);
    let _data = data;
    _data = [
      ...data?.slice(0, _index),
      {
        ..._data?.[_index],
        ...e
      },
      ...data?.slice(_index + 1)
    ];
    setDataSinhVien(_data);
  }
  const handlerDeteleButton = async (e) => {
    const _dataReutrn = await actDeteleSinhVien({
      variables: {
        sinhVienId: e?.sinhVienId,
      }
    })
    const dataReturn = get(_dataReutrn, "data", {});
    const message = get(_dataReutrn, "deleteSinhVien.message", {});
    const errors = get(_dataReutrn, "deleteSinhVien.errors", []);
    if (!isEmpty(errors)) {
      return errors.map(item =>
        notification["error"]({
          message: item?.message,
        })
      )
    }
    const status = get(dataReturn, 'deleteSinhVien.status', "");
    if (status === "OK") {
      const _index = data?.findIndex(item => item?.sinhVienId === e?.sinhVienId)

      let _listSinhVien = data || [];
      _listSinhVien = [
        ..._listSinhVien.slice(0, _index),
        ..._listSinhVien.slice(_index + 1)
      ];
      setDataSinhVien(_listSinhVien);
      notification.open({
        message: 'Thông báo',
        description: "Xóa sinh viên thành công",
      })
      return;
    }
  }
  const onClickNam = (value, option) => {
    actGetSinhVienWithNam({
      variables: {
        khoaVienId: currentKhoa?.khoaVienId,
        ngayVaoTruong: value,
      }
    })

  }
  const { Option } = Select;
  //  thêm bằng file
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: 'buffer' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      }
    });
    promise.then((d) => {
      d.map((_dataForm) => {
        actCreateSinhVien({
          variables: {
            inputs: {
              username: _dataForm?.username,
              password: "123456",
              sinhVien: {
                maSinhVien: _dataForm?.maSinhVien,
                maHoSo: _dataForm?.maHoSo,
                hoTenDem: _dataForm?.hoTenDem,
                ten: _dataForm?.ten,
                ngaySinh: _dataForm?.ngaySinh,
                bacDaoTao: _dataForm?.bacDaoTao,
                trangThai: _dataForm?.trangThai,
                loaiHinhDaoTao: _dataForm?.loaiHinhDaoTao,
                ngayVaoTruong: _dataForm?.ngayVaoTruong,
                ngayVaoDoan: _dataForm?.ngayVaoDoan,
                soDienThoai: _dataForm?.soDienThoai,
                diaChi: _dataForm?.diaChi,
                noiSinh: _dataForm?.noiSinh,
                hoKhauThuongTru: _dataForm?.hoKhauThuongTru,
                danToc: _dataForm?.danToc,
                ngayVaoDang: _dataForm?.ngayVaoDang,
                email: _dataForm?.email,
                tonGiao: _dataForm?.tonGiao
              }
            }
          }
        })
      })
    })
  }
  return (
    <div className="sinhvien">
      <h1>DANH SÁCH SINH VIÊN</h1>
      <div className="combox-sv">
        <span >Khoa</span>
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
      <div>
        <input type="file" onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }} />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 1500, y: "50vh" }}
      />

      <ModalAddSinhVien
        type="add"
        visible={visibleModal}
        closeModal={setVisibleModal}
        onCreateComplete={(e) => { handleCreateSinhVien(e) }}
      />
      <ModalAddSinhVien
        type="sua"
        visible={visibleModal1}
        closeModal={setVisibleModal1}
        data={
          sinhVien
        }
        onCreateComplete={(e) => { handleUpdateSinhVien(e) }}
      />
    </div>
  );
};

export default SinhVienComponent;
