import { Link, useSearchParams } from "react-router-dom";
import { useBlogs } from "../context/BlogContext";

const Blogs = () => {
  const { posts } = useBlogs();

  // useSearchParams = useState that lives in the URL:  /blogs?search=react
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || ""; // "" if missing

  // filter while rendering (no extra state needed)
  const visible = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ padding: 12 }}>
      <h1>Blogs</h1>
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearchParams(e.target.value ? { search: e.target.value } : {})}
      />
      {visible.length === 0 && <p>No posts found</p>}
      {visible.map((post) => (
        <div key={post.id}>
          {/* dynamic URL: /blogs/1, /blogs/2 ... */}
          <h3><Link to={`/blogs/${post.id}`}>{post.title}</Link></h3>
          <small>by {post.author}</small>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
