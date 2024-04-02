import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";


const Login = () => {

    const [err, setErr] = useState(null)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;



        try {

            await signInWithEmailAndPassword(auth, email, password)
            navigate("/chatapp")

            toast.success("User login successful.", {
                toastId: "suc1"
            })


        } catch (err) {

            setErr(err);
        }

        e.target[0].value = ""
        e.target[1].value = ""

    }

    if (err) {

        toast.error("Invalid email or password", {
            toastId: "inavlid"
        })

        setErr("")
    }



    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className='logo'>Chat App</span>
                <span className='title'>Login</span>
                <form onSubmit={handleSubmit}>

                    <input type='email' placeholder='email' />
                    <input type='password' placeholder='password' />

                    <button>Sign In</button>
                </form>
                <p> Yod don't have an account? <Link to="/register" > Register </Link></p>

            </div>
        </div>

    )

}

export { Login }