import React, { useEffect, useState } from "react";
import { Button, Table } from 'antd';
import './MonHoc.scss';
import ModalMonHoc from './FormAddMonHoc';

import queries from 'core/graphql';
import { getMonHocFragment } from './fragment';
import { useMutation, useQuery } from "@apollo/client";
import { get,isEmpty } from "lodash";

const getMonHocsQuery = queries.query.getMonHocs(getMonHocFragment);
const deleteMonHocMutaion = queries.mutation.deleteMonHoc();
const MonHoc = () => {
    const [visible, setVisibleModal] = useState(false);
    const [visibleSua, setVisibleModalSua] = useState(false);
    const [monHoc, setMonHoc] = useState({});
    const [dataMonHoc, setDataMonHoc] = useState([]);

    const { data: dataGetMonHocs, loading: loadingGetMonHoc } = useQuery(getMonHocsQuery);
    const [actDeleteMonHoc, { data: dataDeleteMonHoc, loading: loadingDeleteMonHoc }] = useMutation(deleteMonHocMutaion);
    const columns = [
        {
            title: 'Mã môn học',
            dataIndex: 'monHocId',
            key: 'monHocId',
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
        // {
        //     title: 'Khoa',
        //     dataIndex: 'khoa',
        //     key: 'khoa',
        //     width: 400,
        // },
        {
            title: 'Thao tác',
            key: 'thaoTac',
            width: 300,
            render: (e) => (<div>
                <Button danger onClick={() => { handlerEditButton(e) }}>Chỉnh sửa</Button>
                <Button onClick={() => handleDeleteButton(e)}>Xóa</Button>
            </div>),
        },
    ];
    useEffect(() => {
        const _listMonHoc = dataGetMonHocs?.getMonHocs?.data;
        setDataMonHoc(_listMonHoc);
    }, [dataGetMonHocs]);
    const handleDeleteButton  = async (e) => {
        const _dataReutrn = await actDeleteMonHoc({
            variables: {
                monHocId: e?.monHocId,
            }
        })
        const dataReturn = get(_dataReutrn, "data", {});
        const errors = get(dataReturn, "deleteMonHoc.errors", []);
        if (!isEmpty(errors)) {
            errors?.map(item => console.log(item.message))
            return;
        }
        const status = get(dataReturn, 'deleteMonHoc.status', "");
        if (status === "OK") {
            const _index = dataMonHoc?.findIndex(item => item?.monHocId === e?.monHocId)
            let _listMonHoc = dataMonHoc;
            _listMonHoc = [
                ..._listMonHoc.slice(0, _index),
                ..._listMonHoc.slice(_index +1)
            ];
            console.log('_listMonHoc', _listMonHoc);
            setDataMonHoc(_listMonHoc);
            return;
        }
        console.log("Loi ket noi");
    }
    const handleCrateKhoaComplete = (e) => {
        setVisibleModal(false);
        let _data = dataMonHoc;
        _data = [e, ..._data];
        setDataMonHoc(_data);
    }
    const handleUpdateMonHocComplete = (e) => {
        setVisibleModalSua(false);

        const _index = dataMonHoc?.findIndex(item => item?.monHocId === e?.monHocId);

        let _data = dataMonHoc;
        _data = [
            ...dataMonHoc?.slice(0, _index),
            {
                ..._data?.[_index],
                ...e
            },
            ...dataMonHoc?.slice(_index + 1)
        ];

        setDataMonHoc(_data);
    }
    const handlerEditButton = (monHoc) => {
        setMonHoc(monHoc);
        setVisibleModalSua(true);
    }
    return (<div className='monHoc'>
        <h1>DANH SÁCH MÔN HỌC</h1>
        <Button className='ant-btn-primary' type="primary" onClick={() => { setVisibleModal(true) }}>+ Thêm môn học</Button>
        <Table className='ant-table-wrapper' columns={columns} dataSource={dataMonHoc} />
        <ModalMonHoc
            type="add"
            visible={visible}
            closeModal={setVisibleModal}
            onCreateComplete={(e) => handleCrateKhoaComplete(e)}
        />
        <ModalMonHoc
            type="sua"
            visible={visibleSua}
            closeModal={setVisibleModalSua}
            data={
                monHoc
            }
            onCreateComplete={(e) => handleUpdateMonHocComplete(e)}
        />
    </div>);
}
export default MonHoc;