import React, { useEffect, useState } from "react";
import {
  Table,
  Select,
  Button,
  AutoComplete,
  Upload,
  message,
  notification,
} from "antd";
import "./index.scss";
import ModalAddChuyenNganh from "./FormAddChuyenNganh";
import queries from "core/graphql";
import { getChuyenNganhsFragment } from "./fragment";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { get, isEmpty, reject } from "lodash";
import { getKhoafragment } from "components/Khoa/fragment";
import { UploadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

const createChuyenNganh = queries.mutation.createChuyenNganh();
const getChuyenNganhsQuery = queries.query.getChuyenNganhs(
  getChuyenNganhsFragment
);
const deleteChuyenNganhMutation = queries.mutation.deleteChuyenNganh();
const getKhoasQuery = queries.query.getKhoas(getKhoafragment);
const getChuyenNganhWithKhoaVienIdQuery =
  queries.query.getChuyenNganhWithKhoaVienId(getChuyenNganhsFragment);

const ChuyenNganh = () => {
  const [visibleModal1, setVisibleModal1] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [chuyenNganh, setChuyenNganh] = useState({});
  const [dataChuyenNganhs, setDataGetChuyenNganhs] = useState([]);
  const [dataKhoa, setDataKhoa] = useState([]);
  const [currentKhoa, setCurrentKhoa] = useState(-1);
  let count = 0;

  const { data: dataGetKhoas } = useQuery(getKhoasQuery);
  const [
    actGetDataChuyenNganhWithKhoaVien,
    { data: getDataChuyenNganhWithKhoaVienId },
  ] = useLazyQuery(getChuyenNganhWithKhoaVienIdQuery, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      const _listChuyenNganh = data?.getChuyenNganhWithKhoaVienId?.data;
      setDataGetChuyenNganhs(_listChuyenNganh);
    },
  });
  const {
    data: dataGetChuyenNganhs,
    loading: loadingGetChuyeNganhs,
    refetch: refetchGetChuyenNganh,
  } = useQuery(getChuyenNganhsQuery);
  const [
    actDeleteChuyenNganh,
    { data: dataDeleteChuyenNganh, loading: loadingDelteChuyenNganh },
  ] = useMutation(deleteChuyenNganhMutation);

  const [
    actCreateChuyenNganh,
    { data: dataCreateChuyenNganh, loading: loadingCreateChuyenNganh },
  ] = useMutation(createChuyenNganh, {
    onCompleted: (dataReturn) => {
      const errors = get(dataReturn, "createChuyenNganh.errors", []);
      if (!isEmpty(errors)) {
        return errors.map((item) =>
          notification["error"]({
            message: "Th??ng b??o",
            description: item?.message,
          })
        );
      }

      const _data = get(dataReturn, "createChuyenNganh.data", {});

      const status = get(dataReturn, "createChuyenNganh.status", {});

      if (!isEmpty(_data)) {
        handleCrateChuyenNganhComplete(_data);
        notification.open({
          message: "Th??ng b??o",
          description: `Th??m ${count} chuy??n ng??nh`,
        });
        return;
      }

      notification["error"]({
        message: "Loi ket noi",
      });
    },
  });

  const columns = [
    {
      title: "M?? chuy??n ng??nh",
      dataIndex: "chuyenNganhId",
      key: "maChuyenNganh",
      width: 200,
    },
    {
      title: "T??n chuy??n ng??nh",
      dataIndex: "tenChuyenNganh",
      key: "tenChuyenNganh",
      width: 700,
    },
    // { title: 'S??? t??n ch???', dataIndex: 'soTinChi', key: 'soTinChi' },
    // { title: 'Khoa', dataIndex: 'khoa', key: 'khoa', width: 400, },
    {
      title: "Action",
      key: "x",
      render: (e) => (
        <div>
          <Button danger onClick={() => handlerEditButton(e)}>
            Ch???nh s???a
          </Button>
          <Button
            onClick={() => handlerDeleteChuyenNganh(e)}
            style={{ marginLeft: 10 }}
          >
            X??a
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const _listChuyenNganh = dataGetChuyenNganhs?.getChuyenNganhs?.data || [];
    setDataGetChuyenNganhs(_listChuyenNganh);
  }, [dataGetChuyenNganhs]);

  useEffect(() => {
    const _listKhoa = dataGetKhoas?.getKhoas?.data;
    setDataKhoa(_listKhoa);
  }, [dataGetKhoas?.getKhoas?.data]);

  const handlerDeleteChuyenNganh = async (e) => {
    const _dataReutrn = await actDeleteChuyenNganh({
      variables: {
        chuyenNganhId: e?.chuyenNganhId,
      },
    });
    const dataReturn = get(_dataReutrn, "data", {});
    const errors = get(_dataReutrn, "deleteChuyenNganh.errors", []);
    if (!isEmpty(errors)) {
      errors?.map((item) => console.log(item.message));
      return;
    }
    const status = get(dataReturn, "deleteChuyenNganh.status", "");
    if (status === "OK") {
      const _index = dataChuyenNganhs?.findIndex(
        (item) => item?.chuyenNganhId === e?.chuyenNganhId
      );

      let _listChuyenNganh = dataChuyenNganhs || [];
      _listChuyenNganh = [
        ..._listChuyenNganh.slice(0, _index),
        ..._listChuyenNganh.slice(_index + 1),
      ];

      setDataGetChuyenNganhs(_listChuyenNganh);

      return;
    }
  };
  const handleCrateChuyenNganhComplete = (e) => {
    setVisibleModal(false);
    let _data = dataChuyenNganhs || [];
    _data = [e, ..._data];
    setDataGetChuyenNganhs(_data);
  };

  const handleUpdateChuyenNganhComplete = (e) => {
    setVisibleModal1(false);

    const _index = dataChuyenNganhs?.findIndex(
      (item) => item?.chuyenNganhId === e?.chuyenNganhId
    );

    let _data = dataChuyenNganhs || [];
    _data = [
      ...dataChuyenNganhs?.slice(0, _index),
      {
        ..._data?.[_index],
        ...e,
      },
      ...dataChuyenNganhs?.slice(_index + 1),
    ];

    setDataGetChuyenNganhs(_data);
  };
  const handleSelectKhoa = (value, option) => {
    setCurrentKhoa(value);

    if (value == -1) {
      refetchGetChuyenNganh();
      const _listChuyenNganh = dataGetChuyenNganhs?.getChuyenNganhs?.data || [];
      setDataGetChuyenNganhs(_listChuyenNganh);
      return;
    }

    actGetDataChuyenNganhWithKhoaVien({
      variables: {
        khoaVienId: value,
      },
    });
  };

  const handlerEditButton = (chuyenNganh) => {
    setChuyenNganh(chuyenNganh);
    setVisibleModal1(true);
  };

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      count = 1;
      d.map((cn) => {
        count++;
        console.log(count);
        actCreateChuyenNganh({
          variables: {
            inputs: {
              tenChuyenNganh: cn?.ChuyenNganh,
            },
          },
        });
      });
    });
  };
  return (
    <div className="chuyenNganh">
      <h1>DANH S??CH CHUY??N NG??NH</h1>
      <div className="combox-sv">
        <span>Khoa</span>
        <Select
          className="ant-select-selector"
          value={currentKhoa}
          style={{ width: 300 }}
          options={[
            { value: -1, label: "all" },
            ...dataKhoa?.map((item) => ({
              label: item?.tenKhoaVien,
              value: item?.khoaVienId,
            })),
          ]}
          onSelect={handleSelectKhoa}
        ></Select>
      </div>
      <Button
        className="ant-btn-primary"
        type="primary"
        onClick={() => setVisibleModal(true)}
      >
        + Th??m chuy??n ng??nh
      </Button>
      <div>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />
      </div>

      <Table
        columns={columns}
        scroll={{ x: 1500, y: "50vh" }}
        // expandable={{
        //   expandedRowRender: record => <div>
        //     <div style={{ marginRight: 100, display: "flex", flexDirection: "row", alignItems: "center" }}>
        //       <p style={{
        //         width: 1200,
        //         margin: 10,
        //       }}>{record.tenChuyenNganh}</p>
        //       <Button type="primary" danger style={{
        //         width: 70,
        //       }}>X??a</Button>
        //     </div>

        //     <div style={{ marginRight: 100, display: "flex", flexDirection: "row", alignItems: "center" }}>
        //       <AutoComplete
        //         style={{
        //           width: 1200,
        //           margin: 10,
        //         }}
        //         options={options}
        //         placeholder="T??m ki???m m??n h???c c???a chuy??n ng??nh"
        //         filterOption={(inputValue, option) =>
        //           option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        //         }
        //       />
        //       <Button type="primary" style={{ marginRight: 100, display: "flex", }}>Th??m</Button>
        //     </div>
        //   </div>
        // }}
        dataSource={dataChuyenNganhs}
      />
      <ModalAddChuyenNganh
        type="add"
        visible={visibleModal}
        closeModal={setVisibleModal}
        listKhoa={dataKhoa}
        onCreateComplete={(e) => handleCrateChuyenNganhComplete(e)}
      />
      <ModalAddChuyenNganh
        type="sua"
        visible={visibleModal1}
        closeModal={setVisibleModal1}
        listKhoa={dataKhoa}
        data={chuyenNganh}
        onCreateComplete={(e) => handleUpdateChuyenNganhComplete(e)}
      />
    </div>
  );
};
export default ChuyenNganh;
