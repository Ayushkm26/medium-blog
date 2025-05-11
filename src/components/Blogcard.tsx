import { Link } from "react-router-dom";
//@ts-ignore
import DOMPurify from "dompurify";


interface BlogcardProps {
    id: number;
    authorName: string;
    title: string;
    content: string;
    publishDate: string;
    imageurl?: string; // Made imageurl optional
}

export const Blogcard = ({
    id,
    authorName,
    title,
    content,
    publishDate,
    imageurl
}: BlogcardProps) => {
    return (
        <Link to={`/blog/${id}`} className="overflow-hidden">
            <div className="border-b border-slate-200 p-4 pb-4 w-full cursor-pointer overflow-hidden">
                <div className="flex">
                    <div className="flex justify-center flex-col">
                        <Avatar name={authorName} />
                    </div>

                    <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                        {authorName}
                    </div>

                    <div className="flex justify-center flex-col pl-2">
                        <Circle />
                    </div>

                    <div className="pl-2 font-thin text-slate-400 text-sm flex justify-center flex-col">
                        {publishDate}
                    </div>
                </div>

                <div className="flex items-center pt-2">
                    <div className="text-xl font-semibold">
                        {title}
                    </div>

                    {imageurl && (
                        <img
                            src={imageurl}
                            alt={`Image for ${title}`} // Added meaningful alt text
                            className="ml-4 rounded-lg shadow-md w-32 h-auto"
                        />
                    )}
                </div>

                <div
  className="text-md font-thin overflow-hidden"
  dangerouslySetInnerHTML={{
    __html:
      content.length > 100
        ? DOMPurify.sanitize(content.slice(0, 100)) + "..."
        : DOMPurify.sanitize(content),
  }}
></div>

                <div className="text-slate-400 text-sm font-thin pt-3">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            </div>
        </Link>
    );
}

interface AvatarProps {
    name: string;
    size?: "small" | "big";
}

export function Avatar({ name, size = "small" }: AvatarProps) {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-400 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
            <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-white`}>
                {name[0]}
            </span>
        </div>
    );
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}