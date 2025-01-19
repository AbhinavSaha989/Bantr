import { useQueryClient, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [words, setWords] = useState(0);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/posts", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "An error occurred.");
    },
  });

  const handleCreation = (event) => {
    event.preventDefault();
    if (!title || !content) {
      toast.error("Title and Content are required.");
      return;
    }
    createPost({ title, content, tags });
  };

  const handleSetTags = (event) => {
    if (event.key === " " && tag.trim() !== "") {
      setTags([...tags, tag.trim()]);
      setTag("");
    } else if (event.key === "Backspace" && tag === "" && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <section className="min-h-screen w-full md:w-2/3 mx-auto  text-white py-8 px-4 bg-black backdrop-blur-md bg-opacity-30 border border-gray-300 mt-2">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
        <form onSubmit={handleCreation} className="flex flex-col gap-4">
          {/* Title Input with Animated Label */}
          <div className="relative">
            <input
              id="title"
              type="text"
              placeholder=" "
              value={title}
              maxLength={300}
              onChange={(e) => {
                setTitle(e.target.value);
                setWords(e.target.value.length);
              }}
              className="w-full p-3 bg-transparent border border-gray-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />
            <label
              htmlFor="title"
              className={`absolute left-3 top-3 text-sm text-gray-400 transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:translate-y-[-12px] peer-focus:text-blue-400 peer-focus:text-[0.6rem]`}
            >
              Title
            </label>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <p className="text-sm font-medium ">{words}/300</p>
          </div>

          {/* Content Input */}
          <div>
            <label htmlFor="content" className="block mb-1 text-sm font-medium">
              Content
            </label>
            <textarea
              id="content"
              placeholder="What do you want to talk about?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              className="w-full p-3 bg-transparent border border-gray-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Tags Input */}
          <div>
            <label htmlFor="tags" className="block mb-1 text-sm font-medium">
              Tags
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((t, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 px-3 py-1 bg-transparent border border-gray-300 text-white rounded-full text-sm font-medium"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="text-white  rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
              <input
                id="tags"
                type="text"
                placeholder="Add a tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={handleSetTags}
                className="p-2 bg-transparent border border-gray-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-sm font-thin mt-3">Add tags using a space</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-[20%] p-3 rounded-lg font-medium flex items-center justify-center self-end text-white border border-gray-300 ${
              isLoading ? "bg-gray-600 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? <Loader className="animate-spin" /> : "Create Post"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
