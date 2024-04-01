import add from "../images/image_icon_153794.png"
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"
import { auth, storage, db } from "../firebase"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {

    const [err, setErr] = useState(null)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = await e.target[0].value;
        const email = await e.target[1].value;
        const password = await e.target[2].value;
        const file = await e.target[3].files[0];


        try {

            const res = await createUserWithEmailAndPassword(auth, email, password)



            const storageRef = ref(storage, `userImages/${displayName}`);

            const uploadTask = uploadBytesResumable(storageRef, file)
                .then(() => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        })

                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        })

                        await setDoc(doc(db, "userChats", res.user.uid), {})

                        navigate("/")

                    });
                })


        } catch (err) {

            setErr(err);
        }



    }

    if (err) {

        toast.error("Invalid email or password should be six characters long.", {
            toastId: "inavlid"
        })

        setErr("")
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className='logo'>Chat App</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='display name' />
                    <input type='email' placeholder='email' />
                    <input type='password' placeholder='password' />
                    <input style={{ display: "none" }} type='file' id='file' />
                    <label htmlFor='file'>
                        <img src={add} alt='' />
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign Up</button>

                </form>
                <p> You do have an account? <Link to='/login' > Login </Link></p>
            </div>
        </div>

    )

}

export { Register }