import React ,{useEffect, useState } from "react";
import { useFirebase } from "../../contexts/Context";
import {Button,Form,Input,Space,DatePicker,InputNumber} from 'antd';

import TableData from "../TableData/index";
import { Col, Row, Slider } from 'antd';
export default function Expenses() {
    const[data,setData] = useState([])
    const{putBudget,ExpensesData} = useFirebase();
  
    const onFinish = (values) => {
      let dt = {
        amount:values.amount,
        type:values.type,
        month:values.month,
        name:values.name,
        category:'Expenses'
    }
      putBudget(dt);
    };

    useEffect(()=>{
        setData(ExpensesData);
    },[ExpensesData]);

    
    return (
      <>
      <Row style={{padding:"10px",background:"white",borderRadius:'8px'}}>
          <Col xs={24} xl={24} style={{padding:"10px"}}>
        <Form
          name="expense-form"
          onFinish={onFinish}
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          style={{ maxWidth: 800,rowGap:'10px' }}
          layout="inline"
        >
          <Form.Item label="Name">
            <Space>
              <Form.Item
                name="name"
                noStyle
                rules={[{ required: true, message: "name is required" }]}
              >
                <Input className="input-box" placeholder="Please input" />
              </Form.Item>
            </Space>
          </Form.Item>

          <Form.Item label="Type">
            <Space>
              <Form.Item
                name="type"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "type is required",
                  },
                ]}
              > 
                <Input
                  className="input-box"
                  placeholder="Please input type"
                />
              </Form.Item>
            </Space>
          </Form.Item>
       
          <Form.Item label="Amount">
            <Space>
              <Form.Item
                name="amount"
                noStyle
                rules={[
                  {
                    required: true,
                    type: "number",
                    message: "amount is required",
                    min:1,
                  },
                ]}
              >
                <InputNumber
                 placeholder="Please input amount" 
                  className="input-box"
                  style={{marginLeft:'10px'}}
                />
              </Form.Item>
            </Space>
          </Form.Item>


          <Form.Item
            label="Date"
            style={{
              marginBottom: 0,
              marginLeft:'15px',
              // background:'green'
            }}
          >
          <Space>
            <Form.Item
              name="month"
              rules={[
                {
                  required: true,
                  message:"Date is required."
                },
              ]}
              style={{
                display: "inline-block",
                width: "120px",
                  // margin: '0 8px',
                  // background:'green'
              }}
            >
              <DatePicker
                onChange={(date, dateString) => {
                }}
                className="input-box"
                
              />
            </Form.Item>
            
           </Space>
          </Form.Item>
  
          <Form.Item label=" " colon={false} style={{margin:"0 50px"}}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </Col>
  </Row>

        {
            data?<TableData data={data}/>:null
        }



      </>
    );
}
