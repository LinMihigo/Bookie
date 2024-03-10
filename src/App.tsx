import { Button } from "./components/ui/button"
import { Link } from "react-router-dom"
function App() {

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-screen h-screen">
      <p>This landing page is for routing testing and still under development,</p>
      <p>To search for books, click the button below.</p>
      <Link to='/Search'>
        <Button>Search</Button>
      </Link>
    </div>
  )
}

export default App
