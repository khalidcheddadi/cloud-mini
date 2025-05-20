"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteArticleButtonProps {
    articleId: number;
}

const DeleteArticleButton = ({ articleId }: DeleteArticleButtonProps) => {
    const router = useRouter();

    const deleteArticleHandler = async () => {
        try {
            if (confirm("you want to delete this article, Are you sure?")) {
                await axios.delete(`${DOMAIN}/api/articles/${articleId}`);
                router.refresh();
                toast.success("article deleted");
            }
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
    }

    return (
        <button onClick={deleteArticleHandler}>
            Delete
        </button>
    )
}

export default DeleteArticleButton