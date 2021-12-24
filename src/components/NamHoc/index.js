import React, { useContext, useState, useEffect, useRef } from 'react';
import { Button, notification, Table, Input, Popconfirm, Form } from 'antd';
import './index.scss'
import ModalHocKy from './FormAddNamHoc';
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
    const [count, setCount] = useState(2)
    const { data: dataGetHocKys, loading: loadingGetHocKy } = useQuery(getHocKysQuery);
    const [actDeteleHoKy, { data: dataDeleteHocKy, loading: loadingDeleteHocKy }] = useMutation(deteleHocKyMutation);
    const columns = [
        {
            title: 'Mã năm học',
            dataIndex: 'nam_hoc_id',
            key: 'nam_hoc_id',
            width: 200,
        },
        {
            title: 'Ngày bắt đầu ',
            dataIndex: 'namBatDau',
            key: 'namBatDau',
            width: 400,
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'namKetThuc',
            key: 'namKetThuc',
            width: 400,
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

    const data = [
        {
            key: 1,
            nam_hoc_id: 'John Brown',
            namBatDau: 32,
            namKetThuc: 'New York No. 1 Lake Park',
            description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        },
        {
            key: 2,
            nam_hoc_id: 'John Brown',
            namBatDau: 32,
            namKetThuc: 'New York No. 1 Lake Park',
            description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        },
        {
            key: 3,
            name: 'Not Expandable',
            age: 29,
            address: 'Jiangsu No. 1 Lake Park',
            description: 'This not expandable',
        },
        {
            key: 4,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
        },
    ];
    useEffect(() => {
        const _listHocKy = dataGetHocKys?.getHocKys?.data;
        setDataHocKy(_listHocKy);
    }, [dataGetHocKys])
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
        <h1>DANH SÁCH NĂM HỌC</h1>
        <Button className='ant-btn-primary' type="primary" onClick={() => setVisibleModal(true)}>+ Thêm năm học</Button>

        <Table
            columns={columns}
            // expandable={{
            //     expandedRowRender: record => <Table
            //         // components={components}
            //         rowClassName={() => 'editable-row'}
            //         bordered
            //     // dataSource={dataSource}
            //     // columns={columnsTableChild}
            //     />,
            //     rowExpandable: record => record.name !== 'Not Expandable',
            // }}
            dataSource={data}
            scroll={{ x: 1500, y: "50vh" }}
        />
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                rowExpandable: record => record.name !== 'Not Expandable',
            }}
            dataSource={data}
            scroll={{ x: 1500, y: "50vh" }}
        />
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