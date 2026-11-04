import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyPosts from "./pages/MyPosts";
import NewPost from "./pages/NewPost";
import NotFound from "./pages/NotFound";

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
