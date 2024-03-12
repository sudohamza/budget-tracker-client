import { Button, Card, Flex, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import GoogleButton from "../components/GoogleButton";
import { LoginPayload, login } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useEffect } from "react";
import { RootState } from "../redux/store";
import DollarShower from "../components/DollarShower";

const Login = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { profile, isLoading, errorMessage } = useSelector(
    (store: RootState) => store.user
  );

  useEffect(() => {
    if (profile) {
      navigate("/");
    }
  }, [profile]);

  const onSubmit = (values: LoginPayload) => {
    dispatch(login(values));
  };

  return (
    <Flex
      align="center"
      justify="center"
      vertical
      gap={16}
      style={{
        padding: 24,
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
      }}
    >
      <Logo />

      <Card style={{ width: "400px" }} title={<h3>Login</h3>}>
        <Form layout="vertical" onFinish={onSubmit}>
          <Form.Item
            rules={[{ required: true, type: "email" }]}
            label="Email"
            name="email"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="Password"
            name="password"
          >
            <Input type="password" />
          </Form.Item>
          <div style={{ color: "red" }}>{errorMessage}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link to={"/register  "}>Don't have an account?</Link>
            <Button loading={isLoading} htmlType="submit" type="primary">
              Login
            </Button>
          </div>
        </Form>
        <p style={{ textAlign: "center", color: "grey" }}>Or continue with:</p>
        <GoogleButton />
      </Card>
      <DollarShower />
    </Flex>
  );
};

export default Login;
