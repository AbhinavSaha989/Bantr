import React from 'react'
import { axiosInstance } from "../lib/axios";
import {
  useQuery,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";

const FullPost = ({postId}) => {

    const { data: postFetch, isLoading } = useQuery({
        queryKey: ["post", postId],
        queryFn: async () => {
          const response = await axiosInstance.get(`/posts/get-post/${postId}`);
          console.log(response.data);
          
          return response.data.post;
        }
      });


  return (
    <section className="min-h-screen w-full md:w-2/3 bg-black border border-gray-300 mx-2 overflow-auto mt-2 flex flex-col items-center text-white">
        {postFetch && (
          <div className="w-full h-full p-2">
            <h1 className="text-4xl font-bold mb-4">{postFetch.title}</h1>
            <p className="text-lg">{postFetch.content}</p>
          </div>
        )}

    </section>
  );
}

export default FullPost