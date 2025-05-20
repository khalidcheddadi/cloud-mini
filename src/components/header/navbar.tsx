"use client";

import Link from "next/link";
import {
  AiOutlineAppstore,
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineUser
} from "react-icons/ai";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import styles from './header.module.css';
import { useState } from "react";

interface NavbarProps {
  isAdmin: boolean;
}

const Navbar = ({ isAdmin }: NavbarProps) => {
  const [Toggle, setToggle] = useState(false);

  return (
    <nav>
      <div className={styles.navTop}>
        <Link href="/" className={styles.logo}>
          Cloud Hosting <AiOutlineAppstore />
        </Link>
        <div className={styles.menu}>
          {Toggle ? (
            <IoMdClose onClick={() => setToggle(prev => !prev)} />
          ) : (
            <CiMenuFries onClick={() => setToggle(prev => !prev)} />
          )}
        </div>
      </div>

      <div className={`${styles.NavLinksWrapper} ${Toggle ? styles.active : ''}`}>
        <ul>
          <li>
            <Link onClick={() => setToggle(false)} href="/">
              Home <AiOutlineHome />
            </Link>
          </li>
          <li>
            <Link onClick={() => setToggle(false)} href="/articles?pageNumber=1">
              Articles <AiOutlineAppstore />
            </Link>
          </li>
          {isAdmin && (
            <li>
            <Link onClick={() => setToggle(false)} href="/admin">
              Admin Dashboard <AiOutlineUser />
            </Link>
          </li>
          )}
          <li>
            <Link onClick={() => setToggle(false)} href="/about">
              About <AiOutlineInfoCircle />
            </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
