"use client";
import React, { FC } from "react";
import ButtonAction from "../../../components/ButtonAction";
import BackButton from "../../../components/BackButton";
import prismadb from "@/libs/prismadb";

interface BlogDetailPageProps {
  params: {
    id: string;
    title: string;
    content: string;
    Tag: {
      name: string;
    };
  };
}

async function getPost(id: string) {
  const response = await prismadb.post.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      Tag: true,
    },
  });
  return response;
}

const BlogDetailPage: FC<BlogDetailPageProps> = ({ params }) => {
  const post = getPost(params.id);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto my-8 relative">
      <BackButton />
      <h1 className="text-4xl font-bold my-4 text-gray-800">{params?.title}</h1>
      <p className="text-gray-700 text-lg">{params?.content}</p>
      <div className="absolute bottom-6 right-6">
        <ButtonAction id={params.id} />
      </div>
      <div className="flex items-center space-x-4 mt-4">
        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
          {params?.Tag.name}
        </span>
      </div>
    </div>
  );
};

export default BlogDetailPage;
