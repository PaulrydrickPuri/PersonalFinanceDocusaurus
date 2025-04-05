import React, { useState } from 'react';

const BudgetAdvisor: React.FC = () => {
  const [income, setIncome] = useState<string>('');
  const [expenses, setExpenses] = useState<string>('');
  const [advice, setAdvice] = useState<string>('');

  const analyzeBudget = (): void => {
    const totalIncome: number = parseFloat(income) || 0;
    const totalExpenses: number = parseFloat(expenses) || 0;
    if (!totalIncome || !totalExpenses) {
      setAdvice('Please enter valid numbers for income and expenses.');
      return;
    }
    const expenseRatio: number = totalExpenses / totalIncome;
    if (expenseRatio > 0.7) {
      setAdvice(`You’re spending over 70% of your income ($${totalExpenses}). Cut back to save more!`);
    } else {
      const savings: number = totalIncome - totalExpenses;
      setAdvice(`Great job! You could save $${savings.toFixed(2)}/month.`);
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Monthly Income"
        value={income}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIncome(e.target.value)}
      />
      <input
        type="number"
        placeholder="Total Expenses"
        value={expenses}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExpenses(e.target.value)}
      />
      <button onClick={analyzeBudget}>Get Advice</button>
      <p>{advice}</p>
    </div>
  );
};

export default BudgetAdvisor;