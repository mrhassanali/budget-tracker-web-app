import React , {useEffect, useState } from "react";
import { useFirebase } from "../../contexts/Context";
import {Button,Form,Input,Space,DatePicker,InputNumber } from 'antd';
import moment from "moment/moment";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export default function ModalForm({isModalContent}) {
    const[modalData,setModalData] = useState(isModalContent);
    const{updateRecord} = useFirebase();

    dayjs.extend(customParseFormat);


    useEffect(()=>{
        setModalData(isModalContent);
    },[isModalContent]);

    const onModalFinish = (values) => {
        // console.log("Received values of form: ", values);
        let dt = {
          key : modalData.key,
          amount:Number(values.modalAmount),
          type:values.modalType,
          date:values.modalDate.format('YYYY-MM-DD'),
          name:values.modalName,
          category: isModalContent.modalCategory,
          initialAmount:Number(isModalContent.modalAmount),
      }
      updateRecord(dt)
      // console.log("modal Data",dt);
      };
      

      const inputBoxStyle = {
        width:'180px',
        margin:'0 13px'
    }


  const handleDateValidator = (rule, value) => {
    // Implement your date validation logic here.
    // Check if the date matches with existing expenses and savings.
    // Return Promise.reject() if the date is not valid.
    // Return Promise.resolve() if the date is valid.
  };

  return (
    <>
        <Form name="modal-form"
          onFinish={onModalFinish}
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          style={{maxWidth: 800}}
          layout="horizontal"
          initialValues={{
            modalName    :isModalContent.modalName    ,
            modalType    :isModalContent.modalType    ,
            modalAmount  :isModalContent.modalAmount  ,
            modalCategory:isModalContent.modalCategory,
            modalDate: dayjs((isModalContent?isModalContent.modalDate:'2015-01-01'), 'YYYY-MM-DD'),
          }}>
          <Form.Item label="Name">
            <Space>
              <Form.Item
                name="modalName"
                noStyle
                rules={[{ required: true, message: "name is required" }]}>
                <Input style={inputBoxStyle} placeholder="Please input" />
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item label="Type">
            <Space>
              <Form.Item
                name="modalType"
                noStyle
                rules={[{required: true,message: "type is required"}]}>
                <Input style={inputBoxStyle}  placeholder="Please input" />
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item label="Amount">
            <Space>
              <Form.Item
                name="modalAmount"
                noStyle
                rules={[{required: true,message: "amount is required",}]}>
                <InputNumber
                  style={inputBoxStyle}
                />
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item
            label="Date"
            style={{
              marginBottom: 0,
            }}>
            <Form.Item
              name="modalDate"
              rules={[ { required: true, message: "Date is required"},]}
              style={{
                display: "inline-block",
                width: "110px"
              }}
            >
                {/* <DatePicker defaultValue={dayjs((isModalContent?isModalContent.modalDate:'2015-01-01'), 'YYYY-MM-DD')} format={'YYYY-MM-DD'} style={inputBoxStyle} /> */}

                <DatePicker
      format={'YYYY-MM-DD'}
      style={inputBoxStyle}
      disabled={true}
    />

            </Form.Item>
          </Form.Item>
  
          <Form.Item label=" " colon={false} style={{margin:"0 50px"}}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="primary" htmlType="reset" style={{margin:'0 2px'}}>
              Reset
            </Button>
          </Form.Item>
        </Form>
    </>
  )
}
