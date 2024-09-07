'use client'
import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Rent', amount: 1400, date: '3-15-2024' },
    { id: 2, description: 'Groceries', amount: 300, date: '3-12-2024' },
    { id: 3, description: 'Internet', amount: 210, date: '3-11-2024' },
  ]);

  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  return (
    <div className="App">
    <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
      <h1 className="text-3xl py-6 mb-10 bg-teal-400 text-white rounded">Upcoming Payments</h1>
        <h2 className="text-2xl py-3 mb-1 text-gray rounded">Transactions</h2>
        <ul>
          {transactions.map(transaction => (
            <li key={transaction.id}>
              <div className="Transactions">{transaction.description} ${transaction.amount} {transaction.date}</div>
              <button onClick={() => handleDeleteTransaction(transaction.id)}>Delete</button>
              
            </li>
          ))}
        </ul>
      </div> 
    </div>
  );
}

export default App;

