import React, {useState} from 'react'
import { useQuery } from '@tanstack/react-query'
const UpdatePost = ({postId}) => {
    const [title, setTitle] = useState(`${post.title}`);
    const [image, setImage] = useState(null);
    const [content, setContent] = useState( `${post.content}`);
    const [tags, setTags] = useState(post.tags);
    const [tag, setTag] = useState("");
    const [words, setWords] = useState(`${post.title.length}`);

    const {data: post, isLoading} = useQuery({
        queryKey: ['post', postId],
    });

    return (
      <Card className="min-h-screen w-full md:w-2/3 border mx-2 overflow-auto mt-2 flex flex-col transition-all duration-300">
        <CardContent className="p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-4">
              Update your Post
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleCreation} className="flex flex-col gap-4">
            {/* Title Input with Animated Label */}
            <div className="relative">
              <Input
                id="title"
                type="text"
                placeholder=""
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
              <Label
                htmlFor="content"
                className="block mb-1 text-sm font-medium"
              >
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
}

export default UpdatePost