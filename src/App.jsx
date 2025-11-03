import { Button } from "@/components/ui/button"
import { Cake } from "lucide-react"
import './App.css'
function App() {
  return (
    <>
     <div className="flex min-h-svh flex-col items-center justify-center">
      <Button className="bg-blue-500 text-white">Click me</Button>
      <Cake className="w-6 h-6 text-pink-500" />
    </div>
    </>
  )
}

export default App
