import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
   const {onSent , PrevPromts , setRecentPrompt ,newChat} = useContext(context)

   const loadPrompt = async (prompt) => {
       setRecentPrompt(prompt)
       await onSent(prompt)
   }


  return (
    <div className="sidebar">
      <div className="top">
         {/* after clicking if menu is open then will close and if it is close then it will open
         for theat setExtended is used to pass value in which prev means previous is used that will make previous value false to true and true to false */
         }
         
        <img onClick={()=>setExtended(prev=>!prev)} className="menu" src={assets.menu_icon} alt="" />
        {/* when we click new chat then it display greeting screen and remove ans but history remains in recent part */}
        <div onClick={() => newChat()} className="new-chat">     
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? 
          <div className="recent">
            <p className="recent-title">Recent</p>
            {PrevPromts.map((item,index)=>{
                 return(
                  <div onClick={()=>loadPrompt(item)} className="recent-entry"> 
                  <img src={assets.message_icon} alt="" /> 
                  {/* 0,18 will used to disply only 18 character of the use input so that the size of navbar will not change */}
                  <p>{item.slice(0,18)}...</p>   
                </div>
                 )
            })}
           
          </div>
         : null}
      </div>


      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended?<p>Help</p>:null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
         {extended?<p>Activities</p>:null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended?<p>Settings</p>:null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
