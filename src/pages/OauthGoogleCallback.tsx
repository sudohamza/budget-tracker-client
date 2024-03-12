import { Flex, Spin } from "antd";
import { useEffect } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const OauthGoogleCallback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const req = fetch(
      "http://localhost:3000/user/oauth/google/verify" + window.location.search,
      {
        credentials: "include",
      }
    );
    req
      .then((x) => x.json())
      .then((json) => {
        console.log(json);
        navigate("/");
      })
      .catch(() => console.log("error in frontend"));
  }, []);

  return (
    <Flex
      style={{ position: "fixed", inset: 0 }}
      align="center"
      justify="center"
    >
      <Spin indicator={<GoogleOutlined />} size="large" />
    </Flex>
  );
};

export default OauthGoogleCallback;
