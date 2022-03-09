import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';

import {auth} from '../firebase/config';
import { Login } from '../components/auth/Login'
import { Register } from '../components/auth/Register'
import { HomeScreen } from '../components/HomeScreen'
import { useAuth } from '../hooks/useAuth'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { Redirect } from 'react-router-dom';

export const AppRouter = () => {
  
  const { setUser } = useAuth();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if(currentUser?.uid) {
        setUser(currentUser);
        setIsAuth(true);
      } else {
        setIsAuth(false)
      }
      setLoading(false);
    })
  }, [setUser]);

  if(loading) {
    return <h1>loading</h1>
  }

  return (
    <Router>
      <div className="bg-stone-900 h-screen text-white flex">
        <Switch>
          <PublicRoute 
            exact 
            path="/login" 
            component={ Login } 
            isAuth={isAuth} 
          />

          <PublicRoute 
            exact 
            path="/register" 
            component={ Register } 
            isAuth={isAuth} 
          />

          <PrivateRoute 
            exact 
            path="/" 
            component={ HomeScreen } 
            isAuth={isAuth} 
          />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}