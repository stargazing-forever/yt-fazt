import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { Alert } from './Alert';

const initialForm = {
  email: '',
  password: '',
}
export const Login = () => {
  //hooks
  const {singin, singinGoogle, resetPassword} = useAuth()
  const [error, setError] = useState('');
  const {formData, handleChange} = useForm(initialForm);
  const {email, password} = formData;

  //functions
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    try {
      await singin(email,password);
      
    } catch (err) {
      setError(err.message);
    }
  }

  const handleLoginGoogle = async() => {
    setError('');
    try {
      const userCredencial = await singinGoogle();
      console.log(userCredencial)
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  }

  const handleResetPassword = async() => {
    setError('');
    if( email.trim().length === 0 ) {
      setError('Please enter your email');
      return;
    }
    try {
      await resetPassword( email );
      setError('te enviamos un email!')
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  }

  return (
    <div className="w-full max-w-xs m-auto">
      {
        error && <Alert error={error} />
      }
      <form 
        onSubmit={ handleSubmit } 
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label 
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email">Email</label>
          <input
            className='shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type="email"
            placeholder="youremail@company.ltd"
            id="email"
            name="email"
            value={ email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label 
            htmlFor="password" 
            className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            className='shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type="password"
            name="password"
            id="password"
            value={ password}
            onChange={handleChange}
            placeholder="******"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <button
            type='button'
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            // href="#!"
            onClick={handleResetPassword}
          >Forgot Password?</button>
        </div>
      </form>
      <p className="my-4 text-sm flex justify-between">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <button 
        className="bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full"
        onClick={handleLoginGoogle}
        type="button"
      >Login with google</button>
    </div>
  )
}
