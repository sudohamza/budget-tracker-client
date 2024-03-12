import { Button, Card, Flex, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import GoogleButton from "../components/GoogleButton";
import { RegisterPayload, register } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import DollarShower from "../components/DollarShower";

const Register = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, isLoading, errorMessage } = useSelector(
    (store: RootState) => store.user
  );
  useEffect(() => {
    if (profile) {
      navigate("/");
    }
  }, [profile]);
  const handleFinish = (values: RegisterPayload) => {
    dispatch(register(values));
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
      <Card style={{ width: "400px" }} title={<h3>Sign Up</h3>}>
        <Form onFinish={handleFinish} layout="vertical">
          <Form.Item rules={[{required:true}]} name="fullName" label="Full Name">
            <Input />
          </Form.Item>
          <Form.Item rules={[{required:true,type:"email"}]} name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password">
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
            <Link to={"/login"}>Already have an account?</Link>
            <Button loading={isLoading} htmlType="submit" type="primary">
              Submit
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

export default Register;
