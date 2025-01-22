import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Create from './pages/Create'
<<<<<<< HEAD
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
=======
import SearchResults from './pages/SearchResults'
>>>>>>> 7ccc958a6a5ac6df1216cb6634a6a37051f11d1f

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

<<<<<<< HEAD
  

  if(isLoading) return null;
=======
 
>>>>>>> 7ccc958a6a5ac6df1216cb6634a6a37051f11d1f


  return (
    <>
      <Routes>
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/create" element={authUser ? <Create /> : <Navigate to="/" />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/" element={<Home />} />
        <Route path={`user/:userId`} element={<UserPage />} />
        <Route path={`post/:postId`} element={<PostPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App