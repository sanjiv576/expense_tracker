import { useState } from "react";
import { useAddTransactions } from "../../hooks/useAddTransactions";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import "./styles.css";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

export const ExpenseTracker = () => {
    const { addTransactions } = useAddTransactions();
    const { transactions, totalTransactions } = useGetTransactions();
    const { name, profilePhoto } = useGetUserInfo();
    const { balance, income, expenses } = totalTransactions;
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expenses");

    const userSignOut = async () => {
        try {
            const confirmation = window.confirm("Are you sure want to log out?");
            if (confirmation) {
                await signOut(auth);
                localStorage.clear();
                navigate("/");
            }
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addTransactions({ description, transactionAmount, transactionType });
        window.alert("Added new transaction.");
        setDescription("");
        setTransactionAmount(0);
        setTransactionType("expenses");
    };

    return (
        <div className="expense-tracker">
            <div className="header">
                <h2>{name}'s Expense Tracker</h2>
                {profilePhoto && (
                    <div className="profile">
                        <img className="profile-photo" src={profilePhoto} alt="Profile" />
                        <button className="sign-out-button" onClick={userSignOut}>Sign Out</button>
                    </div>
                )}
            </div>

            <div className="balance-summary">
                <div className="balance">
                    <h3>Your Balance:</h3>

                    <h4 className={balance >= 0 ? "positive" : "negative"}>${Math.abs(balance)}</h4>
                </div>
                <div className="summary">
                    <div className="income">
                        <h3>Income:</h3>
                        <p>${income}</p>
                    </div>
                    <div className="expenses">
                        <h3>Expenses:</h3>
                        <p>${expenses}</p>
                    </div>
                </div>
            </div>

            <form className="add-transaction" onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="float"
                    placeholder="Amount"
                    value={transactionAmount}
                    onChange={(e) => setTransactionAmount(Number(e.target.value))}
                    required
                />
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            value="expenses"
                            checked={transactionType === "expenses"}
                            onChange={(e) => setTransactionType(e.target.value)}
                        />
                        Expenses
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="income"
                            checked={transactionType === "income"}
                            onChange={(e) => setTransactionType(e.target.value)}
                        />
                        Income
                    </label>
                </div>
                <button type="submit" className="submit-button">Add Transaction</button>
            </form>

            <div className="transactions">
                <h3>Transactions</h3>
                <ul>
                    {transactions.map((transaction) => {
                        const { id, description, transactionAmount, transactionType } = transaction;
                        return (
                            <li key={id} className="transaction-item">
                                <h4>{description}</h4>
                                <p>
                                    ${transactionAmount} -
                                    <span
                                        className={
                                            transactionType === "expenses" ? "transaction-expense" : "transaction-income"
                                        }
                                    >
                                        {transactionType}
                                    </span>
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};