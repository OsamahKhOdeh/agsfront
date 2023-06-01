import React from 'react'
import { useState } from 'react'

const NewLayout = () => {

    const [isOpen ,setIsoOpen] = useState(false)
    const moveTop = () =>{
        window.scrollTo(0, 0);
        let mybutton = document.getElementById("btn-back-to-top");
      }
  return (
    <>
    <div  className={`snippet-body ${isOpen ? '' : '' } `}>
   <header className={`header ${isOpen ? '' : 'body-pd' } `} id="header">
        {/* onClick={()=>setIsoOpen((prev)=>!prev)} */}
        <div className="header_toggle" onClick={()=>setIsoOpen((prev)=>!prev)}> 
        <i  className={`bx bx-menu ${isOpen ? '' : 'bx-x' } `} id="header-toggle"></i> 
        </div>
        <div className="header_img"> 
        <img src="https://i.imgur.com/hczKIze.jpg" alt=""/> </div>
    </header>
    {/* {`l-navbar  ${isOpen ? '' : 'show' } `} */}
    <div className={`l-navbar  ${isOpen ? '' : 'show' } `} id="nav-bar">
        <nav className="nav">
            <div> <a href="#" className="nav_logo"> <i className='bx bx-layer nav_logo-icon'></i> <span className="nav_logo-name">AGS</span> </a>
                <div className="nav_list">
                     <a href="#" className="nav_link active">
                         <i className='bx bx-grid-alt nav_icon'></i>
                          <span className="nav_name">Dashboard</span> </a> <a href="#" className="nav_link"> <i className='bx bx-user nav_icon'></i> <span className="nav_name">Users</span> </a> <a href="#" className="nav_link"> <i className='bx bx-message-square-detail nav_icon'></i> <span className="nav_name">Messages</span> </a> <a href="#" className="nav_link"> <i className='bx bx-bookmark nav_icon'></i> <span className="nav_name">Bookmark</span> </a> <a href="#" className="nav_link"> <i className='bx bx-folder nav_icon'></i> <span className="nav_name">Files</span> </a> <a href="#" className="nav_link"> <i className='bx bx-bar-chart-alt-2 nav_icon'></i> <span className="nav_name">Stats</span> </a> </div>
            </div> <a href="#" className="nav_link"> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">SignOut</span> </a>
        </nav>
    </div>
    <div  className={`height-100 bg-light ${isOpen ? '' : 'body-content-pd' } `}>
        <h4>Main Components</h4>
    </div>
</div>
</>
  )
}

export default NewLayout