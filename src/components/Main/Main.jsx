import React, { useState } from 'react';
import './Main.css';
import dollarIcon from '../../assets/icon-dollar.svg';
import walletIcon from '../../assets/wallet.png';

export default function Main() {
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [expenses, setExpenses] = useState([])

    const addExpense = () => {
        if (!category || !amount) {
            return;
        }
        const newExpense = {
            id: expenses.length + 1,
            title: category,
            amount: amount,
            date: new Date().toLocaleDateString()
        }
        setExpenses([...expenses, newExpense])
        setCategory('')
        setAmount('')
    };

    const removeItem = (itemID) => {
        setExpenses(expenses.filter(expenseItem => expenseItem.id !== itemID))
    }

    const totalAmt = () => {
        let amt = 0
        expenses.map(expense => {
            amt += parseFloat(expense.amount)
        })
        return amt.toFixed(2)
    }

    const resetAllItems = () => {
        setExpenses([])
    }

    const checkString = (str) => {
        if(str.length > 15) {
            return str.slice(0,13) + '...'
        }
        return str
    }

    return (
        <>
            <div className="container">
                <h1>Expense Tracker</h1>
                <div className="input-section input-1">
                    <p>Category</p>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Groceries"
                            className="category-input"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                </div>

                <div className="input-section input-2">
                    <p>Amount</p>
                    <div className="input-box">
                        <img src={dollarIcon} alt="Dollar Icon" />
                        <input
                            type="number"
                            placeholder="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>

                <button onClick={addExpense} className='add-btn'>Add</button>
            </div>

            <div className="result-container">
                <div className='expense-chart-section'>
                    <h1>Expense Chart</h1>
                    <ul>
                        {expenses.length > 0 ? (
                            expenses.map(expense => (
                                <li>
                                    <p>{expense.date}</p>
                                    <hr />
                                    <div key={expense.id} className='expense-chart-item'>
                                        <p className='text'>{checkString(expense.title)}: <span>${expense.amount}</span> </p>
                                        <button className='delete-btn' onClick={() => removeItem(expense.id)}>Delete</button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <div className="box">
                                <div className='nothing-here-box'>
                                    <img src={walletIcon} alt="" className='wallet-icon'/>
                                    <p>Uh oh! There's nothing here yet :(</p>
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
                <div className='total-display'>
                    <div>
                        <h1 className='total-heading'>Total</h1>
                        <h1 className='total-amt'>${totalAmt()}</h1>
                    </div>
                    <button className='reset-btn' onClick={resetAllItems}>Reset</button>
                </div>
            </div>
        </>
    );
}
