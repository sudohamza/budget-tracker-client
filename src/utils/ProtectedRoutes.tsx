// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { getUserProfile } from "../redux/userSlice";
import { Spin } from "antd";

const ProtectedRoutes = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  const isReady = useSelector((state: RootState) => state.user.isReady);
  const profile = useSelector((state: RootState) => state.user.profile);
  if (!isReady) {
    return (
      <div
        style={{
          display: "flex",
          position: "fixed",
          inset: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return profile ? <Outlet /> : <Navigate to="login" />;
};

export default ProtectedRoutes;
