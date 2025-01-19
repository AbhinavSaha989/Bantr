import React from 'react'
import {axiosInstance} from '../lib/axios'
import Navbar from '../components/Navbar'
import PostsSection from '../components/PostsSection';
import TrendingSearch from '../components/TrendingSearch';

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