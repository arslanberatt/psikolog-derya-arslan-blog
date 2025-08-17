import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogPage from "./pages/Client/BlogPage";
import BlogPostView from "./pages/Client/BlogPostView";
import PostByTags from "./pages/Client/PostByTags";
import SearchPosts from "./pages/Client/SearchPosts";
import AdminLogin from "./pages/Admin/AdminLogin";
import PrivateRoute from "./routes/PrivateRoute";
import BlogPosts from "./pages/Admin/BlogPost";
import BlogPostEditor from "./pages/Admin/BlogPostEditor";
import Comments from "./pages/Admin/Comments";
import Dashboard from "./pages/Admin/Dashboard";
import UserProvider from "./context/userContext";
import AboutEditor from "./pages/Admin/AboutEditor";
import ServiceList from "./pages/Admin/ServiceList";
import ExperienceList from "./pages/Admin/ExperienceList";
import ClientLandingPage from "./pages/Client/ClientLandingPage";
import { AboutPage } from "./pages/Client/AboutPage";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<ClientLandingPage />} />
            <Route path="/bloglar" element={<BlogPage />} />
            <Route path="/hakkimda" element={<AboutPage />} />
            <Route path="/:slug" element={<BlogPostView />} />
            <Route path="/tag/:tagName" element={<PostByTags />} />
            <Route path="/search" element={<SearchPosts />} />

            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/posts" element={<BlogPosts />} />
              <Route path="/admin/service" element={<ServiceList />} />
              <Route path="/admin/experience" element={<ExperienceList />} />
              <Route path="/admin/about" element={<AboutEditor />} />
              <Route path="/admin/create" element={<BlogPostEditor />} />
              <Route
                path="/admin/edit/:postSlug"
                element={<BlogPostEditor isEdit={true} />}
              />
              <Route path="/admin/comments" element={<Comments />} />
            </Route>

            <Route path="/admin-login" element={<AdminLogin />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;
