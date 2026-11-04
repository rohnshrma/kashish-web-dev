import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBlogs } from "../context/BlogContext";

const NewPost = () => {
  const { user } = useAuth();
  const { addPost } = useBlogs();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    const id = String(Date.now()); // simple unique id (string, like URL params)
    addPost({ id, title, body, author: user.name });
    navigate(`/blogs/${id}`); // go to the new post's page
  };

  return (
    <form onSubmit={submitHandler}>
      <input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <textarea placeholder="write something..." value={body} onChange={(e) => setBody(e.target.value)} />
      <br />
      <button>Publish</button>
    </form>
  );
};

export default NewPost;
