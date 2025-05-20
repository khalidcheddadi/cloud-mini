"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import ButtonSpinner from "@/components/ButtonSpinner";




const LoginForm = () => {
    const router = useRouter();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setLoading] = useState(false);

    const formSubmitHandler = async (e:React.FormEvent) => {
        e.preventDefault();

        if(email === "") return toast.error("email is required")
        if(password === "") return toast.error("password is required")

          try {
            setLoading(true);
            await axios.post(`${DOMAIN}/api/users/login`, { email, password });
            router.replace('/');

            router.refresh();
          } catch (error:any) {
            toast.error(error?.response?.data.message)
            setLoading(false);
          }

    }
  return (
    <div>
        
        <form onSubmit={formSubmitHandler} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              placeholder="example@example.com"
              style={styles.input}
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>كلمة المرور</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              style={styles.input}
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          <button disabled={loading} type="submit" style={styles.button}>
            {loading ? (
              <div className="flex items-center justify-center">
                <ButtonSpinner />
                <span className="ml-2">loading ...</span>
              </div>
            ) : (
              "Login"
            )}
        </button>

        </form>

    </div>
  )
}


const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "8px",
    fontSize: "14px",
    color: "#ccc",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #333",
    backgroundColor: "#000",
    color: "#fff",
    fontSize: "16px",
    outline: "none",
    transition: "border 0.3s",
  },
  button: {
    padding: "14px",
    backgroundColor: "#fff",
    color: "#000",
    fontWeight: "bold",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    transition: "background 0.3s, color 0.3s",
  },
  
};


export default LoginForm