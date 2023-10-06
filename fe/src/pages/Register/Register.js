import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Register.css'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function RegisterUser(e){
	try{
		e.preventDefault()
		console.log(name, email, password)
		const res = await axios.post("http://localhost:4040/api/user/register", {
			name,
			email,
			password
		})
    console.log(res);
    if(res.status === 201 && res.data.user) {
      alert("Successfully Registered");
      console.log("Successfully Registered")
      navigate('/')
    }		
	}
	catch(error) {
		console.log(error)
	}
  }

  return (
    <div className='register-wrapper'>
      <div className='register-body'>
			<h1>Register on RXLearn</h1>
			<div className='register-form'>
				<form>
					<input
						className='register__input'
						value={name}
						onChange={(e) => setName(e.target.value)}
						type="text"
						placeholder="Name"
					/>
					<br />
					<input
						className='register__input'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="Email"
					/>
					<br />
					<input
						className='register__input'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
					/>
					<br />
					<input type="submit" className="register-btn" value="Register" onClick={RegisterUser}></input>
					<br />
					<h3>Already Registered? <Link to='/'>Click Here</Link> to Login</h3>
				</form>
			</div>
		  </div>
    </div>   
  )
}

export default Register