import React, { useEffect,useState } from "react";

import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useFirebase } from "../../contexts/Context";
export default function BarChart() {
  const { IncomeData,ExpensesData,SavingData,
    dashboardFilterYear} = useFirebase();
  const [income, setIncome] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [expense, setExpense] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [savings, setSavings] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    if (IncomeData) {
      const updatedIncome = [...income];
      updatedIncome.fill(0); // Reset the array to zero

      let incomeFilterData = IncomeData.filter((item)=>{
        return ((item.date.split("-")[0]) == dashboardFilterYear)
       });

       incomeFilterData.forEach((item) => {
        const date = new Date(item.date);
        const monthNumeric = date.getMonth();
        updatedIncome[monthNumeric] += item.amount;
      });
      setIncome(updatedIncome);
      // console.log(incomeFilterData)
    }

    if (ExpensesData) {
      const updatedExpense = [...expense];
      updatedExpense.fill(0);

      let expenseFilterData = ExpensesData.filter((item)=>{
        return ((item.date.split("-")[0]) == dashboardFilterYear)
       });

       expenseFilterData.forEach((item) => {
        const date = new Date(item.date);
        const monthNumeric = date.getMonth();
        updatedExpense[monthNumeric] += item.amount;
      });
      setExpense(updatedExpense);
    }

    if (SavingData) {
      const updatedSavings = [...savings];
      updatedSavings.fill(0);

      let savingFilterData = SavingData.filter((item)=>{
        return ((item.date.split("-")[0]) == dashboardFilterYear)
       });

       savingFilterData.forEach((item) => {
        const date = new Date(item.date);
        const monthNumeric = date.getMonth();
        updatedSavings[monthNumeric] += item.amount;
      });
      setSavings(updatedSavings);
    }
  }, [IncomeData,ExpensesData,SavingData,dashboardFilterYear]);


  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Monthly Income",
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
        data: income,
      },
      {
        label: "Monthly Expenses",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: expense,
      },
      {
        label: "Monthly Savings",
        backgroundColor: "green",
        borderColor: "rgb(255, 99, 132)",
        data: savings,
      },
    ],
  };
  return (
    <>
    <div 
    className="chart-container bar-chart" style={{
      position: "relative", 
      height:"100%",
      width:"100%",
      background:'transparent',
      padding:'20px'
      }}
      >
      <Bar data={data} />
    </div>
    </>
  );
}
