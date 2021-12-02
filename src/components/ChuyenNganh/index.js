import React, { useEffect, useState } from "react";
import { Table, Select, Button, AutoComplete } from 'antd';
import './index.scss';
import ModalAddChuyenNganh from './FormAddChuyenNganh';
import queries from 'core/graphql';
import { getChuyenNganhsFragment } from "./fragment";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { get, isEmpty } from "lodash";
import { getKhoafragment } from "components/Khoa/fragment";

const getChuyenNganhsQuery = queries.query.getChuyenNganhs(getChuyenNganhsFragment);
const deleteChuyenNganhMutation = queries.mutation.deleteChuyenNganh();
const getKhoasQuery = queries.query.getKhoas(getKhoafragment);
const getChuyenNganhWithKhoaVienIdQuery = queries.query.getChuyenNganhWithKhoaVienId(getChuyenNganhsFragment)
const ChuyenNganh = () => {
  const [visibleModal1, setVisibleModal1] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [chuyenNganh, setChuyenNganh] = useState({});
  const [dataChuyenNganhs, setDataGetChuyenNganhs] = useState([]);
  const [dataKhoa, setDataKhoa] = useState([]);
  const [currentKhoa, setCurrentKhoa] = useState([]);

  const { data: dataGetKhoas } = useQuery(getKhoasQuery);
  const [actGetDataChuyenNganhWithKhoaVien, { data: getDataChuyenNganhWithKhoaVienId }] = useLazyQuery(getChuyenNganhWithKhoaVienIdQuery, {
    onCompleted: (data) => {
      const _listChuyenNganh = data?.getChuyenNganhWithKhoaVienId?.data;
      setDataGetChuyenNganhs(_listChuyenNganh);
    }
  })
  const { data: dataGetChuyenNganhs, loading: loadingGetChuyeNganhs } = useQuery(getChuyenNganhsQuery);
  const [actDeleteChuyenNganh, { data: dataDeleteChuyenNganh, loading: loadingDelteChuyenNganh }] = useMutation(deleteChuyenNganhMutation);

  const columns = [
    { title: 'Mã chuyên ngành', dataIndex: 'chuyenNganhId', key: 'maChuyenNganh', width: 200, },
    { title: 'Tên chuyên ngành', dataIndex: 'tenChuyenNganh', key: 'tenChuyenNganh', width: 700, },
    // { title: 'Số tín chỉ', dataIndex: 'soTinChi', key: 'soTinChi' },
    // { title: 'Khoa', dataIndex: 'khoa', key: 'khoa', width: 400, },
    {
      title: 'Action',
      key: 'x',
      render: (e) => (
        <div>
          <Button danger onClick={() => handlerEditButton(e)}>
            Chỉnh sửa
          </Button>
          <Button onClick={() => handlerDeleteChuyenNganh(e)} style={{ marginLeft: 10 }}>Xóa</Button>
        </div>
      ),
    },
  ];


  useEffect(() => {
    const _listChuyenNganh = dataGetChuyenNganhs?.getChuyenNganhs?.data;
    setDataGetChuyenNganhs(_listChuyenNganh);
  }, [dataGetChuyenNganhs]);
  useEffect(() => {
    const _listKhoa = dataGetKhoas?.getKhoas?.data;
    setDataKhoa(_listKhoa);
    setCurrentKhoa(_listKhoa?.[3])
  }, [dataGetKhoas?.getKhoas?.data]);


  const handlerDeleteChuyenNganh = async (e) => {
    const _dataReutrn = await actDeleteChuyenNganh({
      variables: {
        chuyenNganhId: e?.chuyenNganhId,
      }
    })
    const dataReturn = get(_dataReutrn, "data", {});
    const errors = get(_dataReutrn, "deleteChuyenNganh.errors", []);
    if (!isEmpty(errors)) {
      errors?.map(item => console.log(item.message));
      return;
    }
    const status = get(dataReturn, 'deleteChuyenNganh.status', "");
    if (status === "OK") {
      const _index = dataChuyenNganhs?.findIndex(item => item?.chuyenNganhId === e?.chuyenNganhId)

      let _listChuyenNganh = dataChuyenNganhs;
      _listChuyenNganh = [
        ..._listChuyenNganh.slice(0, _index),
        ..._listChuyenNganh.slice(_index + 1)
      ];

      setDataGetChuyenNganhs(_listChuyenNganh);

      return;
    }
  }
  const handleCrateChuyenNganhComplete = (e) => {
    setVisibleModal(false);
    let _data = dataChuyenNganhs;
    _data = [e, ..._data];
    setDataGetChuyenNganhs(_data);
  }
  const handleUpdateChuyenNganhComplete = (e) => {
    setVisibleModal1(false);

    const _index = dataChuyenNganhs?.findIndex(item => item?.chuyenNganhId === e?.chuyenNganhId);

    let _data = dataChuyenNganhs;
    _data = [
      ...dataChuyenNganhs?.slice(0, _index),
      {
        ..._data?.[_index],
        ...e
      },
      ...dataChuyenNganhs?.slice(_index + 1)
    ];

    setDataGetChuyenNganhs(_data);
  }
  const handleSelectKhoa = (value, option) => {
    actGetDataChuyenNganhWithKhoaVien({
      variables: {
        khoaVienId: value,
      }
    })
  }
  const { Option } = Select;

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
        value={currentKhoa?.tenKhoaVien}
        style={{ width: 300 }}
        // onChange={handleChangeKhoa}
        onSelect={handleSelectKhoa}
      >
        {dataKhoa?.map((khoaData) => (
          <Option key={khoaData?.khoaVienId}>{khoaData?.tenKhoaVien}</Option>
        ))}
      </Select>
    </div>
    <Button className='ant-btn-primary' type="primary" onClick={() => setVisibleModal(true)}>+ Thêm chuyên ngành</Button>
    <Table
      columns={columns}
      // expandable={{
      //   expandedRowRender: record => <div>
      //     <div style={{ marginRight: 100, display: "flex", flexDirection: "row", alignItems: "center" }}>
      //       <p style={{
      //         width: 1200,
      //         margin: 10,
      //       }}>{record.tenChuyenNganh}</p>
      //       <Button type="primary" danger style={{
      //         width: 70,
      //       }}>Xóa</Button>
      //     </div>

      //     <div style={{ marginRight: 100, display: "flex", flexDirection: "row", alignItems: "center" }}>
      //       <AutoComplete
      //         style={{
      //           width: 1200,
      //           margin: 10,
      //         }}
      //         options={options}
      //         placeholder="Tìm kiếm môn học của chuyên ngành"
      //         filterOption={(inputValue, option) =>
      //           option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      //         }
      //       />
      //       <Button type="primary" style={{ marginRight: 100, display: "flex", }}>Thêm</Button>
      //     </div>
      //   </div>
      // }}
      dataSource={dataChuyenNganhs}
    />
    <ModalAddChuyenNganh
      type="add"
      visible={visibleModal}
      closeModal={setVisibleModal}
      onCreateComplete={(e) => handleCrateChuyenNganhComplete(e)}
    />
    <ModalAddChuyenNganh
      type="sua"
      visible={visibleModal1}
      closeModal={setVisibleModal1}
      data={
        chuyenNganh
      }
      onCreateComplete={(e) => handleUpdateChuyenNganhComplete(e)}
    />
  </div>);

}
export default ChuyenNganh;