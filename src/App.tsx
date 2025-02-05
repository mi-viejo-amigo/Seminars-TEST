import SeminarsList from "./components/seminarsPage/SemenersList"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <SeminarsList/>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
