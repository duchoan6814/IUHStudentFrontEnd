import React from 'react';
import { Table, Select,Button } from 'antd';
import './index.scss'

const columns = [
    { title: 'Mã năm học', dataIndex: 'maNamHoc', key: 'maNamHoc' },
    { title: 'Năm học bắt đầu', dataIndex: 'namHocBatDau', key: 'namHocBatDau' },
    { title: 'Năm học kết thúc', dataIndex: 'namHocKetThuc', key: 'addnamHocKetThucress' },
    { title: 'Học kỳ', dataIndex: 'hocKy', key: 'hocKy' },
    { title: 'Mô tả', dataIndex: 'moTa', key: 'moTa' },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render:() => (
            <div>
                <Button danger>Chỉnh sửa</Button> <Button>Xóa</Button>
            </div>
        ),
    },
];

const data = [];
for (let i = 0; i < 13; i++) {
    data.push({
        key: `i`,
        maNamHoc: `${i}`,
        namHocBatDau: `2018`,
        namHocKetThuc: `2022`,
        hocKy: `1`,
        moTa:'K14',

    });

}
const { Option } = Select;
const khoaData = ["CNTT", "Công nghệ may", "Kinh doanh quốc tế"];
const ChuyenNganh = () => {
    React.useState(khoaData[0]);

    return (<div className='chuyenNganh'>
        <h1>DANH SÁCH CHUYÊN NGÀNH</h1>
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
        <Button className='ant-btn-primary' type="primary">+ Thêm chuyên ngành</Button>
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>
            }}
            dataSource={data}
        />
    </div>);

}
export default ChuyenNganh;