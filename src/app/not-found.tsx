import Link from "next/link";
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 p-4">
      
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-indigo-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-4">الصفحة غير موجودة</h2>
          <p className="text-lg text-gray-600 mb-6">
            عذراً، لا يمكننا العثور على الصفحة التي تبحث عنها.
          </p>
        </div>

        <Link 
          href="/" 
          className={`inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md
             hover:bg-indigo-700 transition duration-300 hover:shadow-lg
              transform hover:-translate-y-1 ${styles.button}`}
        >
          العودة إلى الصفحة الرئيسية
        </Link>
        
        <div className="mt-12 text-sm text-gray-500">
          <p>إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع الدعم الفني.</p>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage;