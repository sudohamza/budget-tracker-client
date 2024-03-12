import { Col, Row } from "antd";
import InfoLet from "../components/InfoLet";
import {
  BankOutlined,
  WalletOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { getTotalExpense, getTotalIncome } from "../redux/dashboardSlice";
import PIChart from "../components/PIChart";

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { totalIncome, totalExpenses } = useSelector(
    (store: RootState) => store.dashboard
  );
  useEffect(() => {
    dispatch(getTotalIncome());
    dispatch(getTotalExpense());
  }, []);

  const chartData = [
    { name: "Total Income", data: totalIncome, color: "#14B8A6" },
    { name: "Total Expense", data: totalExpenses, color: "#DC2626" },
    { name: "Savings", data: totalIncome - totalExpenses, color: "#16A34A" },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col
          span={8}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
        >
          <InfoLet
            title="Total Savings"
            color="#16A34A"
            amount={totalIncome - totalExpenses}
            Icon={BankOutlined}
          />
        </Col>
        <Col
          span={8}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
        >
          <InfoLet
            title="Total Income"
            color="#3B5998"
            amount={totalIncome}
            Icon={WalletOutlined}
          />
        </Col>
        <Col
          span={8}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
        >
          <InfoLet
            title="Total Expenses"
            color="#DC2626"
            amount={totalExpenses}
            Icon={ShoppingOutlined}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }} gutter={[16, 16]}>
        <Col
          span={8}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
        >
          <PIChart data={chartData} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
