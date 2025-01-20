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
    </section>
  );
};

export default TrendingSearch;
