import React from "react";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Grid, Button, theme, Flex, Tag } from "antd";
import MenuDrawer, { SidebarMenu } from "./components/MenuDrawer";
import ShortLogo from "./components/ShortLogo";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Goals from "./pages/Goals";
import UserProfile from "./components/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "./redux/uiSlice";
import { AppDispatch } from "./redux/store";
const { Header, Sider, Content, Footer } = Layout;
import { RootState } from "./redux/store";
import Ledger from "./pages/Ledger";

const MainLayout: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector((store: RootState) => store.user.profile);
  const { useBreakpoint } = Grid;
  const { lg } = useBreakpoint();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        collapsedWidth={0}
        trigger={null}
        breakpoint="lg"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <ShortLogo />
        <SidebarMenu />
        <MenuDrawer />
      </Sider>
      <Layout style={{ marginLeft: lg ? 200 : 0, minHeight: "100vh" }}>
        <Header
          style={{
            background: colorBgContainer,
            zIndex: "999",
            position: "fixed",
            display: "flex",
            justifyContent: "space-between",
            height: "54px",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            top: 0,
            right: 0,
            padding: 0,
            left: 0,
            marginLeft: lg ? 200 : 0,
          }}
        >
          <Button
            type="text"
            icon={<MenuUnfoldOutlined />}
            onClick={() => dispatch(openSidebar())}
            style={{
              display: `${lg ? "none" : "block"}`,
              fontSize: "16px",
              width: 54,
              height: 54,
            }}
          />

          {/* Profile and logout  */}
          <Flex
            justify="space-between"
            align="center"
            style={{ marginLeft: "auto", paddingRight: 20 }}
          >
            <Tag style={{ marginTop: "1px" }}>{profile?.fullName}</Tag>
            <UserProfile />
          </Flex>
        </Header>
        <Content style={{ margin: "80px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" Component={Dashboard} />
              <Route path="/income" Component={Income} />
              <Route path="/expenses" Component={Expenses} />
              <Route path="/goal" Component={Goals} />
              <Route path="/ledger" Component={Ledger} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Venturedive ©{new Date().getFullYear()} Created by Hamza Ali
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
