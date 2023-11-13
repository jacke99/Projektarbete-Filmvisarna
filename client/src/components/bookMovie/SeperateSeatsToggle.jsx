import { useStates } from "react-easier"
//eslint-disable-next-line
export default function SeperateSeatsToggle({setSeats}) {
    const s = useStates("toggleSeparateSeats", {toggle: false})

    const handleChecked = (e) => {
        s.toggle = e.target.checked
        setSeats([])
    }

  return (
    <label 
    htmlFor="toogleA"
    className="flex items-center cursor-pointer"
  >
    <div className="relative">
     
      <input id="toogleA" type="checkbox" className="sr-only" onChange={handleChecked}/>
      
      <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
     
      <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
    </div>
   
    <div className="ml-3 text-white font-medium">
      Välj separata platser
    </div>
  </label>
  )
}
