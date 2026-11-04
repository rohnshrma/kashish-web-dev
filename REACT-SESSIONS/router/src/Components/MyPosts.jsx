import { useContext } from "react";
import AuthContext from "../AuthContext";
import BlogContext from "../BlogContext";

// Shows only the logged-in user's posts, with a delete button.
const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const { posts, deletePost } = useContext(BlogContext);
  const mine = posts.filter((p) => p.author === user.name);

  if (mine.length === 0) return <p>You have no posts yet.</p>;

  return mine.map((p) => (
    <div key={p.id}>
      {p.title} <button onClick={() => deletePost(p.id)}>Delete</button>
    </div>
  ));
};

export default MyPosts;
