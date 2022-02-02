import { Modal, PageHeader, Table, Tag } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { getCustomers } from "../services/CustomerService";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Code",
    dataIndex: "code",
  },
  {
    title: "Country",
    dataIndex: "country",
    filters: [
      { text: "Cameroon", value: "CAMEROON" },
      { text: "Ethiopia", value: "ETHIOPIA" },
      { text: "Morocco", value: "MOROCCO" },
      { text: "Mozambique", value: "MOZAMBIQUE" },
      { text: "Uganda", value: "UGANDA" },
    ],
  },
  {
    title: "State",
    dataIndex: "state",
    filters: [
      {
        text: "Valid",
        value: "VALID",
      },
      {
        text: "Not Valid",
        value: "NOT_VALID",
      },
    ],
    render: (state) => (
      <Tag color={state == "VALID" ? "success" : "error"}>{state}</Tag>
    ),
  },
];

function Home() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
  });

  useEffect(() => {
    handleGetCustomers(pagination);
  }, []);

  async function handleGetCustomers(pagination, filters) {
    try {
      setLoading(true);
      const result = await getCustomers(
        pagination.current,
        pagination.pageSize,
        filters
      );
      let {
        content,
        number: current,
        totalElements: total,
        size: pageSize,
      } = result;
      if (!content || current < 0 || total < 0 || !pageSize) {
        throw new Error("Some properties are missing");
      }
      current++;
      content.map((element) => {
        element.code = `+${element.code}`;
        element.country =
          element.country[0] + element.country.slice(1).toLowerCase();
        element.state = element.state.replace("_", " ");
      });
      setContent(content);
      setPagination((prevState) => ({
        ...prevState,
        current,
        total,
        pageSize,
      }));
    } catch (error) {
      Modal.error({
        title: "Something went wrong",
        content: error.toString(),
      });
    }
    setLoading(false);
  }

  return (
    <PageHeader title="List Customers">
      <Content>
        <Table
          rowKey={(row) => row.id}
          loading={loading}
          onChange={handleGetCustomers}
          pagination={pagination}
          dataSource={content}
          columns={columns}
        />
      </Content>
    </PageHeader>
  );
}

export default Home;
