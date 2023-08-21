import React, { useState } from "react";
import styles from "./FormList.module.css";
import { Space, Typography, Button, Modal } from "antd";
import FormC from "../Form/FormC";

const { Title, Text } = Typography;

function FormList() {
  const [forms, setForms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <Title level={3}>Filed taxes Forms</Title>
      <Space>
        {forms.map((form) => {
          return (
            <Space key={form.id} id={form.id}>
              <Text>Form{form.id}</Text>
            </Space>
          );
        })}
      </Space>
      <Button type="primary" onClick={showModal}>
        Create New Form
      </Button>
      <Modal
        title="Form"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <FormC />
      </Modal>
    </div>
  );
}

export default FormList;
