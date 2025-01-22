import React, { useEffect } from "react";
import { ArrowUp, ArrowDown, MessageSquare, Share2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import useVoteStore from "../stores/voteStore.js";

const PostCard = (props) => {
  const queryClient = useQueryClient();
<<<<<<< HEAD
  const navigate = useNavigate();
=======

>>>>>>> 7ccc958a6a5ac6df1216cb6634a6a37051f11d1f
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const randomAvatarUrl = `https://robohash.org/${
    props.post.author || "default"
  }?set=set2&size=50x50`;

  // Get vote counts and status from Zustand global state
  const { votes, voteStatus, setVotes, setVoteStatus } = useVoteStore();
  const postVotes = votes[props.post._id] || {
    upvote: props.post.upvote.length,
    downvote: props.post.downvote.length,
  };
  const postVoteStatus = voteStatus[props.post._id] || {
    isUpvoted: false,
    isDownvoted: false,
  };

<<<<<<< HEAD
  useEffect(() => {
    // Initialize vote status when component mounts
    if (authUser) {
      setVoteStatus(
        props.post._id,
        props.post.upvote.includes(authUser._id),
        props.post.downvote.includes(authUser._id)
      );
    }else{
      setVoteStatus(props.post._id, false, false);
    }
  }, [
    authUser,
    props.post._id,
    props.post.upvote,
    props.post.downvote,
    setVoteStatus,

  ]);

  const invalidatePostsQuery = () => {
    queryClient.invalidateQueries(["posts"]);
  };
=======
  const [upvoteCount, setUpvoteCount] = useState(props.post.upvote.length);
  const [isDownvoted, setIsDownvoted] = useState(
    authUser ? props.post.downvote.includes(authUser._id) : false
  );
  const [downvoteCount, setDownvoteCount] = useState(
    props.post.downvote.length
  );

  //upvote logic
>>>>>>> 7ccc958a6a5ac6df1216cb6634a6a37051f11d1f

  const upvoteMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(`/posts/upvote/${props.post._id}`);
    },
    onMutate: () => {
      setVotes(props.post._id, postVotes.upvote + 1, postVotes.downvote);
      if (postVoteStatus.isDownvoted) {
        setVotes(props.post._id, postVotes.upvote + 1, postVotes.downvote - 1);
      }
      setVoteStatus(props.post._id, true, false);
    },
    onError: () => {
      setVotes(props.post._id, postVotes.upvote, postVotes.downvote);
      if (postVoteStatus.isDownvoted) {
        setVotes(props.post._id, postVotes.upvote, postVotes.downvote);
        setVoteStatus(props.post._id, false, true);
      } else {
        setVoteStatus(props.post._id, false, false);
      }
    },
    onSettled: invalidatePostsQuery,
  });

  const deleteUpvoteMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/posts/delete-upvote/${props.post._id}`);
    },
    onMutate: () => {
      setVotes(props.post._id, postVotes.upvote - 1, postVotes.downvote);
      setVoteStatus(props.post._id, false, false);
    },
    onError: () => {
      setVotes(props.post._id, postVotes.upvote, postVotes.downvote);
      setVoteStatus(props.post._id, true, false);
    },
    onSettled: invalidatePostsQuery,
  });

  const handleUpvote = () => {
    if(authUser){
      if (postVoteStatus.isUpvoted) {
        deleteUpvoteMutation.mutate();
      } else {
        upvoteMutation.mutate();
      }
    }else{
      navigate("/login");
    }
  };

<<<<<<< HEAD
=======
  //DownVote Logic

>>>>>>> 7ccc958a6a5ac6df1216cb6634a6a37051f11d1f
  const downvoteMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(`/posts/downvote/${props.post._id}`);
    },
    onMutate: () => {
<<<<<<< HEAD
      setVotes(props.post._id, postVotes.upvote, postVotes.downvote + 1);
      if (postVoteStatus.isUpvoted) {
        setVotes(props.post._id, postVotes.upvote - 1, postVotes.downvote + 1);
      }
      setVoteStatus(props.post._id, false, true);
    },
    onError: () => {
      setVotes(props.post._id, postVotes.upvote, postVotes.downvote);
      if (postVoteStatus.isUpvoted) {
        setVotes(props.post._id, postVotes.upvote, postVotes.downvote);
        setVoteStatus(props.post._id, true, false);
      } else {
        setVoteStatus(props.post._id, false, false);
=======
      setDownvoteCount(downvoteCount + 1);
      if (isUpvoted) {
        setUpvoteCount(upvoteCount - 1);
        setIsUpvoted(false);
      }
      setIsDownvoted(true);
    },
    onError: () => {
      setDownvoteCount(downvoteCount - 1);
      if (isUpvoted) {
        setUpvoteCount(upvoteCount + 1);
        setIsUpvoted(true);
>>>>>>> 7ccc958a6a5ac6df1216cb6634a6a37051f11d1f
      }
    },
    onSettled: invalidatePostsQuery,
  });

  const deleteDownvoteMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/posts/delete-downvote/${props.post._id}`);
    },
    onMutate: () => {
<<<<<<< HEAD
      setVotes(props.post._id, postVotes.upvote, postVotes.downvote - 1);
      setVoteStatus(props.post._id, false, false);
=======
      setDownvoteCount(downvoteCount - 1);
      setIsDownvoted(false);
>>>>>>> 7ccc958a6a5ac6df1216cb6634a6a37051f11d1f
    },
    onError: () => {
      setVotes(props.post._id, postVotes.upvote, postVotes.downvote);
      setVoteStatus(props.post._id, false, true);
    },
    onSettled: invalidatePostsQuery,
  });

  const handleDownvote = () => {
    if(authUser){
      if (postVoteStatus.isDownvoted) {
        deleteDownvoteMutation.mutate();
      } else {
        downvoteMutation.mutate();
      }
    }else{
      navigate("/login");
    }
  };
 
  return (
    <div className="flex flex-col w-[95%] mx-2 my-4 p-2 border border-white bg-black gap-2 cursor-pointer hover:bg-slate-900 transition duration-300" onClick={() => navigate(`/post/${props.post._id}`)} >
      <div className="flex flex-row w-full justify-between p-1">
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={(e) =>{
            e.stopPropagation();
            navigate(`/user/${props.post.author._id}`);
          }}
        >
          <img
            src={randomAvatarUrl || "/placeholder.svg"}
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
          <button className="flex items-center gap-1" onClick={(e)=>{
            e.stopPropagation();
            handleUpvote();
          }}>
            <ArrowUp
              size={20}
              className={postVoteStatus.isUpvoted ? "text-green-500" : ""}
            />
            {postVotes.upvote}
          </button>
          <button className="flex items-center gap-1" onClick={(e)=>{
            e.stopPropagation();
            handleDownvote();
          }}>
            <ArrowDown
              size={20}
              className={postVoteStatus.isDownvoted ? "text-red-500" : ""}
            />
            {postVotes.downvote}
          </button>
        </div>
        <button className="flex items-center gap-1">
          <MessageSquare size={20} /> {props.post.comments.length}
        </button>
        <button className="flex items-center gap-1">
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
