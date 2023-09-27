import {useState } from "react"
import { styles } from "../styles"
//import { Link } from 'react-router-dom'
import { logo, menu, account_circle, close } from "../assets"
export default function Header() {
  const [toggle, setToggle] = useState(false)
  return (
  <nav className={`${styles.paddingX} bg-primary fixed w-full py-5 top-0 flex justify-between border-b-2 border-gold`}>
    <div className="w-full flex">
      <img src={logo} alt="logo" className="w-12 h-12 object-contain mr-2" />
      <ul className={`${styles.subHeaderText} hidden list-none lg:flex flex-row gap-10 `}>
        <li className="hover:text-white cursor-pointer">Hem</li>
        <li className="hover:text-white cursor-pointer">Filmer</li>
        <li className="hover:text-white cursor-pointer">Biljetter</li>
        <li className="hover:text-white cursor-pointer">Bli medlem</li>
      </ul>
    </div>
    <div className="w-[300px] flex gap-1 justify-end">
      <img src={account_circle} alt="login" className="object-contain w-12 h-12" />
      <p className={`${styles.subHeaderText} hidden lg:flex hover:text-white cursor-pointer`} >Logga in</p>
      <img src={toggle ? close : menu} alt="menu" className="object-contain w-12 h-12 lg:hidden"
        onClick={() => setToggle(!toggle)}
      />
      <div className={`${!toggle ? 'hidden' : 'flex'} p-6 bg-gradient-to-r from-footerGrey to-primary
            absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl `} >

               <ul className='list-none flex justify-end items-start flex-col gap-4 text-gold'>
                  <li className="hover:text-white cursor-pointer">Hem</li>
                  <li className="hover:text-white cursor-pointer">Filmer</li>
                  <li className="hover:text-white cursor-pointer">Biljetter</li>
                  <li className="hover:text-white cursor-pointer">Bli medlem</li>
               </ul>

            </div>
    </div>
  </nav>
  )
}
