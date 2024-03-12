import { Progress } from "antd";

type GoalProgressProps = {
  amount: number;
  currentBalance: number;
  endDate: string;
};

const GoalProgress: React.FC<GoalProgressProps> = () => {
  return (
    <div>
      <Progress />
    </div>
  );
};

export default GoalProgress;
