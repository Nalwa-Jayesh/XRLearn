import React, { useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Notes.css'
import { AiFillDelete } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import NotesPreview from './NotesPreview';
import { useAuthContext } from '../../hooks/useAuthContext';

const NotesCard = (props) => {
    const { id, title, content, audioData } = props;

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const { user } = useAuthContext();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

    async function handleDelete() {
        try{
          if(id) {
            const config = {
                headers : {
                    Authorization : user.accessToken
                }
            }
            await axios.delete(`http://localhost:4040/api/usernotes/delete/${id}`, config)
            alert("Note Deleted Successfully!")
            // navigate("/home")
          }
        }
        catch(error) {
          console.log(error)
        }  
      }

    if(!id || !title ) {
      return(
        <div>Loading....</div>
      )
    }
  
    else {
      return (
        <div className="note">
          <div className="note_text">
            <h2>{title.toUpperCase()}</h2>
            <p>{content.substring(0, 30)}</p>
          </div>
          <div className="note_footer">
            <div className="link" onClick={openModal}><FaRegEye /></div>
            <span className="link" onClick={handleDelete}><AiFillDelete /></span>
          </div>
          <NotesPreview isOpen={modalIsOpen} closeModal={closeModal} title={title} content={content} audioData={audioData}/>
        </div>
      );
    }
}

export default NotesCard