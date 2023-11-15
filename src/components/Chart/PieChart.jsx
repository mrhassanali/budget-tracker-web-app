import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { useFirebase } from "../../contexts/Context";

export const options = {
  // title: "Budget Management Web App",
  backgroundColor: 'transparent',
  // backgroundColor: 'white',
  // chartArea:{left:0,top:0,width:"100%",height:"100%"},
  // height: 310,
  // width: 500,
  // display:'flex',
  // justifyContent:'center'
  slices: [{color: '#ff4069'}, {color: '#52c41a'}, {color: '#13c2c2'}, {color: 'blue'}],
  legend: 'bottom', alignment: 'center',
  
};

export default function PieChart() {
  const [pieData, setPieData] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalSavings, setTotalSaving] = useState(0);

  const { IncomeData,ExpensesData,SavingData, dashboardFilterYear } = useFirebase();

  useEffect(() => {
    if (IncomeData) {
      setTotalIncome(0);
      let dt = IncomeData.filter((item) => {
        return item.date.split("-")[0] == dashboardFilterYear;
      });
      let sum = 0;
      for (var i = 0; i < dt.length; i++) {
        sum += dt[i].amount;
      }
      setTotalIncome(sum);
    }


    if (ExpensesData) {
      setTotalExpense(0);
      let dt = ExpensesData.filter((item) => {
        return item.date.split("-")[0] == dashboardFilterYear;
      });
      let sum = 0;
      for (var i = 0; i < dt.length; i++) {
        sum += dt[i].amount;
      }
      // console.log(dt)
      setTotalExpense(sum);
    }


    if (SavingData) {
      setTotalSaving(0);
      let dt = SavingData.filter((item) => {
        return item.date.split("-")[0] == dashboardFilterYear;
      });
      let sum = 0;
      for (var i = 0; i < dt.length; i++) {
        sum += dt[i].amount;
      }
      setTotalSaving(sum);
    }


  }, [IncomeData,ExpensesData,SavingData, dashboardFilterYear]);

  

  useEffect(() => {
    if(totalIncome !=0){
      setPieData([
        ["Task", "Hours per Day"],
        ["Expenses", Number(totalExpense)],
        ["Savings", Number(totalSavings)],
        ["Income", Number(totalIncome)],
        ["Balence",(Number(totalIncome) - (Number(totalExpense)+Number(totalSavings)))],
      ]);
    }
  }, [totalIncome,totalExpense,totalSavings,dashboardFilterYear]);

  return (
    <>
      {totalIncome !=0 ? (
    <Chart
          chartType="PieChart"
          data={pieData}
          options={options}
          width={"100%"}
          height={"100%"}
        />
      ) : null}
    </>
  );
}
