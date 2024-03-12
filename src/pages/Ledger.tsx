import { DatePicker, Flex, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { format } from "date-fns";
import { getLedgerData } from "../redux/ledgerSlice";

interface DataType {
  type: string;
  title: string;
  amount: number;
  date: string;
}

const Ledger = () => {
  const dispatch: AppDispatch = useDispatch();

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Type",
      key: "type",
      render: (_, row) => {
        return (
          <Tag color={row.type === "income" ? "green" : "red"}>
            {row.type.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (_, row) => row.amount.toLocaleString(),
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (_, row) => format(new Date(row.date), "dd MMM yyyy"),
      key: "date",
    },
  ];

  const { dataList } = useSelector((store: RootState) => store.ledger);
  const { RangePicker } = DatePicker;

  useEffect(() => {
    dispatch(getLedgerData({}));
  }, []);

  const handleRangePicker = (date: any) => {
    if (!date) {
      dispatch(getLedgerData({}));
      return;
    }
    let payload = {
      startAt: date[0]?.toString(),
      endAt: date[1]?.toString(),
    };
    dispatch(getLedgerData(payload));
  };

  return (
    <Flex vertical gap={16}>
      <Flex justify="space-between">
        <Space size={12} align="center">
          <RangePicker onChange={handleRangePicker} />
        </Space>
        <Space></Space>
      </Flex>
      <Table columns={columns} rowKey="id" dataSource={dataList} />
    </Flex>
  );
};

export default Ledger;
