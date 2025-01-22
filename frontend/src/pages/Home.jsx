import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import PostsSection from '../components/PostsSection';
import TrendingSearch from '../components/TrendingSearch';

const Home = () => {

  const [searchTags, setSearchTags] = useState("");

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