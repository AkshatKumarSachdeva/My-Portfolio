import WindowWrapper from '#hoc/WindowWrapper';
import { WindowControls } from '#components';
import {socials} from "#constants/index"
import React from 'react'

const Contact = () => {
  return (
    <>
        <div id="window-header">
            <WindowControls target="contact"/>
            <h2>Contact Me</h2>
        </div>
        <div className='p-6 flex flex-col gap-6 h-full'
        >
            <img src='/images/adrian.jpg' alt='Adrian' className='w-20 h-auto rounded-full'/>
        
        
        <h3>Let's Connect</h3>
        <p>Got an idea? A bug to squash? Or just wanna talk tech? I'm in</p>
        <p>email@gmail.com</p>
        <ul>
            {socials.map(({id,bg,link,icon,text})=>(
                <li key={id} style={{backgroundColor:bg}}>
                    <a href={link} target="_blank" rel="noopener noreferrer" title={text}>
                        <img src={icon} alt={text} className='size-5'/>
                        <p>{text}</p>
                    </a>
                </li>
            ))}
        </ul>
        </div>
    </>
  )
};
const ContactWindow=WindowWrapper(Contact,"contact");

export default ContactWindow
