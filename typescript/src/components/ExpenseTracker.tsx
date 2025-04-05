// src/components/ExpenseTracker.tsx
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface Expense {
  id: number;
  category: string;
  amount: number;
  currency: string;
  dateTime: string;
}

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [category, setCategory] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<string>('USD');
  const [dateTime, setDateTime] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!category.trim() || !amount || !dateTime) {
      setError('Please fill in all fields.');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Amount must be a positive number.');
      return;
    }
    setError('');
    const newExpense: Expense = {
      id: Date.now(),
      category: category.trim(),
      amount: parsedAmount,
      currency,
      dateTime,
    };
    setExpenses([...expenses, newExpense]);
    setCategory('');
    setAmount('');
    setDateTime('');
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  // Pie chart data
  const categories = [...new Set(expenses.map(exp => exp.category))];
  const spendingByCategory = categories.map(cat =>
    expenses
      .filter(exp => exp.category === cat)
      .reduce((sum, exp) => sum + exp.amount, 0)
  );
  const pieData = {
    labels: categories,
    datasets: [
      {
        data: spendingByCategory,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };
  const pieOptions = {
    plugins: {
      legend: { position: 'bottom' as const },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.raw} ${expenses[0]?.currency || 'USD'}`,
        },
      },
    },
  };

  return (
    <div className="expense-tracker">
      <h3>Add an Expense</h3>
      {error && <p className="error-message">{error}</p>}
      <div className="form-container">
        <input
          type="text"
          placeholder="Category (e.g., Food)"
          value={category}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
          className="input-field"
          step="0.01"
          min="0"
        />
        <select
          value={currency}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCurrency(e.target.value)}
          className="input-field"
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="JPY">JPY (¥)</option>
          <option value="AUD">AUD (A$)</option>
        </select>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateTime(e.target.value)}
          className="input-field"
        />
        <button onClick={addExpense} className="add-button">
          +
        </button>
      </div>

      <h3>Your Expenses</h3>
      {expenses.length > 0 ? (
        <ul className="expense-list">
          {expenses.map(exp => (
            <li key={exp.id} className="expense-item">
              <span>
                {exp.category}: {exp.amount.toFixed(2)} {exp.currency} on{' '}
                {new Date(exp.dateTime).toLocaleString()}
              </span>
              <button onClick={() => deleteExpense(exp.id)} className="delete-button">
                ✕
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses added yet.</p>
      )}

      {expenses.length > 0 && (
        <div className="chart-container">
          <h3>Spending Breakdown</h3>
          <Pie data={pieData} options={pieOptions} />
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;