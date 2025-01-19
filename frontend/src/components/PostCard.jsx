import React, { useState } from "react";
import { ArrowUp, ArrowDown, MessageSquare, Share2 } from "lucide-react";
import { useMutation,useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { formatDistanceToNow } from "date-fns";

const PostCard = (props) => {

  const queryClient = useQueryClient();

  const { data: authUser } = useQuery({queryKey: ['authUser']});

  const randomAvatarUrl = `https://robohash.org/${
    props.post.author || "default"
  }?set=set2&size=50x50`;

  const [isUpvoted, setIsUpvoted] = useState(
    authUser ? props.post.upvote.includes(authUser._id) : false
  );


  const [upvoteCount, setUpvoteCount] = useState(props.post.upvote.length);
  const [isDownvoted, setIsDownvoted] = useState(
    authUser ? props.post.downvote.includes(authUser._id) : false
  )
  const [downvoteCount, setDownvoteCount] = useState(props.post.downvote.length);


  //upvote logic

  const upvoteMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(`/posts/upvote/${props.post._id}`);
    },
    onMutate: () => {
      setUpvoteCount(upvoteCount + 1);
      if (isDownvoted) {
        setDownvoteCount(downvoteCount - 1);
        setIsDownvoted(false);
      }
      setIsUpvoted(true);
    },
    onError: () => {
      setUpvoteCount(upvoteCount - 1);
      if (isDownvoted) {
        setDownvoteCount(downvoteCount + 1);
        setIsDownvoted(true);
      }
      setIsUpvoted(false);
    },
  });

  const deleteUpvoteMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/posts/delete-upvote/${props.post._id}`);
    },
    onMutate: () => {
      setUpvoteCount(upvoteCount - 1);
      setIsUpvoted(false);
    },
    onError: () => {
      setUpvoteCount(upvoteCount + 1);
      setIsUpvoted(true);
    },
  });

  const handleUpvote = () => {
    if (isUpvoted) {
      deleteUpvoteMutation.mutate();
    } else {
      upvoteMutation.mutate();
    }
  };




  //DownVote Logic

  const downvoteMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(`/posts/downvote/${props.post._id}`);
    },
    onMutate: () => {
      setDownvoteCount(downvoteCount + 1);
      if(isUpvoted){
        setUpvoteCount(upvoteCount - 1);
        setIsUpvoted(false);
      }
      setIsDownvoted(true);

    },
    onError: () => {
      setDownvoteCount(downvoteCount - 1);
      if(isUpvoted){
        setUpvoteCount(upvoteCount + 1);
        setIsUpvoted(true);
      }
      setIsDownvoted(false);
    },
  });


  const deleteDownvoteMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/posts/delete-downvote/${props.post._id}`);
    },
    onMutate: () => {
      setDownvoteCount(downvoteCount - 1); 
      setIsDownvoted(false);
    },
    onError: () => {
      setDownvoteCount(downvoteCount + 1);
      setIsDownvoted(true);
    },
  });

  const handleDownvote = () => {
    if (isDownvoted) {
      deleteDownvoteMutation.mutate();
    } else {
      downvoteMutation.mutate();
    }
  };
  return (
    <div className="flex flex-col w-[95%] mx-2 my-4 p-2 border border-white bg-black gap-2">
      <div className="flex flex-row w-full justify-between p-1">
        <div className="flex flex-row gap-2 items-center">
          <img
            src={randomAvatarUrl}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <p>{props.post.author.username}</p>
        </div>
        <p>
          {formatDistanceToNow(new Date(props.post.createdAt), {
            addSuffix: true,
          }).replace("about", "")}
        </p>
      </div>

      <div className="p-1 text-4xl break-words">{props.post.title}</div>
      {/* {props.post.image && (
       <div> <img src={props.post.image}></img> </div>)} // to be handled later */}
      <div className="p-1 break-words flex gap-2 flex-wrap">
        {props.post.tags.map((tag, index) => (
          <div
            key={index}
            className="px-2 py-1 bg-gray-800 text-white rounded-md text-sm"
          >
            {tag}
          </div>
        ))}
      </div>

      <div className="flex flex-row justify-between p-1 items-center">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1" onClick={handleUpvote}>
            <ArrowUp size={20} className={isUpvoted ? "text-green-500" : ""} />
            {upvoteCount}
          </button>
          <button className="flex items-center gap-1" onClick={handleDownvote}>
            <ArrowDown
              size={20}
              className={isDownvoted ? "text-red-500" : ""}
            />{" "}
            {downvoteCount}
          </button>
        </div>
        <button className="flex items-center gap-1">
          <MessageSquare size={20} /> {props.post.comments.length}
        </button>
        <button className="flex items-center gap-1">
          <Share2 size={20} /> {/* Share icon */}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
