import { Flex, Space } from "antd";

const ShortLogo = () => {
  return (
    <Flex justify="center" style={{ marginTop: 5, marginBottom: 5 }}>
      <div style={{ padding: 5 }}>
        <Space
          size="small"
          style={{
            color: "rgba(255, 255, 255,0.45)",
            padding: "4px 6px",
            fontFamily: "Segoe UI",
            fontSize: 24,
            border: "1px solid rgba(255, 255, 255,0.45)",
            borderRadius: "10px",
          }}
        >
          <span style={{ fontWeight: "bold" }}>B </span>
          <span style={{ fontWeight: "lighter" }}>TRACKER</span>
        </Space>
      </div>
    </Flex>
  );
};

export default ShortLogo;
