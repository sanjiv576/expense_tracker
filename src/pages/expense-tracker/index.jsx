
import { useState } from "react";
import { useAddTransactions } from "../../hooks/useAddTransactions"
export const ExpenseTracker = () => {

    const { addTransactions } = useAddTransactions();

    const onSubmit = (e) => {
        e.preventDefault();

        // call hook or function that deals with firebase 
        addTransactions({ description, transactionAmount, transactionType });
        window.alert('Added new transactions.');

    }

    // states

    const [description, setDescripton] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expenses");

    return (
        <>
            <center>
                <div className="expense-tracker" >
                    <div className="container">
                        <h1>Expense Tracker</h1>
                        <div className="balance">
                            <h3>Your Balance:</h3>
                            <h4>$0.00</h4>
                        </div>
                        <div className="summary">
                            <div className="income">
                                <h3>Income:</h3>
                                <p>$0.00</p>
                            </div>
                            <div className="expenses">
                                <h3>Expenses:</h3>
                                <p>$0.00</p>
                            </div>

                            <form action="" className="add-transaction" onSubmit={onSubmit}>
                                <input
                                    type="text"
                                    placeholder="Description"
                                    onChange={(e) => setDescripton(e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    onChange={(e) => setTransactionAmount(e.target.value)}
                                    required
                                />

                                <input
                                    type="radio"
                                    id="expenses"
                                    value="expenses"
                                    checked={transactionType === "expenses"}
                                    onChange={(e) => setTransactionType(e.target.value)}
                                />
                                <label htmlFor="expenses">Expenses</label>

                                <input
                                    type="radio"
                                    id="income"
                                    value="income"
                                    checked={transactionType === "income"}
                                    onChange={(e) => setTransactionType(e.target.value)}
                                />
                                <label htmlFor="income">Income</label>

                                <button type="submit">Add Transaction</button>
                            </form>
                        </div>
                    </div>
                </div>
            </center>

        </>
    );
}