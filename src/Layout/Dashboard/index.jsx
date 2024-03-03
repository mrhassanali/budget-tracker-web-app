import React, { useEffect, useState } from "react";
import { useFirebase } from "../../contexts/Context";
import Card from "../../components/Card/index";
import BarChart from "../../components/Chart/BarChart";
import PieChart from "../../components/Chart/PieChart";

import { useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import {Button,Layout,Menu,theme,Col,Row,Select} from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
const { Footer, Header, Content, Sider } = Layout;




const Dashboard = () => {
  const ref = useRef(null);
  const { signoutUser,totalYearData,dashboardFilterYear,setDashboardFilterYear,checkLogin,user}=useFirebase();
  const [loadings, setLoadings] = useState([]);
  const [selectYear,setSelectYear] = useState([]);
  const location = useLocation();
  const { token: { colorBgContainer }, } = theme.useToken();


  const sidebarMenueItem = [
    {
      icon: React.createElement(UserOutlined),
      label: `Dashboard`,
      path: `/dashboard`,
    },
    {
      icon: React.createElement(VideoCameraOutlined),
      label: `Income`,
      path: `/dashboard/income`,
    },
    {
      icon: React.createElement(UploadOutlined),
      label: `Expenses`,
      path: `/dashboard/expenses`,
    },
    {
      icon: React.createElement(UserOutlined),
      label: `Savings`,
      path: `/dashboard/savings`,
    },
  ];

  // Loading Button
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };

  useEffect(() => {
    ref.current.complete();
  }, [location]);

  useEffect(() => {
    if (totalYearData) {
      let myArrObj = [];
      for (var i = 0; i < totalYearData.length; i++) {
        myArrObj.push({
          value: totalYearData[i],
          label: totalYearData[i],
        });
      }
      myArrObj.sort((a,b)=>b.value - a.value);
      setSelectYear(myArrObj);
    }

    // console.log((totalYearData.sort((a, b) => b - a)[0]));
  }, [totalYearData]);


  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            height: "32px",
            margin: "16px",
            background: "rgba(255,255,255,.2)",
            borderRadius: "6px",
          }}
        >
          <h1 style={{ color: "white", textAlign: "center" }}>Budget App</h1>
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["5"]}>
          {sidebarMenueItem.map((current, index) => (
            <Menu.Item key={String(index + 1)}>
              <Link to={current.path}>
                {current.icon} {current.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <LoadingBar color="#f11946" ref={ref} height={2} />
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "Flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            icon={<PoweroffOutlined />}
            loading={loadings[1]}
            onClick={() => {
              enterLoading(1);
              signoutUser();
              return <Navigate to="/" replace={true} />;
            }}
            style={{ margin: "10px" }}
          >
            Logout
          </Button>
        </Header>
        <Content
          style={{
            margin: "15px 16px 0",
          }}
        >
          <div
            style={{
              padding: 8,
              minHeight: 400,
              height: "90%",
              borderRadius: "8px",
            }}
          >
            {location.pathname === "/dashboard" && (
              <>
                <Card />
                <>
                  <Row style={{ marginTop: "5px" }}>
                    <Col xs={24} xl={24} style={{ padding: "8px" }}>
                      <Select
                        // defaultValue={selectYear?selectYear[0]:moment().year()}
                        defaultValue={dashboardFilterYear}
                        value={dashboardFilterYear}
                        style={{ width: 120, float: "right" }}
                        onChange={(value) => {
                          // console.log(`selected ${value}`);
                          setDashboardFilterYear(value);
                        }}
                        options={selectYear}
                      />
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "5px" }} gutter={[0, 12]}>
                    <Col
                      xs={24}
                      xl={12}
                      style={{
                        borderRadius: "8px",
                        backgroundColor: "white",
                        boxShadow: "0 4px 6px rgba(0,0,0,.12156862745098039)",
                        height: "330px",
                        width: "100%",
                      }}
                    >
                      <BarChart />
                    </Col>
                    <Col
                      xs={24}
                      xl={12}
                      style={{
                        borderRadius: "8px",
                        backgroundColor: "white",
                        boxShadow: "0 4px 6px rgba(0,0,0,.12156862745098039)",
                        height: "330px",
                        width: "100%",
                      }}
                    >
                      <PieChart />
                    </Col>
                  </Row>
                </>
              </>
            )}
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{textAlign: 'center'}}>
          Budget App ©2023 Created by Hassan Ali
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
