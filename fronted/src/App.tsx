import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import {Blogs} from './pages/Blogs'
import {P} from './pages/P'

function App() {

  return (
    < div className="bg-gray-50 w-screen h-full">
      <BrowserRouter>
        <Routes >
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/add" element={<P/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App