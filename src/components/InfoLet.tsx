import { Card, Statistic } from "antd";

type InfoLetProps = {
  amount: number;
  title: string;
  color: string;
  Icon: any;
};

const InfoLet: React.FC<InfoLetProps> = ({ amount, title, color, Icon }) => {
  return (
    <Card
      style={{
        borderColor: color,
        background: `linear-gradient(130deg, ${color}00 ,${color}30)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Statistic
        title={title}
        value={amount || "None"}
        precision={0}
        prefix="Rs"
        valueStyle={{ color }}
      />
      <Icon
        style={{
          position: "absolute",
          bottom: -20,
          right: -20,
          color,
          fontSize: 80,
          opacity: 0.25,
          // transform: "rotateZ(30deg)",
        }}
      />
    </Card>
  );
};

export default InfoLet;
