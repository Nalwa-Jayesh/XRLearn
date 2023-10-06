import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { dispatch } = useAuthContext();

	async function LoginUser(e) {
		try {
			e.preventDefault()
			const res = await axios.post("http://localhost:4040/api/user/login", {
			email,
			password
			})
      console.log(res)
      if(res.status === 200 && res.data.user && res.data.token) {
        alert("Successfully Logged In");
        dispatch({type: 'LOGIN', payload: {
          accessToken: res.data.token,
          name: res.data.user.name,
        }})
        localStorage.setItem("User", JSON.stringify({
          accessToken: res.data.token,
          name: res.data.user.name,
        }));
        navigate("/dashboard")
      }
		}
		catch(error) {
			console.log(error)
		}
	}

  return (
    <div className='login-wrapper'>
			<div className='login-body'>
				<h1>Login To XRLearn</h1>
				<div className='login-form'>
					<form>
						<input
							className='login__input'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							placeholder="Email"
						/>
						<br />
						<input
							className='login__input'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							placeholder="Password"
						/>
						<br />
						<button type="submit" className="login__btn" onClick={LoginUser}>Login</button>
						<h3>Not Registered Yet? <Link to='/signup'>Click Here</Link> to Register</h3>
					</form>
				</div>
			</div>
		</div>
  )
}

export default Login