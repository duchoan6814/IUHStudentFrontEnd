import React from "react";
import { Button, Table } from 'antd';
import './MonHoc.scss'
const columns = [
    {
        title: 'Mã môn học',
        dataIndex: 'maMonHoc',
        key: 'maMonHoc',
        width: 200,
    },
    {
        title: 'Tên môn học',
        dataIndex: 'tenMonHoc',
        key: 'tenMonHoc',
        width: 400,
    },
    
    {
        title: 'Mô tả',
        dataIndex: 'moTa',
        key: 'moTa',
        width: 300,
    },
    {
        title: 'Khoa',
        dataIndex: 'khoa',
        key: 'khoa',
        width: 400,
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
        maMonHoc: `${i}`,
        tenMonHoc: `Kinh doanh quốc tế`,
        moTa: 'New York No. 1 Lake Park',
        khoa:'CNTT',
    });
}

const MonHoc = () => {
    return (<div className='monHoc'>
        <h1>DANH SÁCH MÔN HỌC</h1>
        <Button className='ant-btn-primary' type="primary">+ Thêm môn học</Button>
        <Table className='ant-table-wrapper' columns={columns} dataSource={data} />
    </div>);
}
export default MonHoc;