import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  List,
  Typography,
  Form,
  Spin,
  Input,
  Button,
  message,
  Popconfirm,
  Tooltip,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { isEmpty } from "lodash";

const List1 = () => {
  const [data, setData] = useState();
  const [form] = Form.useForm();
  const [item, setItem] = useState();
  const [id, setId] = useState("");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
      .then((response) => response.json())
      .then((res) => setData([...res]));
  }, []);

  const onDelete = (item) => {
    data.splice(item, 1);
    setData([...data]);
  };

  const onEdit = (item) => {
    setId(item.id);
    setItem(item);
    form.setFieldsValue({
      body: item.body,
    });
  };

  const onFinish = async (values) => {
    if (item) {
      setData(
        data.map((items, i) => {
          if (items === item) return { ...items, body: values.body };

          return items;
        })
      );
      setItem({});
      setId();
      form.resetFields();
      message.success("Data Edited Successfully");
    } else {
      setData([...data, ...values]);
      message.success("Data Successfully Added");
      form.resetfields();
    }
  };

  return (
    <>
      <Row>
        {!isEmpty(data) ? (
          <Col span={12}>
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={data}
              renderItem={(item, i) => (
                <List.Item>
                  <Card
                    style={{
                      borderRadius: 40,
                      margin: 10,
                      border: "2px solid darkcyan",
                    }}
                    title={item.id}
                    extra={
                      <>
                        <Tooltip title="Edit">
                          <EditOutlined
                            style={{ margin: 7 }}
                            onClick={onEdit.bind("this", item)}
                            key={i}
                          />
                        </Tooltip>
                        <Popconfirm
                          title="Are you sure to delete this task?"
                          onConfirm={onDelete.bind("this", item)}
                        >
                          <Tooltip title="Delete">
                            <DeleteOutlined />
                          </Tooltip>
                        </Popconfirm>
                      </>
                    }
                  >
                    <>
                      <div>
                        <Typography.Text style={{ margin: 10, color: "red" }}>
                          Email :- {item.email}
                        </Typography.Text>
                      </div>
                      <div style={{ margin: 10 }}>
                        <Typography.Text>Comment : {item.body}</Typography.Text>
                      </div>
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
              <Form.Item name="body">
                <Input placeholder="comment" />
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

export default List1;
