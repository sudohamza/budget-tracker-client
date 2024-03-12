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
  getIncomeList,
  createIncome,
  deleteIncome,
  setDeleteDialog,
  setDetailsDialog,
  updateIncome,
} from "../redux/incomeSlice";
import React, { useEffect } from "react";
import { format } from "date-fns";
import dayjs from "dayjs";

interface DataType {
  id: number;
  source: string;
  amount: number;
  receivedAt: string;
}

const Income = () => {
  const dispatch: AppDispatch = useDispatch();
  const onEditIncome = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event?.currentTarget.dataset.id;
    dispatch(setDetailsDialog(Number(id)));
  };

  const onDeleteIncome = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event?.currentTarget.dataset.id;
    dispatch(setDeleteDialog(id));
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (_, row) => row.amount.toLocaleString(),
      key: "amount",
    },
    {
      title: "Received Date",
      dataIndex: "receivedAt",
      render: (_, row) => format(new Date(row.receivedAt), "dd MMM yyyy"),
      key: "receivedAt",
    },
    {
      title: "Action",
      key: "action",
      render: (_, row) => {
        return (
          <Space>
            <Button
              data-id={row.id}
              onClick={onEditIncome}
              icon={<EditOutlined />}
            />
            <Button
              danger
              data-id={row.id}
              onClick={onDeleteIncome}
              icon={<DeleteOutlined />}
            />
          </Space>
        );
      },
    },
  ];

  const { isLoading, editDetails, detailsDialog, incomeList, deleteDialog } =
    useSelector((store: RootState) => store.income);
  const { RangePicker } = DatePicker;

  useEffect(() => {
    dispatch(getIncomeList({}));
  }, []);

  const handleFinish = (values: any) => {
    values.receivedAt.toString();
    if (editDetails) {
      const payload = {
        id: editDetails.id,
        values: values,
      };
      dispatch(updateIncome(payload));
    } else {
      dispatch(createIncome(values));
    }
  };
  const handleRangePicker = (date: any) => {
    if (!date) {
      dispatch(getIncomeList({}));
      return;
    }
    let payload = {
      startAt: date[0]?.toString(),
      endAt: date[1]?.toString(),
    };
    dispatch(getIncomeList(payload));
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
      <Table columns={columns} rowKey="id" dataSource={incomeList} />
      <Modal
        width={400}
        open={Boolean(detailsDialog)} /* changed to detailDialog */
        title="Income Details"
        onCancel={() => dispatch(setDetailsDialog(false))}
        destroyOnClose
        footer={null}
        closeIcon={null}
      >
        <Form
          initialValues={{
            ...editDetails,

            receivedAt: dayjs(
              editDetails ? new Date(editDetails.receivedAt) : new Date()
            ),
          }}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item rules={[{ required: true }]} label="Source" name="source">
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
          <Form.Item
            label="Date"
            name="receivedAt"
            rules={[{ required: true }]}
          >
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
        onOk={() => dispatch(deleteIncome(deleteDialog as number))}
        open={Boolean(deleteDialog)}
        title="Confirm Action"
      >
        Are you sure you want to delete this record?
      </Modal>
    </Flex>
  );
};

export default Income;
