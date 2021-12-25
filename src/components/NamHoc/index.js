import React, { useContext, useState, useEffect, useRef } from 'react';
import { Button, notification, Table, Input, Popconfirm, Form } from 'antd';
import './index.scss'
import ModalHocKy from './FormAddNamHoc';
import queries from 'core/graphql';
import { getHocKysFragment } from './fragment.HocKy';
import { useMutation, useQuery } from '@apollo/client';
import { get, isEmpty, slice } from 'lodash';
import { getNamHocFragment } from './fragment.NamHoc';



const getNamHocQuery = queries.query.getNamHoc(getNamHocFragment);
const getHocKysQuery = queries.query.getHocKys(getHocKysFragment);
const deteleNamHocMutation = queries.mutation.deleteNamHoc();
const createHocKyMutation = queries.mutation.createHocKy(getHocKysFragment);
const NamHoc = () => {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 24 },
    };
    const [form] = Form.useForm();

    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalSua, setVisibleModalSua] = useState(false);
    const [hocKy, setHocKy] = useState({});
    const [dataHocKy, setDataHocKy] = useState([]);
    const [inputText, setinputText] = useState(false);
    const [dataNamHoc, setDataNamHoc] = useState([]);


    const { data: dataGetHocKys, loading: loadingGetHocKy } = useQuery(getHocKysQuery);
    const { data: dataGetNamHoc, loading: loadingGetNamHoc } = useQuery(getNamHocQuery);
    const [actDeteleNamHoc, { data: dataDeleteNamHoc, loading: loadingDeleteNamHoc }] = useMutation(deteleNamHocMutation);
    const [actCreateHocKy, { data: dataCreateHocKy, loading: loadingCreateHocKy }] = useMutation(createHocKyMutation, {
        onCompleted: (dataReturn) => {

        }
    });
    const columns = [
        {
            title: 'Mã năm học',
            dataIndex: 'namHocId',
            key: 'namHocId',
            width: 200,
        },
        {
            title: 'Ngày bắt đầu ',
            dataIndex: 'startDate',
            key: 'startDate',
            width: 400,
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
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


    useEffect(() => {
        const _dataNamHoc = dataGetNamHoc?.getNamHoc?.data;
        setDataNamHoc(_dataNamHoc);

    }, [dataGetNamHoc])
    useEffect(() => {
        const _listHocKy = dataGetHocKys?.getHocKys?.data;
        setDataHocKy(_listHocKy);
    }, [dataGetHocKys])
    const handlerDeteleButton = async (e) => {
        const _dataReutrn = await actDeteleNamHoc({
            variables: {
                namHocId: e?.namHocId,
            }
        })
        const dataReturn = get(_dataReutrn, "data", {});
        const errors = get(_dataReutrn, "deleteNamHoc.errors", []);
        if (!isEmpty(errors)) {
            errors?.map(item => console.log(item.message));
            return;
        }
        const status = get(dataReturn, 'deleteNamHoc.status', "");
        if (status === "OK") {
            const _index = dataNamHoc?.findIndex(item => item?.namHocId === e?.namHocId)

            let _listNamHoc = dataNamHoc;
            _listNamHoc = [
                ..._listNamHoc.slice(0, _index),
                ..._listNamHoc.slice(_index + 1)
            ];

            setDataNamHoc(_listNamHoc);

            return;
        }
    }
    const handlerEditButton = (hocKy) => {
        setHocKy(hocKy);
        setVisibleModalSua(true);
    }
    const handlerCreateButtonNamHoc = (e) => {
        setVisibleModal(false);
        let _list = dataNamHoc;
        _list = [e, ..._list];
        setDataNamHoc(_list);
    }

    const handlerUpdateButton = (e) => {
        setVisibleModalSua(false);
        let _list = dataNamHoc;
        const _index = dataNamHoc?.findIndex(item => item?.namHocId === e?.namHocId);
        _list = [
            ..._list.slice(0, _index),
            { ..._list?.[_index], ...e },
            ..._list.slice(_index + 1),
        ];
        setDataNamHoc(_list);
    }
    const handlAdd = () => {
        setinputText(!inputText);
    }
    // console.log("nam hoc id", dataNamHoc.namHocId[1]);
    const handlAddHocKy = async (listHocKy, namHocId) => {
        console.log("namHocId", namHocId);
        const _dataForm = form.getFieldsValue(true);
        console.log("Số thứ tự", _dataForm?.moTa);
        const _dataReutrn = await actCreateHocKy({
            variables: {
                inputs: {
                    soThuTu: _dataForm?.soThuTu,
                    moTa: _dataForm?.moTa,
                    maNamHoc: namHocId,
                }
            }
        })
        const errors = get(_dataReutrn, 'createHocKy.errors', []);
        if (!isEmpty(errors)) {
            return errors.map(item =>
                notification["error"]({
                    message: item?.message,
                })
            )
        }

        const _data = get(_dataReutrn, 'data.createHocKy.data', {});

        const status = get(_dataReutrn, 'data.createHocKy.status', {})

        setinputText(!inputText);

        console.log(_data);

        if (!isEmpty(_data)) {

            let _list = listHocKy;
            _list = [_dataReutrn?.createHocKy?.data, ..._list];


            const _indexNamHoc = dataNamHoc?.findIndex(item => item?.namHocId === namHocId);

            let _dataNamHoc = dataNamHoc;

            _dataNamHoc = [..._dataNamHoc?.slice(0, _indexNamHoc), {
                ..._dataNamHoc?.[_indexNamHoc],
                hocKy: _list
            }, ..._dataNamHoc?.slice(_indexNamHoc + 1)]


            setDataNamHoc(_dataNamHoc);

            notification.open({
                message: 'Thông báo',
                description: status,
            })
            return;
        }


    }

    return (<div className='hocKy'>
        <h1>DANH SÁCH NĂM HỌC</h1>
        <Button className='ant-btn-primary' type="primary" onClick={() => setVisibleModal(true)}>+ Thêm năm học</Button>
        <Table
            className="components-table-demo-nested"
            columns={columns}
            expandable={{
                expandedRowRender: (dataNamHoc) => {
                    console.log("data", dataNamHoc);
                    const _hocKys = dataNamHoc?.hocKy;

                    return (
                        <div>
                            <table>
                                <tr>
                                    <td> Học kỳ id </td>
                                    <td> Số thứ tự  </td>
                                    <td> Mô tả  </td>
                                    <td>
                                        <Button className='ant-btn-primary' type="primary" onClick={handlAdd} >Thêm học kỳ</Button>
                                    </td>
                                </tr>

                                <tr style={{ display: (inputText === true ? "flex" : "none") }}>

                                    <td>
                                        <Form {...layout}
                                            form={form}
                                            onFinish={() => handlAddHocKy(_hocKys, dataNamHoc?.namHocId)}
                                            name="nest-messages"
                                        >
                                            <td>

                                                <Form.Item
                                                    name={"soThuTu"}
                                                >
                                                    <Input placeholder="Số thứ tự" />
                                                </Form.Item>
                                            </td>
                                            <td>
                                                <Form.Item
                                                    name={"moTa"}
                                                >
                                                    <Input placeholder="Mô tả" />
                                                </Form.Item>
                                            </td>
                                            <td>
                                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                                    <Button type="primary" htmlType="submit">
                                                        Thêm
                                                    </Button>
                                                </Form.Item>
                                            </td>
                                        </Form>
                                    </td>
                                </tr>
                                <>
                                    {
                                        _hocKys?.map(item => {
                                            return (
                                                <tr>
                                                    <td>{item?.hocKyId} </td>
                                                    <td>{item?.soThuTu}</td>
                                                    <td>{item?.moTa}</td>
                                                    <td>
                                                        <Button className='ant-btn-primary' type="primary" >Xóa</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </>
                            </table>
                        </div>
                    )
                },
            }}
            dataSource={dataNamHoc}
            scroll={{ x: 1500, y: "50vh" }}
        />
        < ModalHocKy
            type="add"
            visible={visibleModal}
            closeModal={setVisibleModal}
            onCreateComplete={(e) => handlerCreateButtonNamHoc(e)}
        />
        < ModalHocKy
            type="sua"
            visible={visibleModalSua}
            closeModal={setVisibleModalSua}
            data={
                hocKy
            }
            onCreateComplete={(e) => handlerUpdateButton(e)}
        />
    </div >);
}

export default NamHoc;