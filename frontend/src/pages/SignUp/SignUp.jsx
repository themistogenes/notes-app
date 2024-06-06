import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError('Please enter a name.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter the password.');
      return;
    }

    setError('');

    // SignUp API call
    try {
      const res = await axiosInstance.post('/create-account', {
        fullName: name,
        email: email,
        password: password
      })
      
      // handle successful registration
      if (res.data && res.data.accessToken) {
        localStorage.setItem('token', res.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      // handle registration error
      if (error.res && error.res.data && error.res.message) {
        setError(error.res.data.message)
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-10">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form
            onSubmit={handleSignUp}  
          >
            <h4 className="text-2xl mb-7">SignUp</h4>

            <input 
              type="text" 
              placeholder="Name" 
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input 
              type="text" 
              placeholder="Email" 
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {
              error && <p className="text-red-500 text-xs pb-1">{error}</p>
            }

            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already registered?
              {' '}
              <Link to="/Login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp