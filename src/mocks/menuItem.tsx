import {
  WalletOutlined,
  ShoppingOutlined,
  DashboardOutlined,
  StarOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";

const menuItems = [
  {
    id: 1,
    label: "Dashboard",
    path: "/",
    icon: <DashboardOutlined style={{ fontSize: "24px" }} />,
  },
  {
    id: 2,
    label: "Income",
    path: "/income",
    icon: <WalletOutlined style={{ fontSize: "24px" }} />,
  },
  {
    id: 3,
    label: "Expenses",
    path: "/expenses",
    icon: <ShoppingOutlined style={{ fontSize: "24px" }} />,
  },
  {
    id: 4,
    label: "Goals",
    path: "/goal",
    icon: <StarOutlined style={{ fontSize: "24px" }} />,
  },
  {
    id: 5,
    label: "Ledger",
    path: "/ledger",
    icon: <FileDoneOutlined style={{ fontSize: "24px" }} />,
  },
];

export default menuItems;
