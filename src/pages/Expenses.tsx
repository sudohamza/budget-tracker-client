import {
  Button,
  DatePicker,
  Flex,
  Modal,
  Space,
  Table,
  Form,
  Input,
} from "antd";
import type { TableProps } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  getExpenseList,
  createExpense,
  deleteExpense,
  setDeleteDialog,
  setDetailsDialog,
  updateExpense,
} from "../redux/expenseSlice";
import React, { useEffect } from "react";
import { format } from "date-fns";
import dayjs from "dayjs";

interface DataType {
  id: number;
  type: string;
  amount: number;
  spendAt: string;
}

const Expense = () => {
  const dispatch: AppDispatch = useDispatch();
  const onEditExpense = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event?.currentTarget.dataset.id;
    dispatch(setDetailsDialog(Number(id)));
  };

  const onDeleteExpense = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event?.currentTarget.dataset.id;
    dispatch(setDeleteDialog(id));
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (_, row) => row.amount.toLocaleString(),
      key: "amount",
    },
    {
      title: "Spend Date",
      dataIndex: "spendAt",
      render: (_, row) => format(new Date(row.spendAt), "dd MMM yyyy"),
      key: "spendAt",
    },
    {
      title: "Action",
      key: "action",
      render: (_, row) => {
        return (
          <Space>
            <Button
              data-id={row.id}
              onClick={onEditExpense}
              icon={<EditOutlined />}
            />
            <Button
              danger
              data-id={row.id}
              onClick={onDeleteExpense}
              icon={<DeleteOutlined />}
            />
          </Space>
        );
      },
    },
  ];

  const {
    isLoading,
    editDetails,
    errMsg,
    detailsDialog,
    expenseList,
    deleteDialog,
  } = useSelector((store: RootState) => store.expense);
  const { RangePicker } = DatePicker;

  useEffect(() => {
    dispatch(getExpenseList({}));
  }, []);

  const handleFinish = (values: any) => {
    values.spendAt.toString();
    if (editDetails) {
      const payload = {
        id: editDetails.id,
        values: values,
      };
      dispatch(updateExpense(payload));
    } else {
      dispatch(createExpense(values));
    }
  };
  const handleRangePicker = (date: any) => {
    if (!date) {
      dispatch(getExpenseList({}));
      return;
    }
    let payload = {
      startAt: date[0]?.toString(),
      endAt: date[1]?.toString(),
    };
    dispatch(getExpenseList(payload));
  };

  return (
    <Flex vertical gap={16}>
      <Flex justify="space-between">
        <Space size={12} align="center">
          <RangePicker onChange={handleRangePicker} />
        </Space>
        <Space>
          <Button
            type="primary"
            onClick={() => dispatch(setDetailsDialog(true))}
            icon={<PlusOutlined />}
          >
            Add New
          </Button>
        </Space>
      </Flex>
      <Table columns={columns} rowKey="id" dataSource={expenseList} />
      <Modal
        width={400}
        open={Boolean(detailsDialog)} /* changed to detailDialog */
        title="Expense Details"
        onCancel={() => dispatch(setDetailsDialog(false))}
        destroyOnClose
        footer={null}
        closeIcon={null}
      >
        <Form
          initialValues={{
            ...editDetails,

            spendAt: dayjs(
              editDetails ? new Date(editDetails.spendAt) : new Date()
            ),
          }}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item rules={[{ required: true }]} label="Type" name="type">
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[
              {
                validator: (_, value) =>
                  value > 0
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Number must be greater than zero")
                      ),
                required: true,
              },
            ]}
          >
            <Input min={1} type="number" />
          </Form.Item>
          <p style={{ color: "red" }}>{errMsg}</p>
          <Form.Item label="Date" name="spendAt" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Flex gap={12} justify="right">
            <Button onClick={() => dispatch(setDetailsDialog(false))}>
              Cancel
            </Button>
            <Button
              loading={isLoading}
              title="Save"
              type="primary"
              htmlType="submit"
            >
              {Boolean(editDetails) ? "Save Changes" : "Save"}
            </Button>
          </Flex>
        </Form>
      </Modal>
      <Modal
        okButtonProps={{ loading: isLoading }}
        width={400}
        okType="danger"
        okText="Delete"
        onCancel={() => dispatch(setDeleteDialog(false))}
        onOk={() => dispatch(deleteExpense(deleteDialog as number))}
        open={Boolean(deleteDialog)}
        title="Confirm Action"
      >
        Are you sure you want to delete this record?
      </Modal>
    </Flex>
  );
};

export default Expense;
