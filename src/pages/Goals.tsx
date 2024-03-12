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
  getGoalList,
  createGoal,
  deleteGoal,
  setDeleteDialog,
  setDetailsDialog,
  updateGoal,
} from "../redux/goalsSlice";
import React, { useEffect } from "react";
import { format, formatDistanceToNow } from "date-fns";
import dayjs from "dayjs";

interface DataType {
  id: number;
  name: string;
  amount: number;
  endDate: string;
}

const Goals = () => {
  const dispatch: AppDispatch = useDispatch();
  const onEditGoal = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event?.currentTarget.dataset.id;
    dispatch(setDetailsDialog(Number(id)));
  };

  const onDeleteGoal = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event?.currentTarget.dataset.id;
    dispatch(setDeleteDialog(id));
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (_, row) => row.amount.toLocaleString(),
      key: "amount",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (_, row) => format(new Date(row.endDate), "dd MMM yyyy"),
      key: "endDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, row) => {
        return (
          <Space>
            <Button
              data-id={row.id}
              onClick={onEditGoal}
              icon={<EditOutlined />}
            />
            <Button
              danger
              data-id={row.id}
              onClick={onDeleteGoal}
              icon={<DeleteOutlined />}
            />
          </Space>
        );
      },
    },
    {
      title: "Time Left",
      render: (_, row) => {
        return <p>{formatDistanceToNow(new Date(row.endDate))} left</p>;
      },
    },
  ];

  const { isLoading, editDetails, detailsDialog, goalList, deleteDialog } =
    useSelector((store: RootState) => store.goal);
  const { RangePicker } = DatePicker;

  useEffect(() => {
    dispatch(getGoalList({}));
  }, []);

  const handleFinish = (values: any) => {
    values.endDate.toString();
    if (editDetails) {
      const payload = {
        id: editDetails.id,
        values: values,
      };
      dispatch(updateGoal(payload));
    } else {
      dispatch(createGoal(values));
    }
  };
  const handleRangePicker = (date: any) => {
    if (!date) {
      dispatch(getGoalList({}));
      return;
    }
    let payload = {
      startAt: date[0]?.toString(),
      endAt: date[1]?.toString(),
    };
    dispatch(getGoalList(payload));
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
      <Table columns={columns} rowKey="id" dataSource={goalList} />
      <Modal
        width={400}
        open={Boolean(detailsDialog)} /* changed to detailDialog */
        title="Goal Details"
        onCancel={() => dispatch(setDetailsDialog(false))}
        destroyOnClose
        footer={null}
        closeIcon={null}
      >
        <Form
          initialValues={{
            ...editDetails,

            endDate: dayjs(
              editDetails ? new Date(editDetails.endDate) : new Date()
            ),
          }}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item rules={[{ required: true }]} label="Name" name="name">
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
            label="Target Date"
            name="endDate"
            rules={[
              {
                required: true,
                validator: (_, value) =>
                  value > dayjs(new Date())
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Cannot select previous date for Goal.")
                      ),
              },
            ]}
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
        onOk={() => dispatch(deleteGoal(deleteDialog as number))}
        open={Boolean(deleteDialog)}
        title="Confirm Action"
      >
        Are you sure you want to delete this record?
      </Modal>
    </Flex>
  );
};

export default Goals;
