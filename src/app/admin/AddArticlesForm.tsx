"use client"

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "react-toastify";


const AddArticlesForm = () => {
  const router = useRouter();
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");

    const formSubmitHandler = async (e:React.FormEvent) => {
        e.preventDefault();

        if(title === "") return toast.error("title is required")
        if(description === "") return toast.error("description is required")

        try {
            
            await axios.post(`${DOMAIN}/api/articles`, { title, description });
            settitle("");
            setdescription("");
            toast.success("new article adedd");
            router.refresh();
          } catch (error:any) {
            toast.error(error?.response?.data.message)
            
          }
    }
  return (
    <div>
        
        <form onSubmit={formSubmitHandler} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="title" style={styles.label}> title</label>
            <input
              type="text"
              id="title"
              placeholder="example@example.com"
              style={styles.input}
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </div>

<div style={styles.inputGroup}>
  <label htmlFor="description" style={styles.label}>المحتوى  </label>
  <textarea
    id="description"
    placeholder="Enter description ...."
    style={styles.textarea}
    value={description}
    onChange={(e) => setdescription(e.target.value)}
  />
</div>


          <button type="submit" style={styles.button}>
            Add post
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
  textarea: {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #333",
  backgroundColor: "#000",
  color: "#fff",
  fontSize: "16px",
  outline: "none",
  transition: "border 0.3s",
  resize: "vertical", // يمكنك تغييره إلى "none" إذا كنت لا تريد تمكين تغيير الحجم
  minHeight: "100px"
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


export default AddArticlesForm