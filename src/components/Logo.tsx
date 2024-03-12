import { Space } from "antd";

const Logo = () => {
  return (
    <Space
      size="small"
      style={{
        color: "rgba(255, 255, 255,0.45)",
        fontFamily: "Segoe UI",
        fontSize: 24,
      }}
    >
      <span style={{ fontWeight: "bold" }}>BUDGET</span>
      <span style={{ fontWeight: "lighter" }}>TRACKER</span>
    </Space>
  );
};

export default Logo;
