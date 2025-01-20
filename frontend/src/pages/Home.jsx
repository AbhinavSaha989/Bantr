import React, {useEffect} from 'react'
import {axiosInstance} from '../lib/axios'
import Navbar from '../components/Navbar'
import { useQueryClient, useQuery } from '@tanstack/react-query';
import PostsSection from '../components/PostsSection';
import TrendingSearch from '../components/TrendingSearch';
import { useNavigate} from 'react-router-dom'


const Home = () => {

 
  return (
    <main>
      <Navbar />
      <div className="flex">
        {/* Scrollable Section */}
        <PostsSection />

        {/* Fixed Section */}
        <TrendingSearch />
      </div>
    </main>
  );
}

export default Home