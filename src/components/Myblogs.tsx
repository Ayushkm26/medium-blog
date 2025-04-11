import { Appbar } from "../components/Appbar";
import { Blogcard } from "../components/Blogcard";
import { userMultipleBlog } from "../hooks";
import { BlogSkeleton } from "./BlogSkelton" // Fixed typo from BlogSkelton to BlogSkeleton

export const Myblogs = () => {
    const { loading, blogs } = userMultipleBlog();

    if (loading) {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center">
                    <div>
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        );
    }

   

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="max-w-4xl">
                    {blogs && blogs.length > 0 ? (
                        blogs
                            .slice()
                            .reverse()
                            .map(blog => (
                                <Blogcard
                                    key={blog.id}
                                    id={blog.id}
                                    authorName={blog.author.name || "anonymous"}
                                    title={blog.title}
                                    content={blog.content}
                                    publishDate={blog.publishedDate}
                                    imageurl={blog.imageurl}
                                />
                            ))
                    ) : (
                        <p>No blogs available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};