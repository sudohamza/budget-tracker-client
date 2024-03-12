import { Button, Drawer } from "antd";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import menuItems from "../mocks/menuItem";
import { CloseOutlined } from "@ant-design/icons";
import ShortLogo from "./ShortLogo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { closeSidebar } from "../redux/uiSlice";
type MenuItemProps = {
  id: number;
  label: string;
  path: string;
  icon: ReactNode;
};

const MenuItem: React.FC<MenuItemProps> = ({ label, path, icon }) => {
  const currentPath = useLocation();

  return (
    <Link to={path}>
      <Button
        size="large"
        style={{
          border: "none",
          boxShadow: "none",
          background: currentPath.pathname !== path ? "transparent" : "blue",
          marginTop: "2px",
          width: "100%",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          fontSize: "14px",
        }}
        type="primary"
        icon={icon}
      >
        {label}
      </Button>
    </Link>
  );
};

export const SidebarMenu = () => {
  return (
    <div style={{ padding: 4 }}>
      {menuItems.map((item) => (
        <MenuItem key={item.id} {...item} />
      ))}
    </div>
  );
};

const MenuDrawer = () => {
  const isSidebarOpen = useSelector(
    (store: RootState) => store.ui.isSidebarOpen
  );
  const dispatch = useDispatch();
  return (
    <Drawer
      style={{ color: "white", background: "#001529" }}
      width={200}
      placement="left"
      onClose={() => dispatch(closeSidebar())}
      open={isSidebarOpen}
      closeIcon={
        <CloseOutlined
          style={{ fontSize: "18px", color: "white", marginLeft: "125px" }}
        />
      }
      // bodyStyle={{ padding: "0px" }}
    >
      <ShortLogo />
      <SidebarMenu />
    </Drawer>
  );
};

export default MenuDrawer;
