import React from 'react'
import { Col, Row, Button, Form, Input } from 'antd';
import { useFirebase } from '../contexts/Context';
import {GoogleOutlined } from '@ant-design/icons';
import { Link ,Navigate} from 'react-router-dom';
import Carousel from "../components/Carousel/index";

export default function Signup() {  
  
const {signInWithGoogle,createUserUsingEmailPassword,isAuthenticated} = useFirebase();
if(isAuthenticated){
  return <Navigate to={"/dashboard"} replace={true}/>
 }

 
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const {email,password} = values;
    createUserUsingEmailPassword({email,password});
  };


  return (
    <div style={{
      margin:0,
      height:'100vh',
    display:'flex',
    justifyContent:'center',
    alignItems:"center",
    // background:"green",

    }}>

   <Row 
    // gutter={[8, 8]} 
    justify="space-between" 
    align="middle"
    className='custome-login-page-style' style={{margin: 0}}>
    <Col span={12} xs={24} sm={24} md={24} xl={12} lg={12} 
        style={{
            padding:"10px",
            display:'flex',
            justifyContent:'center',
            // background:'green'
          }} className='login-signup-col-size'>
        <div>
            <div style={{width:"100%",display:'flex',justifyContent:'center'}}>
              <div className="dot">
                <img src="./wired-flat-21-avatar.gif" alt=""/>
              </div>
            </div>
            <h1 style={{textAlign:'center'}}>Signup</h1>
            <Form form={form} name="register" onFinish={onFinish}
            layout='vertical'
            style={{
              width:'400px',
            maxWidth: 350,
            // backgroundColor:"#f3f3f3",
            padding:"8px 30px"
            }}
            scrollToFirstError>

            <Form.Item
              name="email"
              // label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input placeholder="Enter Email Address"/>
            </Form.Item>

            <Form.Item
              name="password"
              // label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Password"/>
            </Form.Item>

            <Form.Item
              name="confirm"
              // label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder='Confirm Password'/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Register
              </Button>
            </Form.Item>
            <div style={{fontSize:"16px",textAlign:"center"}}>
              Already have an account? <Link to="/">Login</Link>
              </div>

            </Form>
            
            <div className="line" style={{width:"70%",margin:"14px auto"}}></div>
              <Button htmlType="submit" className="login-with-google" 
              onClick={signInWithGoogle}
              style={{width:"70%",margin:"auto"}}>
          <GoogleOutlined />
            Signup with Google
            </Button>
        </div>
    </Col>
      <Col span={12} xs={24} sm={24} md={12} xl={12} lg={12} 
      style={{
        // border:'1px solid black',
      borderRadius:"0 8px 8px 0"
    }} 
    className="hidden-on-md-sm custome-login-page-style">


<Carousel/>
  
    </Col>
    </Row>
   </div>
  )
}
