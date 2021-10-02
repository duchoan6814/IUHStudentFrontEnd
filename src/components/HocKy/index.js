import React from 'react';
import { Button, Table } from 'antd';
import './index.scss'
const columns = [
    {
        title: 'Mã học kỳ',
        dataIndex: 'maHocKy',
        key: 'maHocKy',
        width: 200,
    },
    {
        title: 'Năm học bắt đầu',
        dataIndex: 'namHocBatDau',
        key: 'namHocBatDau',
        width: 400,
    },
    {
        title: 'Năm học kết thúc',
        dataIndex: 'namHocKetThuc',
        key: 'namHocKetThuc',
        width: 400,
    },
    {
        title: 'Học kỳ',
        dataIndex: 'hocKy',
        key: 'hocKy',
        width: 200,
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
        render: () => (<div><Button danger>Chỉnh sửa</Button> <Button>Xóa</Button></div>),
    },
];
const data = [];
for (let i = 0; i < 30; i++) {
    data.push({
        key: '1',
        maHocKy: `${i}`,
        moTa: `K1${i}`,
        hocKy: 1,
        namHocBatDau:`2018`,
        namHocKetThuc:`2022`
    });
}
const HocKy = () => {
    return (<div className='hocKy'>
        <h1>DANH SÁCH HỌC KỲ</h1>
        <Button className='ant-btn-primary' type="primary">+ Thêm học kỳ</Button>
        <Table className='ant-table-wrapper' columns={columns} dataSource={data} />
    </div>);
}
export default HocKy;