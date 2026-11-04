import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BlogContext from "../BlogContext";

const BlogDetail = () => {
  const { id } = useParams(); // from path="/blogs/:id"  ->  "/blogs/2" gives id = "2"
  const { posts } = useContext(BlogContext);
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === id); // ids are strings

  // A valid URL shape but the post doesn't exist (e.g. /blogs/999)
  if (!post) {
    return (
      <div style={{ padding: 12 }}>
        <h1>Post not found</h1>
        <Link to="/blogs">Back to blogs</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 12 }}>
      <button onClick={() => navigate(-1)}>&larr; Back</button> {/* -1 = browser Back */}
      <h1>{post.title}</h1>
      <small>by {post.author}</small>
      <p>{post.body}</p>
    </div>
  );
};

export default BlogDetail;
