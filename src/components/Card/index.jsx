import React, { useState, useEffect } from "react";
import { Card, Row, Col, Badge } from "antd";
import { useFirebase } from "../../contexts/Context";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function index() {
  const [loading, setLoading] = useState(false);
  let { displayBudget } = useFirebase();

  const cardStyle = {
    fontWeight: 700,
    fontSize: "22px",
  };

  const handleLoadingChange = (enable) => {
    setLoading(enable);
  };

  useEffect(() => {
    setTimeout(() => {
      handleLoadingChange(true);
    }, 500);
  }, [displayBudget]);

  let cardBox = {
    boxShadow: `0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a`
  }
  return (
    <Row gutter={16} className="custom-card-class">
      <Col xs={24} sm={12} md={8} lg={6}>
        <Badge.Ribbon text="Balance">
          <Card title="Available Balance" size="small" style={cardBox}>
            <span className="ant-typography" style={cardStyle}>
              {loading ? (
                Number(displayBudget.Income) -
                Number(displayBudget.Expenses) -
                Number(displayBudget.Savings)
              ) : (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              )}
              {/* {Number(displayBudget.Income) - Number(displayBudget.Expenses)- Number(displayBudget.Savings)} */}
            </span>
          </Card>
        </Badge.Ribbon>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Badge.Ribbon text="Income" color="cyan">
          <Card title="Total Income" size="small" style={cardBox}>
            <div className="ant-typography" style={cardStyle}>
              {loading ? (
                Number(displayBudget.Income)
              ) : (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              )}

              {/* {Number(displayBudget.Income)} */}
            </div>
          </Card>
        </Badge.Ribbon>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Badge.Ribbon text="Expenses" color="#ff4069">
          <Card title="Total Expenses" size="small" style={cardBox}>
            <span className="ant-typography" style={cardStyle}>
              {loading ? (
                Number(displayBudget.Expenses)
              ) : (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              )}

              {/* {Number(displayBudget.Expenses)} */}
            </span>
          </Card>
        </Badge.Ribbon>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Badge.Ribbon text="Savings" color="green">
          <Card title="Total Savings" size="small" style={cardBox}>
            <span className="ant-typography" style={cardStyle}>
              {loading ? (
                Number(displayBudget.Savings)
              ) : (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              )}

              {/* {Number(displayBudget.Savings)} */}
            </span>
          </Card>
        </Badge.Ribbon>
      </Col>
    </Row>
  );
}
