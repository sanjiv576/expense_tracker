import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from '../config/firebase-config';
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransactions = () => {

    // reference of 'transactions' firebase collection
    const transactionCollectionRef = collection(db, "transactions");

    // get userId

    const { userId } = useGetUserInfo();


    const addTransactions = async ({ description, transactionAmount, transactionType }) => {
        await addDoc(transactionCollectionRef, {
            userId,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp(),
        });
    }
    return { addTransactions };
}