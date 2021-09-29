import React from "react";
import { Button } from 'antd';
import './Khoa.scss'

import { Table } from 'antd';

const columns = [
  {
    title: 'Mã khoa',
    dataIndex: 'maKhoa',
    key: 'maKhoa',
    width:100,
  },
  {
    title: 'Tên khoa',
    dataIndex: 'tenKhoa',
    key: 'tenKhoa',
    width:400,
  },
  {
    title: 'Mô tả',
    dataIndex: 'moTa',
    key: 'moTa',
    width:300,
  },
  {
    title: 'Thao tác',
    key: 'thaoTac',
    width:300,
    render: () => (<div><Button danger>Chỉnh sửa</Button> <Button>Xóa</Button></div>),
  },
];
const data = [];
for (let i = 0; i < 30; i++) {
  data.push({
    key: '1',
    maKhoa: `${i}`,
    tenKhoa: `Kinh doanh quốc tế`,
    moTa: 'New York No. 1 Lake Park',
  });
}
const KhoaComponent = () => {
  return (
    <div className='khoa'>
      <h1>DANH SÁCH KHOA</h1>
      <Button className='ant-btn-primary' type="primary">+ Thêm khoa</Button>
      <Table className='ant-table-wrapper' columns={columns} dataSource={data} />
    </div>
  );
};

export default KhoaComponent;
