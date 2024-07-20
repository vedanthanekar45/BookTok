import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

function Login() {
    const [userName, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    function createUser(event) {
        event.preventDefault()
        axios.post('http://localhost:5000/login', {userName, password})
        .then((response) => {
            console.log(response.data)
            navigate('/')
        })
        .catch((err) => console.log(err))
    }

    return (
        <div>
            <div className="h-screen flex items-center justify-center">
                <div className="login-box flex-col items-center relative bg-white z-0 justify-center">
                    <div className="blog-title flex justify-center z-2 text-green-700 text-5xl mt-10">
                        <h1>Login</h1>
                    </div>
                    <div className="blog-title flex justify-center z-2 text-2xl mt-6">
                        <h1>To continue with NovelNest</h1>
                    </div>
                    <form onSubmit={createUser} className="w-80 ml-[90px] mt-12">

                        <input onChange={(event) => {setUsername(event.target.value)}}
                        autoComplete='off' name="username" type="text" placeholder="Username"
                        className="block rounded-xl h-12 mb-6 p-4 w-full border-black border"/>

                        <input onChange={(event) => {setPassword(event.target.value)}}
                        autoComplete='off' name="password" type="password" placeholder="Password"
                        className="block rounded-xl h-12 mb-6 p-4 w-full border-black border"/>

                        <button className="bg-green-700 h-12 rounded-xl w-full text-white">Login</button>
                    </form>
                    <div className="blog-title flex justify-center z-2 text-2xl mt-6">
                        <h1>Not a user yet? Register <a href='/register' className="text-green-700">here!</a></h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;