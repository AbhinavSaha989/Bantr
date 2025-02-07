import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, MessageSquare, Share2, Trash } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import useVoteStore from "@/stores/voteStore";

const PostCard = (props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { votes, voteStatus, setVotes, setVoteStatus } = useVoteStore();

  const postId = props.post._id;

  const [isVoting, setIsVoting] = useState(false);

  const randomAvatarUrl = `https://robohash.org/${
    props.post.author || "default"
  }?set=set2&size=50x50`;

  // Initialize vote state from post data
  useEffect(() => {
    if (authUser) {
      setVoteStatus(
        postId,
        props.post.upvote.includes(authUser._id),
        props.post.downvote.includes(authUser._id)
      );
    }
    setVotes(postId, props.post.upvote.length, props.post.downvote.length);
  }, [authUser, props.post.upvote, props.post.downvote, postId]);

  const invalidatePostsQuery = () => {
    queryClient.invalidateQueries(["posts"]);
  };

  const voteMutation = useMutation({
    queryKey: ["vote"],
    mutationFn: async ({ action, voteType }) => {
      setIsVoting(true);
      if (action === "add") {
        await axiosInstance.post(`/posts/${voteType}/${postId}`);
      } else {
        await axiosInstance.delete(`/posts/delete-${voteType}/${postId}`);
      }
    },
    onSuccess: (_, { action, voteType }) => {
      invalidatePostsQuery();
      const isUpvote = voteType === "upvote";
      const isCurrentlyVoted = isUpvote
        ? voteStatus[postId]?.isUpvoted
        : voteStatus[postId]?.isDownvoted;

      setVoteStatus(
        postId,
        isUpvote ? !isCurrentlyVoted : voteStatus[postId]?.isUpvoted,
        isUpvote ? voteStatus[postId]?.isDownvoted : !isCurrentlyVoted
      );
      setVotes(
        postId,
        votes[postId].upvote + (isUpvote ? (action === "add" ? 1 : -1) : 0),
        votes[postId].downvote + (!isUpvote ? (action === "add" ? 1 : -1) : 0)
      );

      toast.success(
        `${voteType === "upvote" ? "Upvoted" : "Downvoted"} successfully`
      );
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "An error occurred while voting."
      );
    },
    onSettled: () => {
      setIsVoting(false);
    },
  });

  const handleVote = (voteType) => {
    if (!authUser) {
      navigate("/login");
      return;
    }

    if (isVoting) return;

    const isCurrentlyVoted =
      voteType === "upvote"
        ? voteStatus[postId]?.isUpvoted
        : voteStatus[postId]?.isDownvoted;
    const action = isCurrentlyVoted ? "remove" : "add";

    voteMutation.mutate({ action, voteType });
  };

  const deleteMutation = useMutation({
      mutationFn: async () => {
        await axiosInstance.delete(`/posts/${postId}`);
      },
      onSuccess: () => {
        invalidatePostsQuery();
      }
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <>
      <Card
        className="flex flex-col w-[95%] mx-2 my-4 p-4 border gap-4 cursor-pointer transition hover:shadow-lg bg-muted"
        onClick={() => navigate(`/post/${postId}`)}
      >
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/user/${props.post.author._id}`);
            }}
          >
            <Avatar>
              <AvatarImage src={randomAvatarUrl || "/placeholder.svg"} />
            </Avatar>
            <p>{props.post.author.username}</p>
          </div>
          {authUser && props.post.author._id === authUser._id && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                <Trash size={20} />
              </Button>
            </div>
          )}
          <p>
            {formatDistanceToNow(new Date(props.post.createdAt), {
              addSuffix: true,
            }).replace("about", "")}
          </p>
        </div>

        <h2 className="text-2xl font-semibold break-words">
          {props.post.title}
        </h2>
        <div className="flex gap-2 flex-wrap">
          {props.post.tags.map((tag, index) => (
            <div
              key={index}
              className="px-2 py-1 bg-chart-4 rounded-md text-sm"
            >
              {tag}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              disabled={isVoting}
              onClick={(e) => {
                e.stopPropagation();
                handleVote("upvote");
              }}
            >
              <ArrowUp
                size={20}
                className={voteStatus[postId]?.isUpvoted ? "text-chart-5" : ""}
              />
              <span>{votes[postId]?.upvote || 0}</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              disabled={isVoting}
              onClick={(e) => {
                e.stopPropagation();
                handleVote("downvote");
              }}
            >
              <ArrowDown
                size={20}
                className={
                  voteStatus[postId]?.isDownvoted ? "text-chart-4" : ""
                }
              />
              <span>{votes[postId]?.downvote || 0}</span>
            </Button>
          </div>
          <Button variant="ghost" size="icon">
            <MessageSquare size={20} /> {props.post.comments.length}
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 size={20} />
          </Button>
        </div>
      </Card>
      <Separator className="my-2" />
    </>
  );
};

export default PostCard;
