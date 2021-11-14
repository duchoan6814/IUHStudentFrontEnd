import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import './index.scss'
import ModalHocKy from './FormAddHocKy';
import queries from 'core/graphql';
import { getHocKysFragment } from './fragment';
import { useQuery } from '@apollo/client';

const getHocKysQuery =queries.query.getHocKys(getHocKysFragment);
const HocKy = () => {
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalSua, setVisibleModalSua] = useState(false);
    const [hocKy, setHocKy] = useState({});
    const [dataHocKy,setDataHocKy]= useState([]);
    const {data: dataGetHocKys, loading: loadingGetHocKy}= useQuery(getHocKysQuery);

    const columns = [
        {
            title: 'Mã học kỳ',
            dataIndex: 'hocKyId',
            key: 'hocKyId',
            width: 200,
        },
        {
            title: 'Năm học bắt đầu',
            dataIndex: 'namBatDau',
            key: 'namBatDau',
            width: 400,
        },
        {
            title: 'Năm học kết thúc',
            dataIndex: 'namKetThuc',
            key: 'namKetThuc',
            width: 400,
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            key: 'moTa',
            width: 300,
        },

        {
            title: 'Thao tác',
            key: 'thaoTac',
            width: 300,
            render: (e) => (<div><Button danger onClick={() => handlerEditButton(e)}>Chỉnh sửa</Button> <Button>Xóa</Button></div>),
        },
    ];
    useEffect(() => {
       const _listHocKy = dataGetHocKys?.getHocKys?.data;
       setDataHocKy(_listHocKy);
    }, [dataGetHocKys])
    const handlerEditButton = (hocKy) => {
        setHocKy(hocKy);
        setVisibleModalSua(true);
    }
    return (<div className='hocKy'>
        <h1>DANH SÁCH HỌC KỲ</h1>
        <Button className='ant-btn-primary' type="primary" onClick={() => setVisibleModal(true)}>+ Thêm học kỳ</Button>
        <Table className='ant-table-wrapper' columns={columns} dataSource={dataHocKy} />
        <ModalHocKy
            type="add"
            visible={visibleModal}
            closeModal={setVisibleModal}
        />
        <ModalHocKy
            type="sua"
            visible={visibleModalSua}
            closeModal={setVisibleModalSua}
            data={
                hocKy
            }
        />
    </div>);
}
export default HocKy;