import { auth, provider } from "../../config/firebase-config"
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from "react-router-dom"
import "./styles.css"
export const Auth = () => {

    const navigate = useNavigate();

    const signWithGoogle = async () => {
        // pop up signIn window for login
        const results = await signInWithPopup(auth, provider);
        console.log(results);

        const authInfo = {
            userId: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        }
        // JSON.stringfly converts JSON object into string
        localStorage.setItem("auth", JSON.stringify(authInfo));

        navigate('/e');

    }
    return <>
        <div className="login-page">
            <p>Sign In With Google to Continue</p>
            <button className="login-with-google-btn" onClick={signWithGoogle}>
                {" "}
                Sign In With Google
            </button>
        </div>
    </>
}