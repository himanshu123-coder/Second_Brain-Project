import  { Button } from "./components/Button"
import { PlusIcon } from "./icons/Plus"
import { ShareIcon } from "./icons/Share"
import { Card } from "./components/Card"

function App() {
  

  return <div>
      <Button variant="primary" text="Add Content" startIcon={<PlusIcon />} />
      <Button variant="secondary" text="Share_brain" startIcon={<ShareIcon />} /> 
      < Card />
  </div>
  
  
}

export default App
