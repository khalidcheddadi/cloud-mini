import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#f0f4ff] to-[#e0e7ff] p-6">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-10 max-w-lg w-full text-center border border-gray-200 animate-fade-in" dir="rtl">
        <h1 className="text-8xl font-extrabold text-indigo-600 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">الصفحة غير موجودة</h2>
        <p className="text-gray-600 mb-6 text-base md:text-lg">
          عذراً، لا يمكننا العثور على الصفحة التي تبحث عنها. ربما تم نقلها أو حذفها.
        </p>

        <Link href="/" passHref>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
            العودة للصفحة الرئيسية
            <FaArrowRight className="text-sm" />
          </div>
        </Link>

        <p className="text-sm text-gray-400 mt-8">
          إذا استمرت المشكلة، يرجى التواصل مع الدعم الفني.
        </p>
      </div>
    </section>
  );
};

export default NotFoundPage;
