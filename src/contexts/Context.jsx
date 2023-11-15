import React, { useState, createContext, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment/moment";
import { ref, set, onValue, push, remove } from "firebase/database";
import { app, db } from "../firebase/Firebase"; // Getting getDatabase(app), getFirebase(app)

const Firebase = createContext();
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);


// react-toastify notify

let successNotifyToast = (message) =>
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});
let errorNotifyToast = (message)=>toast.error(message, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
});
let warnNotifyToast = (message)=> toast.warn(message, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
});
let infoNotifyToast = (message)=> toast.info(message, {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
});

const Context = ({ children }) => {
  const [loginUser, setLoginUser] = useState([]);
  const [data, setData] = useState([]);
  const [username, setUserName] = useState("");
  const [SavingData, setSavingData] = useState([]);
  const [ExpensesData, setExpensesData] = useState([]);
  const [IncomeData, setIncomeData] = useState([]);
  const [dashboardFilterYear,setDashboardFilterYear] = useState();
  // const [dashboardFilterYear,setDashboardFilterYear] = useState(()=> (moment().year().toString()));
  const [totalYearData,setTotalYearData] = useState();
  const [isAuthenticated,setIsAuthenticated] = useState(false);

  const [displayBudget, setDisplayBudget] = useState({
    Income: null,
    Expenses: null,
    Savings: null,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginUser(user);
        const email = user.email.replace(/[@.]/g, "");
        setUserName(email);
        setIsAuthenticated(true);
        onValue(
          ref(db, `users/${username}/Income`),
          (snapshot) => {
            const incomeDataArray = [];
            snapshot.forEach((childSnapshot) => {
              const childKey = childSnapshot.key;
              const childData = childSnapshot.val();
              incomeDataArray.push({ key: childKey, ...childData });
            });
            setIncomeData(incomeDataArray);
          },
          {
            onlyOnce: false,
          }
        );

        onValue(
          ref(db, `users/${username}/Expenses`),
          (snapshot) => {
            const ExpensesArr = [];
            snapshot.forEach((childSnapshot) => {
              const childKey = childSnapshot.key;
              const childData = childSnapshot.val();
              ExpensesArr.push({ key: childKey, ...childData });
            });
            setExpensesData(ExpensesArr);
          },
          {
            onlyOnce: false,
          }
        );

        onValue(
          ref(db, `users/${username}/Savings`),
          (snapshot) => {
            const SavingsArr = [];
            snapshot.forEach((childSnapshot) => {
              const childKey = childSnapshot.key;
              const childData = childSnapshot.val();
              SavingsArr.push({ key: childKey, ...childData });
            });
            setSavingData(SavingsArr);
          },
          {
            onlyOnce: false,
          }
        );

        <Navigate to="/dashboard" replace={true} />;
      } else {
        setLoginUser(null);
        setUserName(null);
      }
    });
  }, [loginUser]);

  // Sign in with Google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (user) {
          successNotifyToast("Login Successfully");
          window.localStorage.setItem("user", JSON.stringify(user.uid));
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorMessage);
        errorNotifyToast(errorMessage);
      });
  };

  // Adding a New User Using Email & Password
  const createUserUsingEmailPassword = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoginUser(user);
        if (user) { successNotifyToast("User Register Successfully..."); }
      })
      .catch((error) => {
        const errorMessage = error.message;
        errorNotifyToast(errorMessage);
      });
  };

  // Signin User Using Email & Password through saved in firebase
  const signinUserUsingEmailPassword = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoginUser(user);
        successNotifyToast("Login Successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorMessage){
          errorNotifyToast("Wrong Credentials! \nCheck Email & Password");
        }
      });
  };

  // Fetching Income, Expense, Saving Data from users/username/[Income, Expense, Saving]
  useEffect(() => {
    const starCountRef = ref(db, `users/${username}`);
    onValue(starCountRef, (snapshot) => {
      setData(snapshot.val());
    });
  }, [IncomeData, ExpensesData, SavingData]);

  // Put Data income,expenses & Savings
  const putBudget = ({ name, type, amount, month, category }) => {
    const date = month.format("YYYY-MM-DD");
      // 1. First Check user Add Month Saving is available or not
      // 2. Second Check the balence (Income) of the user Add month is avilable or not
      // let dd = moment(IncomeData[0].date).format('MM') < moment().format('MM');

      let thisMonthIncome = 0;
      let thisMonthExpenses = 0;
      let thisMonthSavings = 0;

      if(IncomeData){
          for(var key in IncomeData){
            const incomeDate = moment(IncomeData[key].date);
            const monthValidation = incomeDate.month() === moment(date).month();
            const yearValidation = incomeDate.year() === moment(date).year();
            if(monthValidation && yearValidation){
              thisMonthIncome += IncomeData[key].amount;
            }
         }
      }
      if(ExpensesData){
        for(var key in ExpensesData){
          const expenseDate = moment(ExpensesData[key].date);
          let monthValidation = expenseDate.month() === moment(date).month();
          let yearValidation = expenseDate.year() === moment(date).year();

          if(monthValidation && yearValidation){
            thisMonthExpenses += ExpensesData[key].amount;
          }
        }
      }
      if(SavingData){
         thisMonthSavings = 0;
        for(var key in SavingData){
          const savingDate = moment(SavingData[key].date);
          let monthValidation = savingDate.month() === moment(date).month();
          let yearValidation = savingDate.year() === moment(date).year();
        //  console.log(moment(month).year())
          if(monthValidation && yearValidation){
            thisMonthSavings += SavingData[key].amount;
            // console.log(SavingData[key])
          }
          // console.log(moment(date).year())
      }
    }
    if (category === "Expenses") {
        if (thisMonthIncome - (thisMonthExpenses + thisMonthSavings) >= amount) {
            const postListRef = ref(db, `users/${username}/${category}`);
            const newPostRef = push(postListRef);
            set(newPostRef, {name,type,amount,date,category});
            successNotifyToast("Expense Add Successfully");
        }else if(thisMonthIncome !=0 && thisMonthExpenses !=0 && thisMonthSavings !=0){
            warnNotifyToast("This Month or Year Income Balence is Not Available")
          }
          else{
          errorNotifyToast("Check Income if Income is Available of this Year + Month then You can Only Add Maximum Expenses Amount");
        }
  
      }else if (category === "Savings") {
        // console.log({thisMonthIncome,thisMonthSavings,thisMonthExpenses})

        if((thisMonthIncome - (thisMonthExpenses + thisMonthSavings)) >= amount) {
          const postListRef = ref(db, `users/${username}/${category}`);
          const newPostRef = push(postListRef);
          set(newPostRef, {name,type,amount,date,category});
          successNotifyToast("Saving Add Successfully")
        }else if(thisMonthIncome !=0 && thisMonthExpenses !=0 && thisMonthSavings !=0){
          warnNotifyToast("This Month or Year Income Balence is Not Available")
        }else{
          errorNotifyToast("Current Month Income Balence is Low");
        }
    } else {
        const postListRef = ref(db, `users/${username}/${category}`);
        const newPostRef = push(postListRef);
        set(newPostRef, {name,type,amount,date,category,});
        successNotifyToast("Record Added Successfully")
    }
  };

  // Update Data
  const updateRecord = ({amount, category, key, name, type, date,initialAmount}) => {
    if (!username) {
      return <Navigate to="/" replace={true} />;
    }
    // 1. First Check user Add Month Saving is available or not
    // 2. Second Check the balence (Income) of the user Add month is avilable or not
    // let dd = moment(IncomeData[0].date).format('MM') < moment().format('MM');
    let thisMonthIncome = 0;
    let thisMonthExpenses = 0;
    let thisMonthSavings = 0;

      if(IncomeData){
        // console.log(IncomeData)
            for(var item in IncomeData){
              const incomeDate = moment(IncomeData[item].date);
              let monthValidation = incomeDate.month() === moment(date).month();
              let yearValidation = incomeDate.year() === moment(date).year();
  
              if(monthValidation && yearValidation){
                thisMonthIncome += IncomeData[item].amount;
              }
          }
      }
      if(ExpensesData){
          for(var item in ExpensesData){
            const expenseDate = moment(ExpensesData[item].date);
            let monthValidation = expenseDate.month() === moment(date).month();
            let yearValidation = expenseDate.year() === moment(date).year();

            if(monthValidation && yearValidation){
              thisMonthExpenses += ExpensesData[item].amount;
            }
          }
      } 
      if(SavingData){
          for(var item in SavingData){
            const savingDate = moment(SavingData[item].date);
            let monthValidation = savingDate.month() === moment(date).month();
            let yearValidation = savingDate.year() === moment(date).year();

            if(monthValidation && yearValidation){
              thisMonthSavings += SavingData[item].amount;
            }
            // console.log("Savings "+thisMonthSavings);
          }
    }

    // console.log({thisMonthIncome,thisMonthSavings,thisMonthExpenses})

    if (category === "Expenses") {
        let expenseValidation = thisMonthIncome - ((thisMonthExpenses - initialAmount)+thisMonthSavings);
           if (expenseValidation >= amount) {
            const postListRef = ref(db, `users/${username}/${category}/${key}`);
            set(postListRef, { name, type, amount, date, category });
            successNotifyToast("Expenses Updated Successfully")
            // console.log({thisMonthIncome,thisMonthSavings,thisMonthExpenses});
          } else {
            errorNotifyToast("You can Only Update Maximum Expenses Amount")
          }
    } else if (category === "Savings") {
        let savingValidation = thisMonthIncome - (((thisMonthSavings - initialAmount)+thisMonthExpenses));
        if (savingValidation >= amount) {
            const postListRef = ref(db, `users/${username}/${category}/${key}`);
            set(postListRef, { name, type, amount, date, category });
            successNotifyToast("Saving Add Successfully");
          }else {
            errorNotifyToast("Your current balence is Less");
        }
    }else if (category === "Income") {
      let validationData = (thisMonthIncome - (initialAmount)) + amount;
      if (validationData >= (thisMonthExpenses + thisMonthSavings)) {
            const postListRef = ref(db, `users/${username}/${category}/${key}`);
            set(postListRef, { name, type, amount, date, category });
            successNotifyToast("Income Add Successfully");
        } else {
          errorNotifyToast("Record Not Updated because Income < expenses + saving");
         }
    }
  };

  // Delete Data
  const deleteRecord = ({ category, key,amount,date }) => {
    if (!username) {
      return <Navigate to="/" replace={true} />;
    }


    let thisMonthIncome = 0;
    let thisMonthExpenses = 0;
    let thisMonthSavings = 0;

      if(IncomeData){
        // console.log(IncomeData)
            for(var item in IncomeData){
              const incomeDate = moment(IncomeData[item].date);
              let monthValidation = incomeDate.month() === moment(date).month();
              let yearValidation = incomeDate.year() === moment(date).year();
  
              if(monthValidation && yearValidation){
                thisMonthIncome += IncomeData[item].amount;
              }
          }
      }
      if(ExpensesData){
          for(var item in ExpensesData){
            const expenseDate = moment(ExpensesData[item].date);
            let monthValidation = expenseDate.month() === moment(date).month();
            let yearValidation = expenseDate.year() === moment(date).year();

            if(monthValidation && yearValidation){
              thisMonthExpenses += ExpensesData[item].amount;
            }
          }
      } 
      if(SavingData){
          for(var item in SavingData){
            const savingDate = moment(SavingData[item].date);
            let monthValidation = savingDate.month() === moment(date).month();
            let yearValidation = savingDate.year() === moment(date).year();

            if(monthValidation && yearValidation){
              thisMonthSavings += SavingData[item].amount;
            }
            // console.log("Savings "+thisMonthSavings);
          }
    }

    // console.log({thisMonthIncome,thisMonthSavings,thisMonthExpenses})

    if(category === "Income"){
       if((thisMonthIncome-amount) >= (thisMonthExpenses + thisMonthSavings)){
            let chatRef = ref(db, `users/${username}/${category}/${key}`);
              remove(chatRef);
              warnNotifyToast("Record Deleted Successfully");
      }else{
              infoNotifyToast('Record Not Deleted because saving + expenses is greater');
        }
    }else{
        let chatRef = ref(db, `users/${username}/${category}/${key}`);
        remove(chatRef);
        warnNotifyToast("Record Deleted Successfully");
      }
  };

  //Logout User Function
  const signoutUser = () => {
    signOut(auth)
      .then(() => {
        // console.log("user Logged out..");
        localStorage.removeItem("user");
        setData([]);
        setLoginUser(null);
        infoNotifyToast("User Logout Successfully");
        setIsAuthenticated(false);
      })
      .catch((error) => {
        confirm.log(error);
        errorNotifyToast(error);
      });
  };

  // Check User is Login or not
  // const isAuthenticated = loginUser ? true : false;

  // Set the Total Income, Total Expenses, Total Savings are Added
  useEffect(() => {
   if(data){
    const calculateTotal = (data) => {
      let totalAmount = 0;
      for (const entryId in data) {
        totalAmount += Number(data[entryId].amount);
      }
      return totalAmount;
    };
      let totalIncome = calculateTotal(data.Income);
      let totalExpenses = calculateTotal(data.Expenses);
      let totalSavings = calculateTotal(data.Savings);
      setDisplayBudget({
        Income: totalIncome,
        Expenses: totalExpenses,
        Savings: totalSavings,
      });

      if(IncomeData){
        let abc = new Set();
        for(var i=0; i<IncomeData.length; i++){
          let dd = (IncomeData[i].date).split("-")[0];
          abc.add(dd);
        }
        let myArr = Array.from(abc);
        myArr.sort((a,b)=>b-a);
        setTotalYearData(myArr);
        setDashboardFilterYear(myArr[0])
        // console.log(myArr)
      }

    
   }
  }, [data]);


  return (
    <>
      <Firebase.Provider
        value={{
          signInWithGoogle,loginUser,
          putBudget,updateRecord,deleteRecord,
          setLoginUser,
          data,setData,IncomeData,ExpensesData,SavingData,
          createUserUsingEmailPassword,
          signinUserUsingEmailPassword,
          signoutUser,
          displayBudget,
          dashboardFilterYear,setDashboardFilterYear,
          totalYearData,isAuthenticated
        }}
      >
        {children}
      </Firebase.Provider>
    </>
  );
};
export default Context;
// 04 : Export the context
export { Firebase, auth };

// Export a custom hook to access the context
export function useFirebase() {
  return useContext(Firebase);
}
