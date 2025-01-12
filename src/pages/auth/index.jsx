import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";

// import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./styles.css";
import { useEffect } from "react";


export const Auth = () => {
    const navigate = useNavigate();
    // const { isAuth } = useGetUserInfo();

    const signWithGoogle = async () => {
        // pop up signIn window for login
        const results = await signInWithPopup(auth, provider);
        console.log(results);

        const authInfo = {
            userId: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        };
        // JSON.stringify converts JSON object into string
        localStorage.setItem("auth", JSON.stringify(authInfo));

        navigate("/e");
    };

    // useEffect(() => {

    //     if (isAuth == true) {
    //         navigate("/e");

    //     }
    // }, [0]);

    // if (isAuth) {
    //     return <Navigate to="/e" />
    // }

    return (
        <>
            <div className="login-page">
                <p className="login-message">Sign In With Google to Continue</p>
                <button
                    className="login-with-google-btn"
                    onClick={signWithGoogle}
                >
                    Sign In With Google
                </button>
            </div>
        </>
    );
};
