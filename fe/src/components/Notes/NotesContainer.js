import React, { useState, useEffect } from 'react';
import NotesCard from './NotesCard';
import axios from 'axios';
import { MdSearch } from "react-icons/md"
import { useAuthContext } from '../../hooks/useAuthContext';

const NotesContainer = () => {
    const [notes, setNotes] = useState([]);
	const [searchText, setSearchText] = useState('');
    const { user } = useAuthContext();

	useEffect(() => {
		async function fetchAllNotes() {
			try{
				if(user) {
                    const config = {
                        headers : {
                            Authorization : user.accessToken
                        }
                    }
					const response = await axios.get(`http://localhost:4040/api/usernotes/notes`, config)
					const data = response.data
					setNotes(data.notes)
				}
			}
			catch(error) {
				console.log(error)
			}
		}

		fetchAllNotes()
	}, [user, notes])


	function handleSearchNote(e) {
		setSearchText(e)
		console.log(searchText)
	}

	return (
		<div className="Home-top">
			<div className="Home">
				<div className="home-header-container">
					<div className="Home-header">
						<div className='search'>
							<MdSearch className='icon' size='1.3em' />
							<input
								onChange={(event) =>
									handleSearchNote(event.target.value)
								}
								type='text'
								placeholder='Type to search...'
							/>
						</div>
					</div>
				</div>
				
				<div className="Home-container">
					{notes?.length > 0 ? (
						notes.filter(
							note => {
								if (searchText === " ") {
									return note
								}
								else if(note.title.toLowerCase().includes(searchText.toLowerCase())) {
									return note
								}
							}
						)
						.map(
						(note) => {
							return <NotesCard key={note._id} id={note._id} title={note.title} content={note.content} audioData={note.audioData}/>
						}
					)
					) : (
						<h1>No Notes Present</h1>
					)}
				</div>
			</div>
		</div>
	);
}

export default NotesContainer