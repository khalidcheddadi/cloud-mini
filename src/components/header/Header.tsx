
import Link from 'next/link';
import styles from './header.module.css';
import React from 'react';
import {
  AiOutlineLogin,
  AiOutlineUserAdd
} from "react-icons/ai";
import Navbar from './navbar';
import { verifyTokenForPage } from '@/utils/verifyToken';
import LogoutButton from './LogoutButton';
import { cookies } from 'next/headers';

const Header = async () => {
  const token = (await cookies()).get("jwtToken")?.value || "";
  const UserPayloadToken = verifyTokenForPage(token);
  return (
    <header className={styles.header}>
     <Navbar isAdmin={UserPayloadToken?.isAdmin || false} />

      <div className={styles.authButtons}>
        {UserPayloadToken 
        ?
        (<>
          <strong>{UserPayloadToken?.username}</strong>
          <LogoutButton />
        </>) 
        : 
        (
        <>
          <Link href="/login" className={styles.loginBtn}>
          Login <AiOutlineLogin />
        </Link>
        <Link href="/register" className={styles.registerBtn}>
          Register <AiOutlineUserAdd />
        </Link>
        </>
        )}
      </div>
    </header>
  );
};

export default Header;
