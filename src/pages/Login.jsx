import React, { useEffect } from 'react'
import { Col, Row ,Button, Form, Input} from 'antd';
import { LockOutlined, UserOutlined,GoogleOutlined } from '@ant-design/icons';
import { Link,Navigate } from 'react-router-dom';
import Carousel from "../components/Carousel/index";

import { useFirebase } from '../contexts/Context';

export default function Login() {
  const { signInWithGoogle,isAuthenticated,signinUserUsingEmailPassword } = useFirebase();

  if(isAuthenticated){
    return <Navigate to={"/dashboard"} replace={true}/>
  }

  const onFinish = (values) => {
    document.cookie = "username=John Doe";
   signinUserUsingEmailPassword({email:values.email,password:values.password});
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
    justify={{xl:'space-between',sm:'flex-start'}}
    align={{xl:'middle',sm:'middle'}}
    className='custome-login-page-style' style={{margin: 0}}>
      <Col span={12} xs={24} sm={24} md={12} xl={12} lg={12} 
      style={{ background:"white", height:"450px", padding:'15px',  display:'flex', justifyContent:'center'}}>

    <div>
      <div style={{width:"100%",display:'flex',justifyContent:'center'}}>
        <div className="dot">
        <img src="./wired-flat-21-avatar.gif" alt=""/>
      </div>
    </div>

      <h1 style={{textAlign:'center'}}>Login</h1>

<Form
      name="normal_login"
      className="login-form"
      initialValues={{remember: true}}
      onFinish={onFinish}
      layout='vertical'>
      <Form.Item
        name="email"
        rules={[{
            required: true,
            message: 'Please input your email address!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />}
         placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >

<Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"/>

        {/* <Input
          
        /> */}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>

    <div style={{fontSize:"16px",textAlign:"center"}}>
          Don't have an account? <Link to="/signup">Signup</Link>
           <div className="line"></div>
     </div>
     <Button htmlType="submit" 
     className="login-with-google"
     onClick={signInWithGoogle}><GoogleOutlined /> Log in with Google </Button>
</div>

        </Col>
      <Col span={12} xs={24} sm={24} md={12} xl={12} lg={12} 
      style={{
        // border:'1px solid black',
      // background:"white",
      borderRadius:"0 8px 8px 8px"
    }} className="hidden-on-md-sm custome-login-page-style">


<Carousel/>
  
    </Col>
    </Row>
   </div>
  )
}