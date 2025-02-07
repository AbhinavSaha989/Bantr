import { useQueryClient, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { Image, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [words, setWords] = useState(0);

  const {toast} = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/posts", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Post created successfully.",
      })
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.response.data.message,
      });
    },
  });

  const handleCreation = async (event) => {
    event.preventDefault();
    try {
      if (!title || !content || tags.length === 0) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Please fill in all the required fields.",
        });
        return;
      }
      const postData = {title, content, tags};
      if(image){
        postData.image = await readFileAsDataURL(image);
      }  
      createPost(postData);
    } catch (error) {
      
    }
  };

  const handleSetTags = (event) => {
    if ((event.key === " " || event.nativeEvent.inputType === "insertText") && tag.trim() !== "") {
      setTags([...tags, tag.trim()]);
      setTag("");
    } else if (event.key === "Backspace" && tag === "" && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };



  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    if(file){
      readFileAsDataURL(file).then(setImagePreview);
    }else{
      setImagePreview(null);
    }
  }

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <Card className="min-h-screen w-full md:w-2/3 border mx-2 overflow-auto mt-2 flex flex-col transition-all duration-300">
      <CardContent className="p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4">
            Create a Post
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleCreation} className="flex flex-col gap-4">
          {/* Title Input with Animated Label */}
          <div className="relative">
            <Input
              id="title"
              type="text"
              placeholder=" "
              value={title}
              maxLength={300}
              onChange={(e) => {
                setTitle(e.target.value);
                setWords(e.target.value.length);
              }}
              className="w-full p-7 bg-background border-input focus:ring-ring peer"
            />
            <Label
              htmlFor="title"
              className={`absolute left-3 top-4 text-sm text-muted-foreground transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-muted-foreground peer-focus:translate-y-[-12px] peer-focus:text-primary peer-focus:text-[0.6rem] ${
                title.length > 0
                  ? "translate-y-[-12px] text-primary text-[0.6rem]"
                  : ""
              }`}
            >
              Title
            </Label>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <p className="text-sm font-medium">{words}/300</p>
          </div>

          {/* Content Input */}
          <div>
            <Label htmlFor="content" className="block mb-1 text-sm font-medium">
              Content
            </Label>
            <Textarea
              id="content"
              placeholder="What do you want to talk about?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full p-3 bg-background border-input focus:ring-ring"
            />
          </div>
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="w-[75%] object-cover" />
          )}
          <div>
            <label className="flex items-center">
              <Image size={24} />
              <span>Photo</span>
              <Input type="file" accept="image/*" className="hidden" onChange={handleImageChange}/>
            </label>
          </div>

          {/* Tags Input */}
          <div>
            <Label htmlFor="tags" className="block mb-1 text-sm font-medium">
              Tags
            </Label>
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((t, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="flex items-center gap-3 px-3 py-1 text-sm font-medium"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              <Input
                id="tags"
                type="text"
                placeholder="Add a tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={handleSetTags}
                className="p-2 bg-background border-input focus:ring-ring"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Add tags using a space
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-[20%] self-end"
          >
            {isLoading ? <Loader className="animate-spin" /> : "Create"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
