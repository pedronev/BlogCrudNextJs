import Link from "next/link";
import React, { FC } from "react";
import { Tag } from "@prisma/client";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    Tag: Tag;
  };
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const { title, content, Tag, id } = post;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg block bg-white hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
      <div className="relative">
        <img
          src="https://picsum.photos/600/400" // Replace with your image URL
          alt={title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
          {Tag.name}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">{title}</h2>
        <p className="text-gray-600">
          {content.length > 33 ? content.slice(0, 33) + "..." : content}
        </p>
        <div className="mt-4">
          <Link href={`/blog/${id}`} className="text-blue-500 hover:underline">
            Read more...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
