import React from "react";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Space } from "antd";
import { logout } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

const UserProfile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const items: MenuProps["items"] = [
    {
      key: "1",
      onClick: () => dispatch(logout()),
      label: (
        <a style={{ color: "red" }} target="_blank" rel="noopener noreferrer">
          Logout
        </a>
      ),
    },
  ];

  const profile = useSelector((state: RootState) => state.user.profile);

  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown menu={{ items }} placement="bottom">
          <Avatar style={{ backgroundColor: "#3b5998" }}>
            {profile?.fullName?.charAt(0)?.toUpperCase()}
          </Avatar>
        </Dropdown>
      </Space>
    </Space>
  );
};

export default UserProfile;
