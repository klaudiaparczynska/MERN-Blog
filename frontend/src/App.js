
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Home from "./pages/Home.js"
import Login from "./pages/Login.js"
import Signup from "./pages/Signup.js"
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import NewPost from './pages/NewPost';
import EditPost from './pages/EditPost';
import MyPosts from './pages/MyPosts';
import SinglePostPage from './pages/SinglePostPage';
import NotFound from './pages/NotFound';

function App() {
  const {user} = useSelector(state => state.user)
  return (
    <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      { !user && (
        <>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        </>
      )}
      {user && (
        <>
        <Route path="/new-article" element={<NewPost/>} />
        <Route path="/articles/:id/edit" element={<EditPost/>} />
        <Route path="/articles/me" element={<MyPosts/>} />
        </>

      )}
      <Route path="/articles/:id" element={<SinglePostPage/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
    <Footer />
  </BrowserRouter>
  );
}

export default App;
