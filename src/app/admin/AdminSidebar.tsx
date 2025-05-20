import Link from "next/link";
import { CgMenuGridR, CgUserList } from "react-icons/cg";
import { HiOutlineChartBar } from "react-icons/hi";
import { FaChartPie } from "react-icons/fa";


const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Link href="/admin">
          <CgMenuGridR size={30} />
        </Link>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link href="/admin">
              <CgMenuGridR size={20} /> Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/articles-table?pageNumber=1">
              <CgUserList size={20} /> articles table
            </Link>
          </li>
          <li>
            <Link href="/admin/comments-table">
              <HiOutlineChartBar size={20} /> comments table
            </Link>
          </li>
          <li>
            <Link href="/admin/stats">
              <FaChartPie size={20} /> Statistics
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
