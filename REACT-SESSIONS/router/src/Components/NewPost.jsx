import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import BlogContext from "../BlogContext";

const NewPost = () => {
  const { user } = useContext(AuthContext);
  const { addPost } = useContext(BlogContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    const id = uuidv4();
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
