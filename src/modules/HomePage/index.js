import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, LaptopOutlined } from "@ant-design/icons";

import SinhVienComponent from "components/SinhVien";
import KhoaComponent from "components/Khoa";
import ChuyenNganh from "components/ChuyenNganh";
import MonHoc from "components/MonHoc";
import NamHoc from "components/NamHoc";
import HocPhan from "components/HocPhan";
import LopHocPhan from "components/LopHocPhan";
import "./HomePage.scss";
import { isEmpty } from "lodash";
import { clientCache } from "helpers";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const prefix = "home-page";

const listComponent = [
  {
    key: "5",
    component: SinhVienComponent,
  },
  {
    key: "6",
    component: KhoaComponent,
  },
  {
    key: "7",
    component: ChuyenNganh,
  },
  {
    key: "8",
    component: MonHoc,
  },
  {
    key: "9",
    component: NamHoc,
  },
  {
    key: "10",
    component: HocPhan,
  },
  {
    key: "11",
    component: LopHocPhan,
  },
];

const HomePage = () => {
  const [currentComponent, setCurrentComponent] = useState("5");

  const handleChangeMenu = (e) => {
    const key = e?.key;
    if(key == "1") {
      clientCache.removeAuthenTokenWithCookie();
      window.location.href = `${window.location.origin}/login`;
      return;
    }

    setCurrentComponent(key);
  };

  const renderContent = () => {
    const _component = listComponent?.find(
      (item) => item?.key === currentComponent
    );

    if (isEmpty(_component)) return;

    const Component = _component?.component;

    return <Component />;
  };

  return (
    <Layout className={`${prefix}`}>
      <Header className={`${prefix}__header header`}>
        <div className="logo">IUHStudent</div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["5"]}
            defaultOpenKeys={["sub1, sub2"]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={handleChangeMenu}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="T??i kho???n">
              <Menu.Item key="1">????ng xu???t</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Ch???c n??ng">
              <Menu.Item key="5">Sinh Vi??n</Menu.Item>
              <Menu.Item key="6">Khoa</Menu.Item>
              <Menu.Item key="7">Chuy??n Ng??nh</Menu.Item>
              <Menu.Item key="8">M??n H???c</Menu.Item>
              <Menu.Item key="9">N??m H???c</Menu.Item>
              <Menu.Item key="10">H???c Ph???n</Menu.Item>
              <Menu.Item key="11">L???p H???c Ph???n</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default HomePage;
