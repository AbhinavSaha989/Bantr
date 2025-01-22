<<<<<<< HEAD
import React,{useState} from 'react'
=======
import React, {useEffect} from 'react'
import {axiosInstance} from '../lib/axios'
>>>>>>> 7ccc958a6a5ac6df1216cb6634a6a37051f11d1f
import Navbar from '../components/Navbar'
import { useQueryClient, useQuery } from '@tanstack/react-query';
import PostsSection from '../components/PostsSection';
import TrendingSearch from '../components/TrendingSearch';
import { useNavigate} from 'react-router-dom'


const Home = () => {

<<<<<<< HEAD
  const [searchTags, setSearchTags] = useState("");

=======
 
>>>>>>> 7ccc958a6a5ac6df1216cb6634a6a37051f11d1f
  return (
    <main>
      <Navbar onSearch={setSearchTags}/>
      <div className="flex">
        {/* Scrollable Section */}
        <PostsSection searchTags={searchTags}/>

        {/* Fixed Section */}
        <TrendingSearch onTagClick={setSearchTags}/>
      </div>
    </main>
  );
}

export default Home