import React from 'react'
import dayjs from 'dayjs'
import { navLinks } from '#constants'
import { navIcons } from '#constants'
import useWindowStore from '#store/window'


const Navbar = () => {
    const {openWindow}=useWindowStore();

  return (
    <nav>
        <div>
            <img src="/images/logo.svg" alt="Logo" />
            <p className="font-bold">Akshat's Portfolio</p>
            <ul>
                {navLinks.map(({id,name,type}) => (
                    <li key={id} onClick={()=>openWindow(type)}>
                        <p>{name}</p>
                    </li>
                ))}
            </ul>
        </div>
        <div>
            <ul>
                {navIcons.map((item) => (
                    <li key={item.id}>
                        <img src={item.img} className="icon-hover" alt={item.id} />
                    </li>
                ))}
            </ul>
            <time>{dayjs().format("ddd MMM D h:mm A")}</time>
        </div>
    </nav>
  )
}

export default Navbar

