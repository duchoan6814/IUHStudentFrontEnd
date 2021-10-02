import React from "react";
import { Table, Select,Button } from 'antd';
import './index.scss'
const columns = [
    
    {
      title: 'ID',
      width: 50,
      dataIndex: 'id',
      key: 'id',
  },
  {
      title: 'Mã học phần',
      dataIndex: 'maHocPhan',
      key: 'maHocPhan',
      width: 200,
  },
  {
      title: 'Tên viết tắt',
      dataIndex: 'tenVietTat',
      key: 'tenVietTat',
      width: 400,
  },
  {
      title: 'Tên lớp học phần',
      dataIndex: 'tenLopHocPhan',
      key: 'tenLopHocPhan',
      width: 300,
  },
  {
      title: 'Số nhóm thực hành',
      dataIndex: 'soNhomTH',
      key: 'soNhomTH',
      width: 300,
  },
  {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      width: 300,
  },
  {
      title: 'Số lượng đăng ký tối đa',
      dataIndex: 'soLuongDangKyToiDa',
      key: 'soLuongDangKyToiDa',
      width: 300,
  },
  {
      title: 'Số lượng đăng ký hiện tại',
      dataIndex: 'soLuongDangKyHienTai',
      key: 'soLuongDangKyHienTai',
      width: 300,
  },
  {
      title: 'ID học phần tương ứng',
      dataIndex: 'idLopHocPhanTuongUng',
      key: 'idLopHocPhanTuongUng',
      width: 300,
  },
  {
      title: 'Học kỳ',
      dataIndex: 'hocKy',
      key: 'hocKy',
      width: 300,
  },
  {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      width: 300,
  },
  {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: () => (
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
        id: `${i}`,
        maHocPhan: `400129343${i}`,
        tenVietTat: `DHKTPM14`,
        tenLopHocPhan: `----`,
        soNhomTH: 4,
        trangThai: `Đang mở`,
        soLuongDangKyToiDa: `90`,
        soLuongDangKyHienTai: `35`,
        idLopHocPhanTuongUng: `1231241`,
        hocKy:5,
        moTa: `không`,

    });

}
const { Option } = Select;
const khoaData = ["CNTT", "Công nghệ may", "Kinh doanh quốc tế"];

const LopHocPhan =()=>{
  React.useState(khoaData[0]);
    return  (
      <div className='hocLopPhan'>
          <h1>DANH SÁCH LỚP HỌC PHẦN</h1>
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
          <Button className='ant-btn-primary' type="primary">+ Thêm môn học</Button>
          <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
      </div>
  );
}
export default LopHocPhan;