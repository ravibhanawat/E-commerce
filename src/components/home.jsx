import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  List,
  Typography,
  Form,
  Input,
  Spin,
  Button,
  Popconfirm,
  message,
  Tooltip,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { isEmpty } from "lodash";
import {
  set_Data,
  isEditData,
  isPostData,
  isDeleteItem,
} from "../ReduxStore/Actions/TodoList";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const ProTodos = useSelector((state) => state.allData);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [item, setItem] = useState();
  const [id, setId] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((res) => {
        dispatch(set_Data(res));
      })
      .catch((err) => {
        message.error("Something Went Wroung");
      });
  }, []);

  const onClickDelete = (item) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${item.id}`, {
      method: "DELETE",
    });
    ProTodos.dataSource.splice(item, 1);
    dispatch(isDeleteItem(ProTodos.dataSource));
  };

  const onClickEdit = (item) => {
    setId(item.id);
    setItem(item);
    form.setFieldsValue({
      title: item.title,
      body: item.body,
    });
  };

  const onFinish = async (values) => {
    let url = id
      ? `https://jsonplaceholder.typicode.com/posts/${id}`
      : "https://jsonplaceholder.typicode.com/posts";

    await fetch(url, {
      method: id ? "PUT" : "POST",
      body: JSON.stringify({
        id: id ? id : null,
        title: values.title,
        body: values.body,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        let resSuccess = !isEmpty(res) ? res : [];
        if (!isEmpty(item)) {
          dispatch(
            isEditData(
              ProTodos.dataSource.map((items, i) => {
                if (items === item) return { ...items, ...resSuccess };

                return items;
              })
            )
          );
          setItem({});
          setId();
        } else {
          dispatch(isPostData([...ProTodos.dataSource, resSuccess]));
        }

        message.success("Data Successfully Added");
        form.resetFields();
      })
      .catch((err) => {
        message.error("Something Went Wroung");
      });
  };

  return (
    <>
      <Row>
        {!isEmpty(ProTodos.dataSource) ? (
          <Col span={12}>
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={ProTodos.dataSource}
              renderItem={(item, i) => (
                <List.Item>
                  <Card
                    hoverable
                    style={{
                      borderRadius: 40,
                      margin: 10,
                      border: "2px solid peachpuff",
                    }}
                    title={item.title}
                    extra={
                      <>
                        <Tooltip title="Edit">
                          <EditOutlined
                            style={{ margin: 7 }}
                            onClick={onClickEdit.bind("this", item)}
                            key={i}
                          />
                        </Tooltip>
                        <Popconfirm
                          title="Are you sure to delete this task?"
                          onConfirm={onClickDelete.bind("this", item)}
                        >
                          <Tooltip title="Delete">
                            <DeleteOutlined />
                          </Tooltip>
                        </Popconfirm>
                      </>
                    }
                  >
                    <>
                      <Typography.Text>{item.body}</Typography.Text>
                    </>
                  </Card>
                </List.Item>
              )}
            />
          </Col>
        ) : (
          <Row>
            <Col span={12}>
              <Spin style={{ margin: 250 }} size="large" />
            </Col>
          </Row>
        )}
        <Col span={12}>
          <div
            style={{ borderRadius: 40, border: "2px solid black", margin: 10 }}
          >
            <Typography.Title level={3} style={{ margin: "28px" }}>
              {id ? "Edit" : "Add"}
            </Typography.Title>
            <Form
              form={form}
              style={{ margin: "28px" }}
              name={"basic"}
              onFinish={onFinish}
            >
              <Form.Item name="title">
                <Input placeholder="Title" />
              </Form.Item>
              <Form.Item name="body">
                <Input placeholder="Description" />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  {id ? "Edit" : "Add"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Home;
