import React, { useEffect, useState } from "react";
import { Table, Select, Button } from 'antd';
import './index.scss'
import ModalHocPhan from "./FormAddHocPhan";
import queries from "core/graphql";
import { hocPhanFragment } from "./fragment";
import { useMutation, useQuery } from "@apollo/client";
import { get, isEmpty } from "lodash";

const getHocPhanQuery = queries.query.getHocPhans(hocPhanFragment);
const deteleHocPhanMutation = queries.mutation.deleteHocPhan(hocPhanFragment);
const HocPhan = () => {

    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalSua, setVisibleModalSua] = useState(false);
    const [hocPhan, setHocPhan] = useState({});
    const [dataHocPhan, setDataHocPhan] = useState([]);

    const { data: dataGetHocPhan } = useQuery(getHocPhanQuery);
    const [actDeleteHocPhan, { data: dataDeleteHocPhan, loading: loadingDeleteHocPhan }] = useMutation(deteleHocPhanMutation);

    const columns = [
        {
            title: 'Học phần ID',
            width: 150,
            dataIndex: 'hocPhanId',
            key: 'hocPhanId',
        },
        {
            title: 'Mã học phần',
            dataIndex: 'maHocPhan',
            key: 'maHocPhan',
            width: 200,
        },
        {
            title: 'Số tín chỉ LT',
            dataIndex: 'soTinChiLyThuyet',
            key: 'soTinChiLyThuyet',
            width: 300,
        },
        {
            title: 'Số tín chỉ TH',
            dataIndex: 'getSoTinChiThucHanh',
            key: 'getSoTinChiThucHanh',
            width: 300,
        },
        {
            title: 'Học phần bắt buộc',
            dataIndex: 'batBuoc',
            key: 'batBuoc',
            width: 300,
            render: item => {
                return item ? "Bắt buộc" : "Không bắt buộc"
            }
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
            render: (e) => (
                <div>
                    <Button danger onClick={() => handlerEditButton(e)}>Chỉnh sửa</Button>
                    <Button onClick={() => handleButtonDelete(e)} style={{ marginLeft: 5 }}>Xóa</Button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        const _lisHocPhan = dataGetHocPhan?.getHocPhans?.data;
        setDataHocPhan(_lisHocPhan);
    }, [dataGetHocPhan])

    const handleCreateComplete = (e) => {
        setVisibleModal(false);
        let _data = dataHocPhan;
        _data = [e, ..._data];
        setDataHocPhan(_data);
    }
    const handleUpdateComplete = (e) => {
        setVisibleModalSua(false);

        const _index = dataHocPhan?.findIndex(item => item?.hocPhanId === e?.hocPhanId);

        let _data = dataHocPhan;
        _data = [
            ..._data?.slice(0, _index),
            {
                ..._data?.[_index],
                ...e
            },
            ..._data?.slice(_index + 1)
        ];

        setDataHocPhan(_data);
    }
    const handleButtonDelete = async (hp) => {

        const _dataReutrn = await actDeleteHocPhan({
            variables: {
                hocPhanId: hp?.hocPhanId
            }
        });

        const dataReturn = get(_dataReutrn, "data", {});

        const errors = get(dataReturn, 'deleteHocPhan.errors', []);
        if (!isEmpty(errors)) {
            errors?.map(item => console.log(item.message));
            return;
        }

        const status = get(dataReturn, 'deleteHocPhan.status', "");
        if (status === "OK") {
            const _index = dataHocPhan?.findIndex(item => item?.hocPhanId === hp?.hocPhanId)

            let _listHocPhan = dataHocPhan;
            _listHocPhan = [
                ..._listHocPhan.slice(0, _index),
                ..._listHocPhan.slice(_index + 1)
            ];

            setDataHocPhan(_listHocPhan);

            return;
        }

        console.log("Loi ket noi");
    }
    const { Option } = Select;
    const khoaData = ["CNTT", "Công nghệ may", "Kinh doanh quốc tế"];
    const handlerEditButton = (hocPhan) => {
        setHocPhan(hocPhan);
        setVisibleModalSua(true);
    };
    React.useState(khoaData[0]);
    return (
        <div className='hocPhan'>
            <h1>DANH SÁCH HỌC PHẦN</h1>
            {/* <div className="combox-sv">
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
            </div> */}
            <Button className='ant-btn-primary' type="primary" onClick={() => setVisibleModal(true)} >+ Thêm học phần</Button>
            <Table columns={columns} dataSource={dataHocPhan} scroll={{ x: 1500, y: "50vh" }} />
            <ModalHocPhan
                type="add"
                visible={visibleModal}
                closeModal={setVisibleModal}
                onCreateComplete={(e) => handleCreateComplete(e)}
            />
            <ModalHocPhan
                type="sua"
                visible={visibleModalSua}
                closeModal={setVisibleModalSua}
                onCreateComplete={(e) => handleUpdateComplete(e)}
                data={
                    hocPhan
                }
            />
        </div>
    );
}
export default HocPhan;