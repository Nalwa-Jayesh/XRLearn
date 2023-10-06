import React, { useState } from 'react';
import "./Sidebar.css";
import { ImBooks } from "react-icons/im";
import { BsBookHalf, BsBodyText, BsFillPostcardFill } from "react-icons/bs";
import { HiSpeakerWave } from "react-icons/hi2";
import { LuScrollText } from "react-icons/lu";
import { TbSettings2 } from "react-icons/tb";

const Sidebar = ({ handleButtonClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('notes');
  
    const toggleBtn = () => {
      setIsOpen(!isOpen);
    }
  
    const handleTabClick = (tabName) => {
      setActiveTab(tabName);
      handleButtonClick(tabName);
    }
  
    const getTabClassName = (tabName) => {
      return activeTab === tabName ? 'active-tab' : '';
    }

  return (
    <div>
      <div style={{ display: isOpen ? "block" : "none" }}>
        <div className='sidebar__container'>
          <p><TbSettings2 className="toggle_icon" style={{ marginRight: "0.5rem" }} onClick={toggleBtn} />  {" "} Sidebar</p>
          <button className={`sidebar__btn ${getTabClassName('notes')}`} onClick={() => (handleButtonClick)('notes')}>
            <BsBookHalf style={{ marginRight: "0.5rem" }} />My Notes
          </button>
          <button className={`sidebar__btn ${getTabClassName('tts')}`} onClick={() => handleTabClick('tts')}>
            <HiSpeakerWave style={{ marginRight: "0.5rem" }} />Text To Speech
          </button>
          <button className={`sidebar__btn ${getTabClassName('stt')}`} onClick={() => handleTabClick('stt')}>
            <BsBodyText style={{ marginRight: "0.5rem" }} />Speech To Text
          </button>
          <button className={`sidebar__btn ${getTabClassName('summary')}`} onClick={() => handleTabClick('summary')}>
            <LuScrollText style={{ marginRight: "0.5rem" }} />Text Summarization
          </button>
          <button className={`sidebar__btn ${getTabClassName('hub')}`} onClick={() => handleTabClick('hub')}>
            <ImBooks style={{ marginRight: "0.5rem" }} />Book Hub
          </button>
          <button className={`sidebar__btn ${getTabClassName('cards')}`} onClick={() => handleTabClick('cards')}>
            <BsFillPostcardFill style={{ marginRight: "0.5rem" }} />Flash Cards
          </button>
        </div>
      </div>
      <div style={{ display: isOpen ? "none" : "block" }}>
        <div className='sidebar__container'>
          <p><TbSettings2 className="toggle_icon" onClick={toggleBtn} /> </p>
          <button className={`sidebar__btn ${getTabClassName('notes')}`} onClick={() => handleTabClick('notes')}>
            <BsBookHalf />
          </button>
          <button className={`sidebar__btn ${getTabClassName('tts')}`} onClick={() => handleTabClick('tts')}>
            <HiSpeakerWave />
          </button>
          <button className={`sidebar__btn ${getTabClassName('stt')}`} onClick={() => handleTabClick('stt')}>
            <BsBodyText />
          </button>
          <button className={`sidebar__btn ${getTabClassName('summary')}`} onClick={() => handleTabClick('summary')}>
            <LuScrollText />
          </button>
          <button className={`sidebar__btn ${getTabClassName('hub')}`} onClick={() => handleTabClick('hub')}>
            <ImBooks />
          </button>
          <button className={`sidebar__btn ${getTabClassName('cards')}`} onClick={() => handleTabClick('cards')}>
            <BsFillPostcardFill />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
