import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

function Register() {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [userName, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    function createUser(event) {
        event.preventDefault()
        axios.post('http://localhost:5000/signup', {firstName, lastName, email, userName, password})
        .then((result) => console.log(result))
        .catch((err) => console.log(err))
        if (userName) {
            console.log("User registered!");
        }
        navigate('/login')
    }

    return (
        <div>
            <div className="h-screen flex items-center justify-center">
                <div className="register-box flex-col items-center relative z-0 justify-center">
                    <div className="blog-title flex justify-center z-2 text-green-700 text-5xl mt-10">
                        <h1>Register</h1>
                    </div>
                    <form onSubmit={createUser} className="w-80 ml-[90px] mt-12">

                        <input onChange={(event) => {setFirstName(event.target.value)}}
                        autoComplete='off' name="text" type="text" placeholder="First Name"
                        className="block rounded-xl h-12 mb-6 p-4 w-full border-black border"/>

                        <input onChange={(event) => {setLastName(event.target.value)}}
                        autoComplete='off' name="text" type="text" placeholder="Last Name"
                        className="block rounded-xl h-12 mb-6 p-4 w-full border-black border"/>

                        <input onChange={(event) => {setEmail(event.target.value)}}
                        autoComplete='off' name="email" type="text" placeholder="Email"
                        className="block rounded-xl h-12 mb-6 p-4 w-full border-black border"/>

                        <input onChange={(event) => {setUsername(event.target.value)}}
                        autoComplete='off' name="username" type="text" placeholder="Set Username"
                        className="block rounded-xl h-12 mb-6 p-4 w-full border-black border"/>

                        <input onChange={(event) => {setPassword(event.target.value)}}
                        autoComplete='off' name="password" type="password" placeholder="Set Password"
                        className="block rounded-xl h-12 mb-6 p-4 w-full border-black border"/>

                        <button className="bg-green-700 h-12 rounded-xl w-full text-white">Register</button>
                    </form>
                    <div className="blog-title flex justify-center z-2 text-2xl mt-6">
                        <h1>Already a user? Login <a href='/login' className="text-green-700">here!</a></h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;