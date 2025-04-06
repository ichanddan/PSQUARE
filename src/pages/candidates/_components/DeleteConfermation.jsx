import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import React from "react";
import { API } from "../../../services";
export default function DeleteModel({ data, getAllCandidate }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [modal, contextHolder] = Modal.useModal();
  const confirm = () => {
    modal
      .confirm({
        title: "Delete",
        icon: <ExclamationCircleOutlined />,
        content: "Are you sure to delete...",
        okText: "Delete",
        cancelText: "Cancel",
      })
      .then(async (res) => {
        if (res) {
          await API.DeleteCandidate(data._id)
            .then(() => getAllCandidate())
            .catch((e) => console.log("error in delete", e));
        }
      });
  };
  return (
    <>
      <Space>
        <Button type="text" style={{ width: 100 }} onClick={confirm}>
          Delete
        </Button>
      </Space>
      {contextHolder}
    </>
  );
}
