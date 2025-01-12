import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
    // State to hold transactions
    const [transactions, setTransactions] = useState([]);
    const [totalTransactions, setTotalTransactions] = useState({
        balance: 0.00,
        income: 0.00,
        expenses: 0.00,
    });

    // Reference to the transactions collection in Firestore
    const transactionCollectionRef = collection(db, "transactions");

    // Get userId from another custom hook
    const { userId } = useGetUserInfo();

    // Fetch transactions from Firestore
    const getTransactions = () => {
        let unsubscribe;

        try {
            // Create a query to fetch user-specific transactions, ordered by createdAt
            const queryTransactions = query(
                transactionCollectionRef,
                where("userId", "==", userId),
                orderBy("createdAt")
            );

            // Listen for changes in the transactions collection
            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                const docs = []; // Initialize an empty array for storing transactions
                let totalIncome = 0.00;
                let totalExpenses = 0.00;

                // Iterate over each document in the snapshot
                snapshot.forEach((doc) => {
                    console.log(`Data: ${JSON.stringify(doc.data())}`); // Debug log for data

                    // Combine document data and ID into a single object
                    docs.push({ ...doc.data(), id: doc.id });

                    if (doc.data().transactionType === 'income') {
                        totalIncome += parseFloat(doc.data().transactionAmount)
                    }
                    else {
                        totalExpenses += parseFloat(doc.data().transactionAmount)
                    }
                });

                // Update state with the fetched transactions
                setTransactions(docs);
                setTotalTransactions({
                    balance: totalIncome - totalExpenses,
                    income: totalIncome,
                    expenses: totalExpenses,
                })
            });
        } catch (err) {
            console.error("Error fetching transactions:", err); // Error handling
        }

        // Return the unsubscribe function to clean up the listener
        return () => unsubscribe && unsubscribe();
    };

    // useEffect to fetch transactions on mount and re-fetch if userId changes
    useEffect(() => {
        if (userId) {
            const unsubscribe = getTransactions();
            return unsubscribe; // Cleanup listener on component unmount or dependency change
        }
    }, [userId]); // Re-run effect if userId changes

    // Return the transactions state
    return { transactions, totalTransactions, };
};
