import React, { useState } from "react";
import styles from "./FormC.module.css";
import {
  Space,
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Typography,
  Image,
  message,
  Upload,
  Divider,
} from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";

import validator from "validator";
import logo from "../../assets/easytaxes_logo.png";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function FormC() {
  const { Title, Text } = Typography;
  const { Dragger } = Upload;
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState({ value: "" });
  const [filedReturn, setFiledReturn] = useState(null);
  const [sCorp, setSCorp] = useState(null);
  const [ownershipAlter, setOwnershipAlter] = useState(null);
  const [transactionsType, setTransactionsType] = useState([]);
  const [documentsNeedUpld, setDocumentsNeedUpld] = useState([]);

  // Drag and drop
  // /////////////////////

  const props = {
    name: "file",
    multiple: true,
    accept: ".pdf",
    // maxCount: 1,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  // //////////////////
  // Drag and drop End

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

  function handleClickBack(e) {
    setStep(step - 1);
  }

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
              wrapperCol={{
                span: 24,
              }}
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
              {/* <Input disabled={filedReturn === "Yes" ? false : true} /> */}
              <Dragger
                disabled={filedReturn === "Yes" ? false : true}
                {...props}
              >
                <p className="ant-upload-drag-icon">
                  <CloudUploadOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                {/* <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p> */}
              </Dragger>
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
              wrapperCol={{
                span: 24,
              }}
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
              {/* <Input
                disabled={
                  filedReturn === "Yes" && sCorp === "Yes" ? false : true
                }
              /> */}
              <Dragger
                disabled={
                  filedReturn === "Yes" && sCorp === "Yes" ? false : true
                }
                {...props}
              >
                <p className="ant-upload-drag-icon">
                  <CloudUploadOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                {/* <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p> */}
              </Dragger>
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
              wrapperCol={{
                span: 24,
              }}
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
              {/* <Input disabled={ownershipAlter === "Yes" ? false : true} /> */}
              <Dragger
                disabled={ownershipAlter === "Yes" ? false : true}
                {...props}
              >
                <p className="ant-upload-drag-icon">
                  <CloudUploadOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                {/* <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p> */}
              </Dragger>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 16,
                span: 16,
              }}
            >
              <Space>
                <Button
                  className={`${styles.btn} ${styles.btn_color}`}
                  type="primary"
                >
                  Save
                </Button>
                <Button
                  style={{ width: "5rem" }}
                  onClick={handleNext}
                  className={`${styles.btn} ${styles.btn_color}`}
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
              wrapperCol={{
                span: 24,
              }}
              label={
                <label className={styles.label_form}>
                  Upload the Document for the same
                </label>
              }
              name="transactionDocument"
            >
              {/* <Input /> */}
              <Dragger
                disabled={transactionsType.length === 0 ? true : false}
                {...props}
              >
                <p className="ant-upload-drag-icon">
                  <CloudUploadOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                {/* <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p> */}
              </Dragger>
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
              wrapperCol={{
                span: 24,
              }}
              label={<label className={styles.label_form}></label>}
              name="neededDocumentUpload"
              rules={[
                {
                  required: true,
                  message: "Please upload the file",
                },
              ]}
            >
              {/* <Input /> */}
              <Dragger
                disabled={documentsNeedUpld.length === 0 ? true : false}
                {...props}
              >
                <p className="ant-upload-drag-icon">
                  <CloudUploadOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                {/* <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p> */}
              </Dragger>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                // offset: 16,
                span: 24,
              }}
              label={
                <label>
                  <Text>
                    Please complete the payment.We will prepare the draft tax
                    return within 48hours!
                  </Text>
                </label>
              }
            >
              <div className={styles.easytaxes_payment_box}>
                <Checkbox checked disabled />
                <div className={styles.easytaxes_payment}>
                  <div className={styles.easytaxes_payment_logo}>
                    <Image preview={false} src={logo} width={"80px"} />
                    <Text strong className={styles.easytaxes_payment_text}>
                      Easytaxes
                    </Text>
                  </div>
                  <Text strong className={styles.easytaxes_payment_text}>
                    $349
                  </Text>
                </div>
              </div>
            </Form.Item>
            {/* <Form.Item>
            </Form.Item> */}
            <Divider />
            <div className={styles.coupan_box}>
              <Form.Item
                wrapperCol={{
                  span: 24,
                }}
                label="Enter Cuopan"
              >
                <Input style={{ width: "30%", marginRight: "8px" }} />
                <Button className={styles.btn} type="primary">
                  Apply
                </Button>
              </Form.Item>
              <div className={styles.coupan_total}>
                <Text strong>Total</Text>
                <Text strong>$0</Text>
              </div>
            </div>
            <Divider />
            <Form.Item
              wrapperCol={{
                // offset: 16,
                span: 24,
              }}
            >
              <div className={styles.modal_actions}>
                <div className={styles.modal_back}>
                  <Button
                    onClick={handleClickBack}
                    className={`${styles.btn} ${styles.btn_color}`}
                    type="primary"
                  >
                    Back
                  </Button>
                </div>
                <div className={styles.modal_submit}>
                  <Button
                    className={`${styles.btn} ${styles.btn_color}`}
                    type="primary"
                  >
                    Save
                  </Button>
                  <Button
                    style={{ width: "5rem" }}
                    className={`${styles.btn} ${styles.btn_color}`}
                    type="primary"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  );
}

export default FormC;
