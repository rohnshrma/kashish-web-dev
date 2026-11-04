import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./Components/Home";
import Blogs from "./Components/Blogs";
import BlogDetail from "./Components/BlogDetail";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import MyPosts from "./Components/MyPosts";
import NewPost from "./Components/NewPost";
import NotFound from "./Components/NotFound";

// The route table: URL -> component.
const App = () => {
  return (
    <div>
      <Navbar /> {/* outside <Routes>, so it shows on every page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/login" element={<Login />} />

        {/* PRIVATE: ProtectedRoute guards everything inside it */}
        <Route element={<ProtectedRoute />}>
          {/* NESTED: Dashboard has an <Outlet /> where the child shows */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<MyPosts />} /> {/* /dashboard */}
            <Route path="new" element={<NewPost />} /> {/* /dashboard/new */}
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} /> {/* 404 */}
      </Routes>
    </div>
  );
};

export default App;
