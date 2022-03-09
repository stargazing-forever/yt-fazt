import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm'
import {updateProfile} from 'firebase/auth';
import { Alert } from './Alert';
import { Link } from 'react-router-dom';

const initialForm = {
  email: '',
  password: '',
}

export const Register = () => {
  //hooks
  const {formData, handleChange} = useForm(initialForm);
  const { email, password } = formData;
  const { singup } = useAuth();
  const [error, setError] = useState('');

  //functions
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    try {
      const {user} = await singup(email, password);
      await updateProfile(user, {displayName: 'Pedrito'});
      console.log(user);

    } catch (err) {
      console.log({err})
      setError(err.message)
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
            htmlFor="email"
          >Email</label>
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
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >Password</label>
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

        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
      </form>
      <p className="my-4 text-sm flex justify-between">
      Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}
