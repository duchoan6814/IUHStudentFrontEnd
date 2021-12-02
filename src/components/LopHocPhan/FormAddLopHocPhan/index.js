import React, { useEffect } from "react";
import { Modal, Form, Input, notification, Button } from "antd";

import { isEmpty } from "lodash";
import { useMutation } from '@apollo/client';

import { get } from "lodash";
import queries from 'core/graphql';

const createLopMutation = queries.mutation.createLop();

const ModalAddLopHocPhan = ({ visible, closeModal, type, data, onCompleteAction }) => {

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 24 },
    };
    const [actCreateLop, { data: dataCreateLop, loading: loadingCreateLop }] = useMutation(createLopMutation,
        {
            onCompleted: (dataReturn) => {
                const errors = get(dataReturn, 'createLop.errors', []);
                if (!isEmpty(errors)) {
                    return errors.map(item =>
                        notification["error"]({
                            message: `Thông báo`,
                            description: item?.message,
                        })
                    )
                }

                const _data = get(dataReturn, 'createLop.data', {});
                const status = get(dataReturn, 'createLop.status', {})
                if (!isEmpty(_data)) {
                    onCompleteAction(_data);
                    notification.open({
                        message: 'Thông báo',
                        description: status,
                    })
                    return;
                }

                notification["error"]({
                    message: "Loi ket noi",
                })
            }
        });
    const [form] = Form.useForm();
    useEffect(() => {
        if (isEmpty(data)) {
            return;
        }
        form.setFieldsValue({
            lopId: data.lopId,
            tenLop: data.tenLop,
            khoaHoc: data.khoaHoc,
        })
    }, [data])
    function onChange(date, dateString) {
        console.log(date, dateString);
    }
    const handleAddLop = () => {
        const _dataForm = form.getFieldsValue(true);
        actCreateLop({
            variables: {
                tenLop: _dataForm?.tenLop,
                khoaHoc: _dataForm?.khoaHoc,
            }
        })
    }
    const handleEditLop = () => {
        console.log("UpdateLop");
    }
    const renderForm = () => {
        return (

            <Form {...layout} onFinish={type === 'add' ? handleAddLop : handleEditLop} form={form} name="nest-messages">
                <Form.Item
                    name={"lopId"}
                    label="Lop ID"
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name={"tenLop"}
                    label="Tên lớp"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={"khoaHoc"}
                    label="Khóa học"
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        {type === 'add' ? "Thêm" : "Sửa"}
                    </Button>
                </Form.Item>
            </Form>
        );
    };
    return (
        <Modal
            title={type === 'add' ? 'Thêm lớp học phần' : 'Sửa lớp học phần'}
            centered
            visible={visible}
            onCancel={() => closeModal(false)}
            width={1000}
            footer={null}
        >
            {renderForm()}
        </Modal>
    );
};

export default ModalAddLopHocPhan;
