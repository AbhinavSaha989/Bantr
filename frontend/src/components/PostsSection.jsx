import React, { useEffect, useRef } from "react";
import PostCard from "./PostCard";
import { axiosInstance } from "../lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostCardSkeleton from "./skeletons/PostCardSkeleton";

const PostsSection = () => {
  const observerRef = useRef(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axiosInstance.get(
        `/posts/get-all-posts?page=${pageParam}`
      );
      return {
        posts: response.data.posts,
        nextPage: pageParam + 1,
        isLastPage: response.data.isLastPage,
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.isLastPage ? undefined : lastPage.nextPage,
  });

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <section className="min-h-screen w-full md:w-2/3 bg-black backdrop-blur-md bg-opacity-30 border border-gray-300 mx-2 overflow-auto mt-2 flex flex-col items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="min-h-screen w-full md:w-2/3 bg-black backdrop-blur-md bg-opacity-30 border border-gray-300 mx-2 overflow-auto mt-2 flex flex-col items-center">
        <p>No posts to display.</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full md:w-2/3 bg-black backdrop-blur-md bg-opacity-30 border border-gray-300 mx-2 overflow-auto mt-2 flex flex-col items-center">
      {data.pages.map((page) =>
        page.posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
      {isFetchingNextPage && <p>Loading more posts...</p>}
      <div ref={observerRef} className="h-10" />
    </section>
  );
};

export default PostsSection;
