<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useNavigate, useLocation } from "react-router-dom";

const TrendingSearch = ({ onTagClick }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Get tags from URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tagsFromUrl = params.get("tags");
    if (tagsFromUrl) {
      setSelectedTags(tagsFromUrl.split(","));
    }
  }, [location.search]);

  const { data: trendingTags, isLoading: tagsLoading } = useQuery({
    queryKey: ["trendingTags"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/posts/tags");
        return response.data;
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) => {
      const updatedTags = prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag];

      // Update the URL with the selected tags
      navigate(`/?tags=${updatedTags.join(",")}`);

      // Pass the updated tags to the parent component
      onTagClick(updatedTags.join(","));
      return updatedTags;
    });
  };

  const handleClearSearch = () => {
    setSelectedTags([]);
    onTagClick("");
    navigate(`/`); // Clear the tags in the URL
  };

  return (
    <section className="h-[calc(100vh-64px)] md:w-1/3 border border-gray-300 bg-black mx-2 hidden md:block sticky top-[64px] mt-2 shadow-lg">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-300 uppercase tracking-wide">
          Trending Tags
        </h2>
        {selectedTags.length > 0 && (
          <button
            onClick={handleClearSearch}
            className="text-sm bg-gray-700 text-gray-300 px-3 py-1 rounded-md hover:bg-gray-600 transition-all duration-300"
          >
            Clear
          </button>
        )}
      </div>

      <div className="p-4 space-y-2">
        {tagsLoading ? (
          <p className="text-gray-500 animate-pulse">Loading tags...</p>
        ) : trendingTags ? (
          trendingTags.tags.map((tag) => (
            <p
              key={tag._id}
              onClick={() => handleTagClick(tag._id)}
              className={`p-2 rounded-md cursor-pointer transition-all duration-300 ${
                selectedTags.includes(tag._id)
                  ? "bg-gray-700 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              #{tag._id}
            </p>
          ))
        ) : (
          <p className="text-gray-500">No Tags to be Found</p>
        )}
      </div>
=======
import React, { useState } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";

const TrendingSearch = () => {
  const [selectedTag, setSelectedTag] = useState(""); // Track the selected tag
  const navigate = useNavigate();

  // Fetch trending tags
  const { data: trendingTags, isLoading: tagsLoading } = useQuery({
    queryKey: ["trendingTags"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/posts/tags");
        return response.data;
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  // Fetch posts by tag

  // Handle tag click
  const handleTagClick = (tag) => {
    setSelectedTag(tag); // Update selected tag
    navigate(`/search?tag=${tag}`); // Navigate to search page
  };

  return (
    <section className="h-[50vh] md:w-1/3 bg-slate-900 backdrop-blur-md bg-opacity-30 border border-gray-300 mx-2 hidden md:block sticky top-0 mt-2">
      {tagsLoading ? (
        <p>Loading tags...</p>
      ) : trendingTags ? (
        trendingTags.tags.map((tag) => (
          <p
            key={tag._id}
            onClick={() => handleTagClick(tag._id)}
            className="p-2 hover:bg-slate-800 cursor-pointer"
          >
            {tag._id}
          </p>
        ))
      ) : (
        <p>No Tags to be Found</p>
      )}
>>>>>>> 7ccc958a6a5ac6df1216cb6634a6a37051f11d1f
    </section>
  );
};

export default TrendingSearch;
