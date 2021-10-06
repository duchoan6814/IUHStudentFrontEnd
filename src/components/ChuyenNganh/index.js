import React, { useState } from "react";
import { Table, Select, Button, Modal } from 'antd';
import './index.scss'
import ModalAddChuyenNganh from './FormAddChuyenNganh'

const ChuyenNganh = () => {
  const [visibleModal1, setVisibleModal1] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [chuyenNganh, setChuyenNganh] = useState({});
  const columns = [
    { title: 'Mã chuyên ngành', dataIndex: 'maChuyenNganh', key: 'maChuyenNganh' },
    { title: 'Tên chuyên ngành', dataIndex: 'tenChuyenNganh', key: 'tenChuyenNganh' },
    { title: 'Số tín chỉ', dataIndex: 'soTinChi', key: 'soTinChi' },
    { title: 'Khoa', dataIndex: 'khoa', key: 'khoa' },
    { title: 'Mô tả', dataIndex: 'moTa', key: 'moTa' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
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

  const data = [];
  for (let i = 0; i < 13; i++) {
    data.push({
      key: i,
      maChuyenNganh: `${i}`,
      tenChuyenNganh: `Kỹ thuật phần mềm`,
      soTinChi: `2`,
      khoa: `CNTT`,
      moTa: 'K14',

    });

  }

  const { Option } = Select;
  const khoaData = ["CNTT", "Công nghệ may", "Kinh doanh quốc tế"];
  React.useState(khoaData[0]);
  const handlerEditButton = (chuyenNganh) => {
    setChuyenNganh(chuyenNganh);
    setVisibleModal1(true);
  };
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
    <Button className='ant-btn-primary' type="primary" onClick={() => setVisibleModal(true)}>+ Thêm chuyên ngành</Button>
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>
      }}
      dataSource={data}
    />
    <ModalAddChuyenNganh
      type="add"
      visible={visibleModal}
      closeModal={setVisibleModal}
    />
    <ModalAddChuyenNganh
      type="sua"
      visible={visibleModal1}
      closeModal={setVisibleModal1}
      data={
        chuyenNganh
      }
    />
  </div>);

}
export default ChuyenNganh;