import AddArticlesForm from "./AddArticlesForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";

const AdminPage = async () => {
    const token = (await cookies()).get("jwtToken")?.value || "";
    if(!token){
      redirect("/");
    }
    const payload = verifyTokenForPage(token);
    if(payload?.isAdmin === false){
      redirect("/");
    } 
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          لوحة التحكم - إضافة مقالات
        </h1>

        <div className="border-t border-gray-200 pt-6">
          <AddArticlesForm />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
