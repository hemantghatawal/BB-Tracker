import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");

    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("expense");

useEffect(() => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}, [transactions]);

  
  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income",
  );

  const totalIncome = incomeTransactions.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0,
  );

  
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense",
  );

  const totalExpense = expenseTransactions.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0,
  );
  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id),
    );
  };

  return (
    <div className="app">
      <h1>Expense Tracker</h1>

      <div className="summary">
        <div>
          <h3>Balance</h3>
          <p>₹{totalIncome - totalExpense}</p>
        </div>

        <div>
          <h3>Income</h3>
          <p>₹{totalIncome}</p>
        </div>

        <div>
          <h3>Expense</h3>
          <p>₹{totalExpense}</p>
        </div>
      </div>
      <div className="transaction-form">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button
          onClick={() => {
          if(!title|| !amount)
          {
            alert("please enter title and amount");
            return;
          }

            const newTransaction = {
              id: Date.now(),
              title: title,
              amount: amount,
              type: type,
            };

            setTransactions([...transactions, newTransaction]);

            setTitle("");
            setAmount("");
          }}
        >
          Add Transaction
        </button>
      </div>
      <h2>Transaction History</h2>
      <div className="transaction-list">
        {transactions.length === 0 ? (
          <p className="empty-message">No transactions yet</p>
        ) : (
          transactions.map((transaction) => (
            <div className="transaction-item" key={transaction.id}>
              <h3>{transaction.title}</h3>

              <p>₹{transaction.amount}</p>

              <p className={transaction.type}>{transaction.type}</p>

              <button
                className="delete-btn"
                onClick={() => deleteTransaction(transaction.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
