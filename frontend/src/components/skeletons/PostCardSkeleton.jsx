import React from "react";

const PostCardSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col w-[95%] mx-2 my-4 p-2 border border-gray-700 bg-black gap-2">
      {/* Header Skeleton */}
      <div className="flex flex-row w-full justify-between p-1">
        <div className="flex flex-row gap-2 items-center">
          <div className="w-8 h-8 rounded-full bg-gray-800"></div>
          <div className="w-32 h-4 bg-gray-800 rounded"></div>
        </div>
        <div className="w-20 h-4 bg-gray-800 rounded"></div>
      </div>

      {/* Title Skeleton */}
      <div className="p-1 w-full h-8 bg-gray-800 rounded"></div>

      {/* Tags Skeleton */}
      <div className="p-1 flex gap-2 flex-wrap">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="px-4 py-2 bg-gray-800 rounded-md w-16 h-6"
          ></div>
        ))}
      </div>

      {/* Footer Skeleton */}
      <div className="flex flex-row justify-between p-1 items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
            <div className="w-6 h-4 bg-gray-800 rounded"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
            <div className="w-6 h-4 bg-gray-800 rounded"></div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
          <div className="w-6 h-4 bg-gray-800 rounded"></div>
        </div>
        <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
