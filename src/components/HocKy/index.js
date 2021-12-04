import React, { useEffect, useState } from 'react';
import { Button, notification, Table } from 'antd';
import './index.scss'
import ModalHocKy from './FormAddHocKy';
import queries from 'core/graphql';
import { getHocKysFragment } from './fragment';
import { useMutation, useQuery } from '@apollo/client';
import { get, isEmpty } from 'lodash';

const getHocKysQuery = queries.query.getHocKys(getHocKysFragment);
const deteleHocKyMutation = queries.mutation.deleteHocKy();
const HocKy = () => {
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalSua, setVisibleModalSua] = useState(false);
    const [hocKy, setHocKy] = useState({});
    const [dataHocKy, setDataHocKy] = useState([]);
    const { data: dataGetHocKys, loading: loadingGetHocKy } = useQuery(getHocKysQuery);
    const [actDeteleHoKy, { data: dataDeleteHocKy, loading: loadingDeleteHocKy }] = useMutation(deteleHocKyMutation);
    const columns = [
        {
            title: 'Mã học kỳ',
            dataIndex: 'hocKyId',
            key: 'hocKyId',
            width: 200,
        },
        {
            title: 'Năm học bắt đầu',
            dataIndex: 'namBatDau',
            key: 'namBatDau',
            width: 400,
        },
        {
            title: 'Năm học kết thúc',
            dataIndex: 'namKetThuc',
            key: 'namKetThuc',
            width: 400,
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
            fixed: "right",
            render: (e) => (<div>
                <Button danger onClick={() => handlerEditButton(e)}>Chỉnh sửa</Button>
                <Button onClick={() => handlerDeteleButton(e)}>Xóa</Button>
            </div>),
        },
    ];
    useEffect(() => {
        const _listHocKy = dataGetHocKys?.getHocKys?.data;
        setDataHocKy(_listHocKy);
    }, [dataGetHocKys])
    // const onDeleteComplete = (_data) => {
    //     const _index = dataHocKy?.findIndex(item => item?.hocKyId === _data?.hocKyId);
    //     let _list = dataHocKy;
    //     _list = [
    //         ..._list.slice(0, _index),
    //         ..._list.slice(_index + 1),
    //     ]
    //     console.log("list", _list);
    //     setDataHocKy(_list);
    // }
    const handlerDeteleButton = async (e) => {
        const _dataReutrn = await actDeteleHoKy({
            variables: {
                hocKyId: e?.hocKyId,
            }
        })
        const dataReturn = get(_dataReutrn, "data", {});
        const errors = get(_dataReutrn, "deleteHocKy.errors", []);
        if (!isEmpty(errors)) {
            errors?.map(item => console.log(item.message));
            return;
        }
        const status = get(dataReturn, 'deleteHocKy.status', "");
        if (status === "OK") {
            const _index = dataHocKy?.findIndex(item => item?.hocKyId === e?.hocKyId)

            let _listHocKy = dataHocKy;
            _listHocKy = [
                ..._listHocKy.slice(0, _index),
                ..._listHocKy.slice(_index + 1)
            ];

            setDataHocKy(_listHocKy);

            return;
        }
    }
    const handlerEditButton = (hocKy) => {
        setHocKy(hocKy);
        setVisibleModalSua(true);
    }
    const handlerCreateButton = (e) => {
        setVisibleModal(false);
        let _list = dataHocKy;
        _list = [e, ..._list];
        setDataHocKy(_list);
    }
    const handlerUpdateButton = (e) => {
        setVisibleModalSua(false);
        let _list = dataHocKy;
        const _index = dataHocKy.findIndex(item => item?.hocKyId === e?.hocKyId);
        _list = [
            ..._list.slice(0, _index),
            { ..._list?.[_index], ...e },
            ..._list.slice(_index + 1),
        ];
        setDataHocKy(_list);
    }
    return (<div className='hocKy'>
        <h1>DANH SÁCH HỌC KỲ</h1>
        <Button className='ant-btn-primary' type="primary" onClick={() => setVisibleModal(true)}>+ Thêm học kỳ</Button>
        <Table className='ant-table-wrapper' columns={columns} dataSource={dataHocKy} scroll={{ x: 1500, y: "50vh" }} />
        <ModalHocKy
            type="add"
            visible={visibleModal}
            closeModal={setVisibleModal}
            onCreateComplete={(e) => handlerCreateButton(e)}
        />
        <ModalHocKy
            type="sua"
            visible={visibleModalSua}
            closeModal={setVisibleModalSua}
            data={
                hocKy
            }
            onCreateComplete={(e) => handlerUpdateButton(e)}
        />
    </div>);
}
export default HocKy;