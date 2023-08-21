import React, { useState } from "react";
import styles from "./FormC.module.css";
import { Space, Button, Checkbox, Form, Input, Radio } from "antd";
import validator from "validator";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function FormC() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState({ value: "" });
  const [filedReturn, setFiledReturn] = useState(null);
  const [sCorp, setSCorp] = useState(null);
  const [ownershipAlter, setOwnershipAlter] = useState(null);
  const [transactionsType, setTransactionsType] = useState([]);
  const [documentsNeedUpld, setDocumentsNeedUpld] = useState([]);

  function validateEmail(email) {
    if (validator.isEmail(email)) {
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    }
    return {
      validateStatus: "error",
      errorMsg: "Invalid Email",
    };
  }
  function handleNext(e) {
    setStep(step + 1);
  }
  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail({ ...validateEmail(value), value });
  }
  function filedReturnLastYear(e) {
    const value = e.target.value;
    setFiledReturn(value);
  }
  function isS_CorpChange(e) {
    const value = e.target.value;
    setSCorp(value);
  }
  function isOwnershipChange(e) {
    const value = e.target.value;
    setOwnershipAlter(value);
  }
  const onChangeTransaction = (checkedValues) => {
    // console.log("checked = ", checkedValues);
    setTransactionsType([...checkedValues]);
  };
  const onChangeDocumentsNeed = (checkedValues) => {
    // console.log("checked = ", checkedValues);
    setDocumentsNeedUpld([...checkedValues]);
  };

  const transactionPrevYearOptions = [
    { label: "Capital Infusion", value: "Capital Infusion" },
    { label: "Capital Withdrawl", value: "Capital Withdrawl" },
    { label: "Related Party Transaction", value: "Related Party Transaction" },
  ];
  const neededDocumentOptions = [
    { label: "Bank Statements", value: "Bank Statements" },
    { label: "Credit Card Statements", value: "Credit Card Statements" },
    { label: "Form 1099", value: "Form 1099" },
    { label: "Form 940 / 941", value: "Form 940 / 941" },
    { label: "EIN Certificate", value: "EIN Certificate" },
    {
      label: "IRS Acceptance Letter of S-Corp<",
      value: "IRS Acceptance Letter of S-Corp<",
    },
    { label: "Financials(if prepared)", value: "Financials(if prepared)" },
  ];

  return (
    <div className={styles.container}>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 1000,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {step === 1 && (
          <>
            <Form.Item
              colon={false}
              label={<label className={styles.label_form}>Email</label>}
              name="email"
              validateStatus={email.validateStatus}
              help={email.errorMsg || "example@example.com"}
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input onChange={handleEmailChange} value={email.value} />
            </Form.Item>

            <Form.Item
              colon={false}
              label={
                <label className={styles.label_form}>
                  Did you file the return last year?
                </label>
              }
              name="returnFiledLastYear"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your password!",
              //   },
              // ]}
            >
              <Radio.Group
                onChange={filedReturnLastYear}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              colon={false}
              className={filedReturn === "Yes" ? "" : "disable_form"}
              label={<label className={styles.label_form}>File upload</label>}
              name="uploadLastYearReturn"
              rules={[
                {
                  required: true,
                  message: "Please upload the file",
                },
              ]}
            >
              <Input disabled={filedReturn === "Yes" ? false : true} />
            </Form.Item>
            <Form.Item
              colon={false}
              className={filedReturn === "Yes" ? "" : "disable_form"}
              label={
                <label className={styles.label_form}>
                  Was the S-Corp incorporated in 2022?
                </label>
              }
              name="s_corpin2022"
            >
              <Radio.Group
                onChange={isS_CorpChange}
                style={{ display: "flex", flexDirection: "column" }}
                disabled={filedReturn === "Yes" ? false : true}
              >
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              colon={false}
              className={
                filedReturn === "Yes" && sCorp === "Yes" ? "" : "disable_form"
              }
              label={
                <label className={styles.label_form}>
                  Please Upload the InCorporation Document
                </label>
              }
              name="uploadSCorp"
              rules={[
                {
                  required: true,
                  message: "Please upload the file",
                },
              ]}
            >
              <Input
                disabled={
                  filedReturn === "Yes" && sCorp === "Yes" ? false : true
                }
              />
            </Form.Item>
            <Form.Item
              colon={false}
              label={
                <label className={styles.label_form}>
                  Was there any change in Ownership structure in 2022
                </label>
              }
              name="ownershipStructure"
            >
              <Radio.Group
                onChange={isOwnershipChange}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              colon={false}
              className={ownershipAlter === "Yes" ? "" : "disable_form"}
              label={
                <label className={styles.label_form}>
                  Upload latest share holding pattern
                </label>
              }
              name="uploadShareholding"
              rules={[
                {
                  required: true,
                  message: "Please upload the file",
                },
              ]}
            >
              <Input disabled={ownershipAlter === "Yes" ? false : true} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 16,
                span: 16,
              }}
            >
              <Space>
                <Button type="primary">Save</Button>
                <Button
                  style={{ width: "5rem" }}
                  onClick={handleNext}
                  type="primary"
                >
                  Next
                </Button>
              </Space>
            </Form.Item>
          </>
        )}
        {step === 2 && (
          <>
            <Form.Item
              colon={false}
              label={
                <label>Was there any following transaction in 2022?</label>
              }
              name="transaction"
            >
              <Checkbox.Group
                options={transactionPrevYearOptions}
                style={{ display: "flex", flexDirection: "column" }}
                onChange={onChangeTransaction}
              ></Checkbox.Group>
            </Form.Item>
            <Form.Item
              label={
                <label className={styles.label_form}>
                  Upload the Document for the same
                </label>
              }
              name="transactionDocument"
            >
              <Input />
            </Form.Item>
            <Form.Item
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 16,
              }}
              label={<label>Please upload the following documents</label>}
              name="neededDocuments"
            >
              <Checkbox.Group
                options={neededDocumentOptions}
                onChange={onChangeDocumentsNeed}
                style={{ display: "flex", flexDirection: "column" }}
              ></Checkbox.Group>
            </Form.Item>
            <Form.Item
              label={<label className={styles.label_form}></label>}
              name="neededDocumentUpload"
              rules={[
                {
                  required: true,
                  message: "Please upload the file",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 16,
                span: 16,
              }}
            >
              <Space>
                <Button type="primary">Save</Button>
                <Button style={{ width: "5rem" }} type="primary">
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  );
}

export default FormC;
