"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface ButtonActionProps {
  id: string;
}

const ButtonAction: FC<ButtonActionProps> = ({ id }) => {
  const router = useRouter();
  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/posts/${id}`);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  return (
    <div className="flex space-x-2">
      <Link href={`/edit/${id}`} className="btn btn-primary">
        <Pencil size={20} className="mr-2" />
        Edit
      </Link>
      <button onClick={() => deletePost()} className="btn btn-error">
        {isPending ? (
          <span className="loading loading-spinner mr-2"></span>
        ) : (
          <Trash size={20} className="mr-2" />
        )}
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default ButtonAction;
