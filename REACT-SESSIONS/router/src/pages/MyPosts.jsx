import { useAuth } from "../context/AuthContext";
import { useBlogs } from "../context/BlogContext";

// Shows only the logged-in user's posts, with a delete button.
const MyPosts = () => {
  const { user } = useAuth();
  const { posts, deletePost } = useBlogs();
  const mine = posts.filter((p) => p.author === user.name);

  if (mine.length === 0) return <p>You have no posts yet.</p>;

  return mine.map((p) => (
    <div key={p.id}>
      {p.title} <button onClick={() => deletePost(p.id)}>Delete</button>
    </div>
  ));
};

export default MyPosts;
