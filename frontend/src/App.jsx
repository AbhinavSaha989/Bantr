import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Create from './pages/Create'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import Update from './pages/Update'
import LoadingScreen from './components/LoadingScreen'
import { ThemeProvider } from './components/ThemeProvider'
import { Toaster } from "@/components/ui/toaster";

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
  
  

 if (isLoading) {
   return (
     <LoadingScreen isLoading={isLoading} />
   );
 }



  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/create"
          element={authUser ? <Create /> : <Navigate to="/" />}
        />
        <Route path="/" element={<Home />} />
        <Route path={`user/:userId`} element={<UserPage />} />
        <Route path={`post/:postId`} element={<PostPage />} />
        <Route
          path={`update/:postId`}
          element={authUser ? <Update /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App