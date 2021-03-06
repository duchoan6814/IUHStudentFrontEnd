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
              message: 'Th??ng b??o',
              description: item?.message,
            })
          )
        }

        const _data = get(dataReturn, 'createSinhVien.data', {});

        const status = get(dataReturn, 'createSinhVien.status', {})
        if (!isEmpty(_data)) {
          handleCreateSinhVien(_data);

          notification.open({
            message: 'Th??ng b??o',
            description: `Th??m 1 sinh vi??n`,
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
      title: "H??? t??n ?????m",
      width: 200,
      dataIndex: "hoTenDem",
      key: "hoTenDem",
      fixed: "left",
    },
    {
      title: "T??n",
      width: 100,
      dataIndex: "ten",
      key: "ten",
      fixed: "left",
    },
    {
      title: "Ng??y sinh",
      width: 250,
      dataIndex: "ngaySinh",
      key: "ngaySinh",
    },
    {
      title: "B???c ????o t???o",
      width: 250,
      dataIndex: "bacDaoTao",
      key: "bacDaoTao",
    },
    {
      title: "Tr???ng th??i",
      width: 250,
      dataIndex: "trangThai",
      key: "trangThai",
    },
    {
      title: "Lo???i h??nh ????o t???o",
      width: 250,
      dataIndex: "loaiHinhDaoTao",
      key: "loaiHinhDaoTao",
    },
    {
      title: "Ng??y v??o tr?????ng",
      width: 250,
      dataIndex: "ngayVaoTruong",
      key: "ngayVaoTruong",
    },
    {
      title: "Ng??y v??o ??o??n",
      width: 250,
      dataIndex: "ngayVaoDoan",
      key: "ngayVaoDoan",
    },
    {
      title: "Gi???i t??nh",
      width: 250,
      dataIndex: "gioiTinh",
      key: "gioiTinh",
      render: item => {
        return item ? "N???" : "Nam"
      }
    },
    {
      title: "S??? ??i???n tho???i",
      width: 250,
      dataIndex: "soDienThoai",
      key: "soDienThoai",
    },
    {
      title: "?????a ch???",
      width: 250,
      dataIndex: "diaChi",
      key: "diaChi",
    },
    {
      title: "N??i sinh",
      width: 250,
      dataIndex: "noiSinh",
      key: "noiSinh",
    },
    {
      title: "H??? kh???u th?????ng tr??",
      width: 250,
      dataIndex: "hoKhauThuongTru",
      key: "hoKhauThuongTru",
    },
    {
      title: "D??n t???c",
      width: 250,
      dataIndex: "danToc",
      key: "danToc",
    },
    {
      title: "Ng??y v??o ?????ng",
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
      title: "T??n gi??o",
      width: 250,
      dataIndex: "tonGiao",
      key: "tonGiao",
    },
    {
      title: "Thao t??c",
      key: "operation",
      fixed: "right",
      width: 200,

      render: (e) => (
        <div>
          <Button danger onClick={() => handlerEditButton(e)}>
            Ch???nh s???a
          </Button>
          <Button
            onClick={() => handlerDeteleButton(e)}
            style={{ marginLeft: 10 }}>X??a</Button>
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
        message: 'Th??ng b??o',
        description: "X??a sinh vi??n th??nh c??ng",
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
  //  th??m b???ng file
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
      <h1>DANH S??CH SINH VI??N</h1>
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
        + Th??m sinh vi??n
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
