import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from 'antd';
import './Khoa.scss'
import ModalAddKhoa from './FormAddKhoa'
import { useQuery, useMutation } from "@apollo/client";
import queries from "core/graphql";
import { getKhoafragment } from "./fragment";
import { get, isEmpty } from "lodash";

const getKhoasQuery = queries.query.getKhoas(getKhoafragment);
const deleteKhoaMutation = queries.mutation.deleteKhoa();

const KhoaComponent = () => {



  const [visibleModal1, setVisibleModal1] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [data,setDataKhoa]= useState([]);
  const [khoa,setKhoa]=useState({});

  const { data: dataGetKhoas, loading: loadingGetKhoas } = useQuery(getKhoasQuery);
  const [actDeleteKhoa, {data: dataDeleteKhoa, loading: loadingDeleteKhoa}] = useMutation(deleteKhoaMutation);

  const columns = [
    {
      title: 'Mã khoa',
      dataIndex: 'khoaVienId',
      key: 'khoaVienId',
      width: 100,
    },
    {
      title: 'Tên khoa viện',
      dataIndex: 'tenKhoaVien',
      key: 'tenKhoaVien',
      width: 400,
    },
    {
      title: 'Liên kết',
      dataIndex: 'lienKet',
      key: 'lienKet',
      width: 300,
    },
    {
      title: 'Thao tác',
      key: 'thaoTac',
      width: 300,
      render: (e) => (
        <div>
          <Button danger onClick={() => handlerEditButton(e)}>
            Chỉnh sửa
          </Button>
          <Button onClick={() => handleButtonDelete(e)} style={{ marginLeft: 10 }}>Xóa</Button>
        </div>
      ),
    },
  ];


  const handleButtonDelete = async (khoa) => {
    console.log('khoa', khoa);
    const _dataReutrn  = await actDeleteKhoa({
      variables: {
        khoaID: khoa?.khoaVienId
      }
    });

    const dataReturn = get(_dataReutrn, "data", {});

    const errors = get(dataReturn, 'deleteKhoa.errors', []);
          if(!isEmpty(errors)) {
            errors?.map(item => console.log(item.message));
            return;
          }

          const status = get(dataReturn, 'deleteKhoa.status', "");
          if (status === "OK") {
            const _index = data?.findIndex(item => item?.khoaVienId === khoa?.khoaVienId)

            let _listKhoa = data;
            _listKhoa = [
              ..._listKhoa.slice(0, _index),
              ..._listKhoa.slice(_index + 1)
            ];

            setDataKhoa(_listKhoa);

            return;
          }

          console.log("Loi ket noi");
  }

  const handlerEditButton = (e) => {
    setKhoa(e);
    setVisibleModal1(true);
  };

  const handleCrateKhoaComplete = (e) => {
    setVisibleModal(false);
    let _data = data;
    _data = [e, ..._data];
    setDataKhoa(_data);
  }

  const handleUpdateKhoaComplete = (e) => {
    setVisibleModal1(false);

    const _index = data?.findIndex(item => item?.khoaVienId === e?.khoaVienId);

    let _data = data;
    _data = [
      ...data?.slice(0, _index),
      {
        ..._data?.[_index],
        ...e
      },
      ...data?.slice(_index + 1)
    ];

    setDataKhoa(_data);
  }

  useEffect(() => {
   const _listKhoa = dataGetKhoas?.getKhoas?.data;
   setDataKhoa(_listKhoa);
  }, [dataGetKhoas]);
  console.log(data);
  return (
    <div className='khoa'>
      <h1>DANH SÁCH KHOA</h1>
      <Button className='ant-btn-primary' type="primary" onClick={() => setVisibleModal(true)}>+ Thêm khoa</Button>
      <Table className='ant-table-wrapper' columns={columns} dataSource={data} />
      <ModalAddKhoa
        type="add"
        visible={visibleModal}
        closeModal={setVisibleModal}
        onCreateComplete={(e) =>handleCrateKhoaComplete(e)}
      />
      <ModalAddKhoa
        type="sua"
        visible={visibleModal1}
        closeModal={setVisibleModal1}
        data={
          khoa
        }
        onCreateComplete={(e) =>handleUpdateKhoaComplete(e)}
      />
    </div>
  );
};

export default KhoaComponent;
