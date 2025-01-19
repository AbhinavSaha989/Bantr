import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Create from './pages/Create'

const App = () => {
  const {data: authUser, isLoading} = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/users/get-user");
        return response.data;
      } catch (error) {
        if(error.response && error.response.status === 401){
          return null
        }
        toast.error(error.response.data.message || "Something went wrong");
      }
    },
  })

  if(isLoading) return null;


  return (
    <>
      <Routes>
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/create" element={authUser ? <Create /> : <Navigate to="/" />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App