import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from 'antd';
import './Khoa.scss'
import ModalAddKhoa from './FormAddKhoa'
import { useQuery } from "@apollo/client";
import queries from "core/graphql";
import { getKhoafragment } from "./fragment";
const getKhoasQuery = queries.query.getKhoas(getKhoafragment);
const KhoaComponent = () => {

  const { data: dataGetKhoas, loading: loadingGetKhoas } = useQuery(getKhoasQuery);

  const [visibleModal1, setVisibleModal1] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [data,setDataKhoa]= useState([]);
  const [khoa,setKhoa]=useState({});
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
          <Button style={{ marginLeft: 10 }}>Xóa</Button>
        </div>
      ),
    },
  ];
  
  const handlerEditButton = (e) => {
    setKhoa(e);
    setVisibleModal1(true);
  };

  useEffect(() => {
   const _listKhoa = dataGetKhoas?.getKhoas?.data;
   setDataKhoa(_listKhoa);
  }, [dataGetKhoas]);

  return (
    <div className='khoa'>
      <h1>DANH SÁCH KHOA</h1>
      <Button className='ant-btn-primary' type="primary" onClick={() => setVisibleModal(true)}>+ Thêm khoa</Button>
      <Table className='ant-table-wrapper' columns={columns} dataSource={data} />
      <ModalAddKhoa
        type="add"
        visible={visibleModal}
        closeModal={setVisibleModal}
      />
      <ModalAddKhoa
        type="sua"
        visible={visibleModal1}
        closeModal={setVisibleModal1}
        data={
          khoa
        }
      />
    </div>
  );
};

export default KhoaComponent;
