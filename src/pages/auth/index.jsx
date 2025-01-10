import { auth, provider } from "../../config/firebase-config"
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from "react-router-dom"
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
        <center>
            <div className="login-with-google">
                <p>Continue with Google account</p>
                <button className="" onClick={signWithGoogle}>Sign in with Google</button>
            </div>
        </center>
    </>
}