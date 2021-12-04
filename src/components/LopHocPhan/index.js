import React, { useState, useEffect } from "react";
import { Table, Select, Button } from 'antd';
import './index.scss'
import ModalAddLopHocPhan from "./FormAddLopHocPhan";
import getLopHocPhanFragment from "./fragment";
import queries from "core/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { get, isEmpty } from "lodash";

const getLopHocPhanQuery = queries.query.getLopHocPhans(getLopHocPhanFragment);
const deleteLopHocPhanMutaion = queries.mutation.deleteLopHocPhan();
const LopHocPhan = () => {

    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalSua, setVisibleModalSua] = useState(false);
    const [lopHocPhan, setLopHocPhan] = useState({});
    const [dataLop, setDataLop] = useState([]);

    const { data: dataGetLopHocPhans, loading: LoadingDataGetLopHocPhans } = useQuery(getLopHocPhanQuery);
    const [actDeleteLopHocPhan, { data: dataDeleteGetLopHocPhans, loading: loadingDeleteGetLopHocPhans }] = useMutation(deleteLopHocPhanMutaion);
    const columns = [
        {
            title: 'Lớp ID',
            width: 100,
            dataIndex: 'lopHocPhanId',
            key: 'lopId',
        },
        {
            title: 'Mã lớp học phần',
            dataIndex: 'maLopHocPhan',
            key: 'maLopHocPhan',
            width: 200,
        },
        {
            title: 'Tên viết tắt',
            dataIndex: 'tenVietTat',
            key: 'tenVietTat',
            width: 200,
        },
        {
            title: 'Tên lớp học phần',
            dataIndex: 'tenLopHocPhan',
            key: 'tenLopHocPhan',
            width: 200,
        },
        {
            title: 'Số nhóm thực hành',
            dataIndex: 'soNhomThucHanh',
            key: 'soNhomThucHanh',
            width: 200,
        },
        {
            title: 'trạng thái lớp học phần',
            dataIndex: 'trangThaiLopHocPhan',
            key: 'trangThaiLopHocPhan',
            width: 200,
        },
        {
            title: 'Sô lượng sinh viên',
            dataIndex: 'soLuongToiDa',
            key: 'soLuongToiDa',
            width: 200,
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            key: 'moTa',
            width: 200,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 200,
            render: (e) => (
                <div>
                    <Button danger onClick={() => handlerEditButton(e)}>Chỉnh sửa</Button>
                    <Button onClick={() => handleButtonDelete(e)} style={{ marginLeft: 10 }}>Xóa</Button>
                </div>
            ),
        },
    ];
    useEffect(() => {
        const _listLop = dataGetLopHocPhans?.getLopHocPhans?.data;
        setDataLop(_listLop);
    }, [dataGetLopHocPhans])

    const handlerEditButton = (lopHocPhan) => {
        setLopHocPhan(lopHocPhan);
        setVisibleModalSua(true);
    };
    const handleCreateLop = (e) => {
        setVisibleModal(false);
        let _data = dataLop;
        _data = [e, ..._data];
        setDataLop(_data);
    }
    const handleButtonDelete = async (lopHocPhan) => {

        const _dataReutrn = await actDeleteLopHocPhan({
            variables: {
                lopHocPhanId: lopHocPhan?.lopHocPhanId
            }
        });

        const dataReturn = get(_dataReutrn, "data", {});

        const errors = get(dataReturn, 'deleteLopHocPhan.errors', []);
        if (!isEmpty(errors)) {
            errors?.map(item => console.log(item.message));
            return;
        }

        const status = get(dataReturn, 'deleteLopHocPhan.status', "");
        if (status === "OK") {
            const _index = dataLop?.findIndex(item => item?.lopHocPhanId === lopHocPhan?.lopHocPhanId)

            let _listLopHocPhan = dataLop;
            _listLopHocPhan = [
                ..._listLopHocPhan.slice(0, _index),
                ..._listLopHocPhan.slice(_index + 1)
            ];

            setDataLop(_listLopHocPhan);

            return;
        }

        console.log("Loi ket noi");
    }
    const handlerUpdateLopHocPhan = (e) => {
        setVisibleModalSua(false);

        const _index = dataLop?.findIndex(item => item?.lopHocPhanId === e?.lopHocPhanId);

        let _data = dataLop;
        _data = [
            ..._data?.slice(0, _index),
            {
                ..._data?.[_index],
                ...e
            },
            ..._data?.slice(_index + 1)
        ];

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
            <Button className='ant-btn-primary' type="primary" onClick={() => setVisibleModal(true)}>+ Thêm lớp học phần</Button>
            <Table columns={columns} dataSource={dataLop} scroll={{ x: 1500, y: "50vh" }} />
            <ModalAddLopHocPhan
                type="add"
                visible={visibleModal}
                closeModal={setVisibleModal}
                onCompleteAction={(e) => handleCreateLop(e)}
            />
            <ModalAddLopHocPhan
                type="sua"
                visible={visibleModalSua}
                closeModal={setVisibleModalSua}
                data={
                    lopHocPhan
                }
                onCompleteAction={(e) => handlerUpdateLopHocPhan(e)}
            />
        </div>
    );
}
export default LopHocPhan;