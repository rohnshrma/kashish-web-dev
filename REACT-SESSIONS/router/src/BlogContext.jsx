import { createContext, useState } from "react";

const BlogContext = createContext();

const SAMPLE = [
  { id: "1", title: "What is React?", author: "Kashish", body: "React is a library for building user interfaces using components." },
  { id: "2", title: "Props vs State", author: "Kashish", body: "Props come from the parent. State lives inside the component." },
  { id: "3", title: "Why Context API?", author: "Rohan", body: "Context lets us share data without passing props through every level." },
];

export const BlogContextProvider = ({ children }) => {
  const [posts, setPosts] = useState(SAMPLE);

  const addPost = (post) => setPosts((prev) => [post, ...prev]);
  const deletePost = (id) => setPosts((prev) => prev.filter((p) => p.id !== id));

  return (
    <BlogContext.Provider value={{ posts, addPost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
