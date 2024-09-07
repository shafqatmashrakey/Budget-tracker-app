'use client';
import React from 'react';
import Pie from '@/components/dashboard/pie';
import { createClient } from "@/utils/supabase/client";
import { useState,useEffect } from 'react'
import { getProfile_Income,getProfile_Balance,getProfile_id,getPaymentData} from '../../lib/dbfunctions'



const data = [
    {
      "id": "elixir",
      "label": "elixir",
      "value": 1000,
      "color": "hsl(333, 70%, 50%)"
    },
    {
      "id": "haskell",
      "label": "haskell",
      "value": 81,
      "color": "hsl(317, 70%, 50%)"
    },
    {
      "id": "stylus",
      "label": "stylus",
      "value": 292,
      "color": "hsl(233, 70%, 50%)"
    },
    {
      "id": "css",
      "label": "css",
      "value": 75,
      "color": "hsl(140, 70%, 50%)"
    },
    {
      "id": "javascript",
      "label": "javascript",
      "value": 15,
      "color": "hsl(249, 70%, 50%)"
    }
  ];




const Dashboard = () => {


const supabase = createClient();
const [user, setUser] = useState(null); 
const [customer_id, setCustomer_id] = useState(null);
const [paymentData, setPaymentData] = useState([]);
const [totalPrice, setTotalPrice] = useState(0); // State to hold the total price
const [currentDate, setCurrentDate] = useState(new Date()); // State to hold the current date
const [currentendDate, setCurrentEndDate] = useState(new Date()); // State to hold the current date
const [paymentMaps, setPaymentMaps] = useState([]);
const [balance, setBalance] = useState(" ");
const [income, setIncome] = useState(" ");


useEffect(() => {
  const fetchUserData = async () => {
    try {
      const { data } = await supabase.auth.getUser();
      setUser(data.user.id); // Update user state with fetched user data
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchUserData();
}, []);

console.log("USER:", user)

useEffect(() => {
  const fetchCustomerData = async () => {
    try {
      
      const profileId = await getProfile_id(supabase, user);
      
      console.log("Profile:", profileId);
      setCustomer_id(profileId);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchCustomerData();
}, [user]);
console.log("customerID:", customer_id);

useEffect(() => {
  const fetchIncomeData = async () => {
    try {
      
      const profileBalance = await getProfile_Balance(supabase, user);
      const profileIncome = await getProfile_Income(supabase, user);
      console.log("Profile Balance:",profileBalance[0].balance);
      setBalance(profileBalance[0].balance);
      setIncome(profileIncome[0].income);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchIncomeData();
}, [user]);

useEffect(() => {
  const nextMonthDate = new Date(currentDate);
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
  setCurrentEndDate(nextMonthDate);
}, [currentDate]);


useEffect(() => {
  const fetchPaymentCategories = async () => {
    try {
      const paymentData = await getPaymentData(supabase, customer_id);
      setPaymentData(paymentData);
    } catch (error) {
      console.error('Error fetching payment categories:', error);
    }
  };

  if (customer_id) {
    fetchPaymentCategories();
  }
}, [customer_id]);
console.log("ALL PAYMENTS: ",paymentData);
console.log("Total :", totalPrice);
console.log(currentDate.toDateString());



console.log(currentendDate.toDateString());

useEffect(() => {
  const calculatePaymentsMaps = () => {
    const newPaymentMaps = [];

    paymentData.forEach((payment) => {
      console.log("Processing payment: ", payment);
      const newPaymentMap = new Map();
      const { price, started_at, end_at, time, category } = payment;
      const startDate = new Date(started_at);
      console.log("Start Date: ",startDate)
      //const endDate = new Date(end_at);
      const endDate = end_at === 'Never' 
          ? 'Never' 
          : end_at.includes('After') 
          ? end_at 
          : new Date(end_at);
      console.log("End Date: ", endDate);
      console.log("TIME: ",time);

      if(time.includes('Every') && time.includes('days') && endDate == 'Never') {
        const interval = parseInt(time.split(' ')[1]);
        
        let paymentDate = new Date(startDate);
        paymentDate.setDate(paymentDate.getDate() + 1);
        console.log("START DATE for 1st: ", paymentDate);

        while (paymentDate <= currentendDate) {
          paymentDate.setDate(paymentDate.getDate() + interval);
          console.log("For Days: ",paymentDate);
          if (paymentDate >= currentDate){
            newPaymentMap.set(paymentDate.toDateString(), price);
          }
          
          
        }

      }
      else if(time.includes('Every') && time.includes('weeks') && endDate == 'Never') {
        const interval = parseInt(time.split(' ')[1]);
        const total = interval*7 
        let paymentDate = new Date(startDate);
        paymentDate.setDate(paymentDate.getDate() + 1);
        console.log("START DATE for 2nd: ", paymentDate);

        while (paymentDate <= currentendDate) {
          paymentDate.setDate(paymentDate.getDate() + total);
          console.log("For weeks: ",paymentDate);
          if (paymentDate >= currentDate && paymentDate<=currentendDate){
          newPaymentMap.set(paymentDate.toDateString(), price);
          }
        }

      }
      else if(time.includes('Every') && time.includes('months') && endDate == 'Never') {
        const interval = parseInt(time.split(' ')[1]);
        
        let paymentDate = new Date(startDate);
        paymentDate.setDate(paymentDate.getDate() + 1);
        console.log("START DATE for 3rd: ", paymentDate);

        while (paymentDate <= currentendDate) {
          paymentDate.setMonth(paymentDate.getMonth() + interval);

          if (paymentDate >= currentDate && paymentDate<=currentendDate){
          newPaymentMap.set(paymentDate.toDateString(), price);
          
          }
        }

      }

      else if (time.includes('Every') && time.includes('days') && endDate.toString().includes('After') ) {
        const interval = parseInt(time.split(' ')[1]);
        const endinterval= parseInt(endDate.split(' ')[1]);
        let paymentDate = new Date(startDate);
        paymentDate.setDate(paymentDate.getDate() + 1);
        console.log("START DATE for 4th: ", paymentDate);

        for (let i = 0; i < endinterval; i++) {

          while (paymentDate <= currentendDate) {
            paymentDate.setDate(paymentDate.getDate() + interval);

          if (paymentDate >= currentDate && paymentDate<=currentendDate ) {
              newPaymentMap.set(paymentDate.toDateString(), price);
              
          } 
        }
        }
      }


      else if (time.includes('Every') && time.includes('weeks') && endDate.toString().includes('After') ) {
        const interval = parseInt(time.split(' ')[1]);
        const total = interval*7;
        const endinterval= parseInt(endDate.split(' ')[1]);
        let paymentDate = new Date(startDate);
        paymentDate.setDate(paymentDate.getDate() + 1);
        console.log("START DATE for 4th: ", paymentDate);

        for (let i = 0; i < endinterval; i++) {

          while (paymentDate <= currentendDate) {
            paymentDate.setDate(paymentDate.getDate() + total);

          if (paymentDate >= currentDate && paymentDate<=currentendDate ) {
              newPaymentMap.set(paymentDate.toDateString(), price);
              
          } 
        }
        }
      }

      else if (time.includes('Every') && time.includes('months') && endDate.toString().includes('After') ) {
        const interval = parseInt(time.split(' ')[1]);
        
        const endinterval= parseInt(endDate.split(' ')[1]);
        let paymentDate = new Date(startDate);
        paymentDate.setDate(paymentDate.getDate() + 1);
        console.log("START DATE for 4th: ", paymentDate);

        for (let i = 0; i < endinterval; i++) {

          while (paymentDate <= currentendDate) {
            paymentDate.setDate(paymentDate.getMonth() + interval);

          if (paymentDate >= currentDate && paymentDate<=currentendDate ) {
              newPaymentMap.set(paymentDate.toDateString(), price);
              
          } 
        }
        }
      }

      else if(time.includes('Every') && time.includes('days') && !endDate.toString().includes('After') && !endDate=='Never') {
        const interval = parseInt(time.split(' ')[1]);
        
        let paymentDate = new Date(startDate);
        paymentDate.setDate(paymentDate.getDate() + 1);
        console.log("START DATE for 5th: ", paymentDate);

        while (paymentDate <= currentendDate) {
          paymentDate.setDate(paymentDate.getDate() + interval);
          console.log("For Days: ",paymentDate);
          if (paymentDate >= currentDate && paymentDate<=endDate){
            newPaymentMap.set(paymentDate.toDateString(), price);
          }
        }
      }

      else if(time.includes('Every') && time.includes('weeks') && !endDate.toString().includes('After') && !endDate=='Never') {
        const interval = parseInt(time.split(' ')[1]);
        const total = interval*7
        let paymentDate = new Date(startDate);
        paymentDate.setDate(paymentDate.getDate() + 1);
        console.log("START DATE for 6th: ", paymentDate);

        while (paymentDate <= currentendDate) {
          paymentDate.setDate(paymentDate.getDate() + total);
          console.log("For weeks with endDate: ",paymentDate);
          if (paymentDate >= currentDate && paymentDate<=endDate){
            newPaymentMap.set(paymentDate.toDateString(), price);
          }
        }
      }

      else if(time.includes('Every') && time.includes('months') && !endDate.toString().includes('After') && !endDate=='Never') {
        const interval = parseInt(time.split(' ')[1]);
        
        let paymentDate = new Date(startDate);
        paymentDate.setDate(paymentDate.getDate() + 1);
        console.log("START DATE for 7th: ", paymentDate);

        while (paymentDate <= currentendDate) {
          paymentDate.setDate(paymentDate.getMonth() + interval);
          console.log("For months with endDate: ",paymentDate);
          if (paymentDate >= currentDate && paymentDate<=endDate){
            newPaymentMap.set(paymentDate.toDateString(), price);
          }
        }
      }

      //Does Not Repeat 
      else if(time.includes('Does')) {
        
        console.log("HAHAHAHHAHHA");
        let paymentDate = new Date(startDate);
        if (paymentDate<=currentendDate && paymentDate>=currentDate){
          paymentDate.setDate(paymentDate.getDate()+1);
          newPaymentMap.set(paymentDate.toDateString(), price);
        }
      }
      //Daily 
      else if(time.includes('Daily') && endDate=='Never') {
        
        
        let paymentDate = new Date(startDate);
        paymentDate.setDate(paymentDate.getDate() + 1);
        console.log("START DATE for 9th: ", paymentDate);

        while (paymentDate <= currentendDate) {
          paymentDate.setDate(paymentDate.getDate() + 1);
          console.log("For Daily: ",paymentDate);
          if (paymentDate >= currentDate && paymentDate<=currentendDate){
            newPaymentMap.set(paymentDate.toDateString(), price);
          }
        }
      }
      //WeeklyOn
      else if(time.includes('Weekly') && endDate=='Never') {
        
        const total = 7
        let paymentDate = new Date(startDate);
        paymentDate.setDate(paymentDate.getDate() + 1);
        console.log("START DATE for 6th: ", paymentDate);

        while (paymentDate <= currentendDate) {
          newPaymentMap.set(paymentDate.toDateString(), price);
          
          console.log("For weeks with endDate: ",paymentDate);
          if (paymentDate >= currentDate && paymentDate<=currentendDate){
            paymentDate.setDate(paymentDate.getDate() + total);
          }
        }
      }
      //MonthlyOn
      else if(time.includes('Monthly') && endDate=='Never') {
        const total = 28;
        
        let paymentDate = new Date(startDate);
        paymentDate.setDate(paymentDate.getDate() + 1);
        console.log("START DATE for 7th: ", paymentDate);

        while (paymentDate <= currentendDate) {
          paymentDate.setDate(paymentDate.getDate() + total);
          console.log("For months with endDate: ",paymentDate);
          if (paymentDate >= currentDate && paymentDate<=currentendDate){
            newPaymentMap.set(paymentDate.toDateString(), price);
          }
        }
      }
      //AnnuallyOn
      else if(time.includes('Annually') && endDate=='Never') {
        const total = 365;
        
        let paymentDate = new Date(startDate);
        paymentDate.setDate(paymentDate.getDate() + 1);
        console.log("START DATE for 7th: ", paymentDate);

        while (paymentDate <= currentendDate && paymentDate>=currentDate) {
          if (paymentDate<currentDate){
            paymentDate.setDate(paymentDate.getDate() + total);
          }
          newPaymentMap.set(paymentDate.toDateString(), price);
          paymentDate.setDate(paymentDate.getDate() + total); 
        }
      }

      
      console.log(`Generated map :`, newPaymentMap);
      newPaymentMaps.push({ category, paymentMap: newPaymentMap });
    });
    console.log('Final payment maps:', newPaymentMaps);
    setPaymentMaps(newPaymentMaps);
  };

  calculatePaymentsMaps();
}, [paymentData]);

console.log("MAP: ", paymentMaps)

const formattedData = paymentMaps.map(({ category, paymentMap }) => {
  // Calculate the total value by summing all values in the paymentMap
  const totalValue = Array.from(paymentMap.values()).reduce((acc, curr) => acc + curr, 0);
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return {
    id: category, // Use category as id
    label: category, // Use category as label
    value: totalValue,
    color: randomColor// You may need to define this function to get color based on category
  };
}).filter(({ value }) => value !== 0);
console.log("DATAAAAA: ",formattedData);

  return (
    <div className="dashboard-container">
        {/* SHOW Current Blance And Income */}
        <div className="flex justify-center mb-8">
  <div className="flex space-x-4">
    {/* Current Balance */}
    <div className="bg-gray-200 p-4 rounded-md">
      <p className="text-lg text-center font-semibold text-black">Current Balance:</p>
      <p className="text-xl text-center text-indigo-600">{balance ? `$${balance}` : 'Not available'}</p>
    </div>
    
    {/* Current Income */}
    <div className="bg-gray-200 p-4 rounded-md">
      <p className="text-lg text-center font-semibold text-black">Current Income:</p>
      <p className="text-xl text-center text-indigo-600">{income ? `$${income}` : 'Not available'}</p>
    </div>
  </div>
</div>






<header className="header" style={{ height: '600px', display: 'flex', flexDirection: 'row' }}>
    {/* Left column */}
    <div className="flex-1 w-32">
        <Pie data={formattedData} /> {/* Render the Pie component here */}
    </div>

    {/* Right column */}
<div className="flex-1  w-64 mr-10">
    <h1 className='text-center mb-4 text-lg font-bold'>Monthly Spendings</h1>
    <div className="overflow-auto text-center border border-gray-300 rounded-md ">
        <table className="w-full table-fixed ">
            <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2">Expense Type</th>
                    <th className="px-4 py-2">Budget %</th>
                    <th className="px-4 py-2">Monthly Budget</th>
                    <th className="px-4 py-2">Your Expense</th>
                    <th className="px-4 py-2">Available</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b border-gray-300">
                    <td className="px-4 py-2">2024-04-01</td>
                    <td className="px-4 py-2">Food</td>
                    <td className="px-4 py-2">$50</td>
                </tr>
                
                <tr className="border-b border-gray-300">
                    <td className="px-4 py-2">2024-04-05</td>
                    <td className="px-4 py-2">Transportation</td>
                    <td className="px-4 py-2">$30</td>
                </tr>
                {/* Add more rows as needed */}
            </tbody>
        </table>
    </div>
</div>


</header>
    </div>
);
}

export default Dashboard;
