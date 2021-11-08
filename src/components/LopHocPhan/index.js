import React, { useState,useEffect } from "react";
import { Table, Select, Button } from 'antd';
import './index.scss'
import ModalAddLopHocPhan from "./FormAddLopHocPhan";
import getLopFragment from "./fragment";
import queries from "core/graphql";
import { useQuery } from "@apollo/client";
const getLopQuery = queries.query.getLops(getLopFragment);
const LopHocPhan = () => {

    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalSua, setVisibleModalSua] = useState(false);
    const [lopHocPhan, setLopHocPhan] = useState({});
    const[dataLop,setDataLop]=useState([]);

    const{data: dataGetLops, loading:LoadingGetLops}= useQuery(getLopQuery);

    const columns = [
        {
            title: 'Lớp ID',
            width: 50,
            dataIndex: 'lopId',
            key: 'lopId',
        },
        {
            title: 'Tên lớp',
            dataIndex: 'tenLop',
            key: 'tenLop',
            width: 200,
        },
        {
            title: 'Khóa học',
            dataIndex: 'khoaHoc',
            key: 'khoaHoc',
            width: 400,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 200,
            render: (e) => (
                <div>
                    <Button danger onClick={()=> handlerEditButton(e)}>Chỉnh sửa</Button> <Button style={{ marginLeft: 10 }}>Xóa</Button>
                </div>
            ),
        },
    ];
    useEffect(() => {
        const _listLop= dataGetLops?.getLops?.data;
        setDataLop(_listLop);
    }, [dataGetLops])
    
    const handlerEditButton = (lopHocPhan) => {
        setLopHocPhan(lopHocPhan);
        setVisibleModalSua(true);
    };
    const handleCreateLop =(e)=>{
        setVisibleModal(false);
        let _data = dataLop;
        _data = [e, ..._data];
        setDataLop(_data);
    }
    const { Option } = Select;
    const khoaData = ["CNTT", "Công nghệ may", "Kinh doanh quốc tế"];
    
    React.useState(khoaData[0]);
    return (
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
            <Button className='ant-btn-primary' type="primary" onClick={()=>setVisibleModal(true)}>+ Thêm lớp học phần</Button>
            <Table columns={columns} dataSource={dataLop} scroll={{ x: 1300 }} />
            <ModalAddLopHocPhan
                type="add"
                visible={visibleModal}
                closeModal={setVisibleModal}
                onCompleteAction={(e)=>handleCreateLop(e)}
            />
            <ModalAddLopHocPhan
                type="sua"
                visible={visibleModalSua}
                closeModal={setVisibleModalSua}
                data={
                   lopHocPhan
                }
            />
        </div>
    );
}
export default LopHocPhan;