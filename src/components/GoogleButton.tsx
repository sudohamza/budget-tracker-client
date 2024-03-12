import { Button, Flex } from "antd";

const GoogleButton = () => {
  const loginWithGoogle = async () => {
    const res = await fetch("http://localhost:3000/user/oauth/google/login");
    const json = await res.json();
    window.open(json.url, "_self");
  };

  return (
    <Button
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        color: "gray",
      }}
      size="large"
      onClick={loginWithGoogle}
    >
      <Flex gap={4} align="center">
        <img
          width={24}
          src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.550/google-logo.5867462c.svg"
          alt=""
        />
        Google
      </Flex>
    </Button>
  );
};

export default GoogleButton;
