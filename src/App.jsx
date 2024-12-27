import { BrowserRouter,  Routes, Route } from "react-router";
import ViewNotes from "./pages/ViewNotes";
import AddNotes from "./pages/AddNotes";
import ViewTagsNotes from "./pages/ViewTagsNotes";
import EditNotes from "./pages/EditNotes";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewNotes />}></Route>
          <Route path="/add" element={<AddNotes />}></Route>
          <Route path="/viewtags/:tag" element={<ViewTagsNotes />}></Route>
          <Route path="/edit/:id" element={<EditNotes />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
