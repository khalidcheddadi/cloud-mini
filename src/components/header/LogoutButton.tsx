"use client";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { FiLogOut } from 'react-icons/fi'; // ✅ أيقونة تسجيل الخروج
import { useRouter } from 'next/navigation';


const LogoutButton = () => {
    const router = useRouter();
    const LogoutHandler = async () => {
        try {
            await axios.get(`${DOMAIN}/api/users/logout`);
            router.push("/");
            router.refresh();
        } catch (error) {
            toast.warning("something went wrong")
        }
    }
  return (
    <button onClick={LogoutHandler} className="">
        logout  <FiLogOut />
    </button>
  )
}

export default LogoutButton;