import React,{useEffect, useState} from 'react'
import {Button,Space,Table,Modal} from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ModalForm from "../ModalForm/ModalForm";
import { useFirebase } from '../../contexts/Context';
import { useLocation } from 'react-router-dom';

export default function index({data}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalContent, setIsModalContent] = useState();
  const [loading, setLoading] = useState(false);
  const { putBudget, deleteRecord } = useFirebase();
  let location = useLocation();


  const showModal = (record) => {
    setIsModalOpen(true);
    let db = {
      modalAmountamount:record.amount,
      modalCategory:record.category,
      modalDate:record.date,
      modalAmount:`${Number(record.amount)}`,
      key:record.key,
      modalName:record.name,  
      modalType :record.type
  }
    setIsModalContent(db);
    // console.log(record);
    // console.log(db);
  };


  const handleOk = () => {
    setIsModalContent(null);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalContent(null);
    setIsModalOpen(false);
  };

  const handleLoadingChange = (enable) => {
    setLoading(enable);
  };


 

  const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        sorter: (a, b) => a.amount - b.amount,
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        responsive: ["sm"]
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        responsive: ["sm"],
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button
              type="primary"
              icon={<EditOutlined />}
              size={"medium"}
              onClick={() => {
                showModal(record);
              }}
            >
              Edit
            </Button>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              size={"medium"}
              onClick={() => {
                deleteRecord({ 
                  category: 
                  record.category, 
                  key: record.key,
                  amount:record.amount,
                  date:record.date,
                 });
              }}
            >
              Delete
            </Button>
          </Space>
        ),
      },
    ];


useEffect(()=>{
  setTimeout(()=>{
    handleLoadingChange(false);
  },330);
  handleLoadingChange(true);
},[location]);

    const tableProps = {loading};

  return (
    <>
     <Table
     {...tableProps}
          columns={columns}
          dataSource={data?data:[]}
          style={{ margin: "16px 4px", 
          padding: "8px",
          background:"white",borderRadius:"5px" }}
          pagination={{ pageSize: 3}}
        />

  <Modal
        title="Income"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
    destroyOnClose={true}
      >
        {isModalOpen && <ModalForm isModalContent={isModalContent} />}
      </Modal>
    </>
  )
}
