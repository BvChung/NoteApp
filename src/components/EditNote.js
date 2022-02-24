import React from "react";
import { FiTrash2, FiEdit, FiCheck, FiXCircle } from "react-icons/fi";
import Color from "./Color";
import { ScrollArea } from "@mantine/core";
import TextareaAutosize from "react-textarea-autosize";

export default function EditNote({
	id,
	title,
	text,
	date,
	noteColor,
	dayCreated,
	saveNote,
	toggleEdit,
	deleteNote,
	saveNoteColor,
	changeColor,
}) {
	const currentlyEditing = true;

	const [editedText, setEditedText] = React.useState({
		id: id,
		date: date,
		dayCreated: dayCreated,
		title: title,
		text: text,
		noteColor: noteColor,
	});

	function handleEdit(event, color) {
		const { name, value } = event.target;

		if (color) {
			setEditedText((prevEditText) => {
				return {
					...prevEditText,
					noteColor: color,
				};
			});
		} else {
			setEditedText((prevEditText) => {
				return {
					...prevEditText,
					[name]: value,
				};
			});
		}
	}

	return (
		<div className={`note ${noteColor}`}>
			<div className="note-details">
				<small className="date">{date}</small>

				<div className="note-tools">
					<Color
						// key={id}
						id={id}
						changeColor={changeColor}
						noteColor={noteColor}
						saveNoteColor={saveNoteColor}
						currentlyEditing={currentlyEditing}
						handleEdit={handleEdit}
					/>
					<button
						onClick={() => {
							saveNote(editedText);
							toggleEdit();
						}}
					>
						Done edit
					</button>
				</div>
			</div>

			<ScrollArea>
				<div className="edit-container">
					<TextareaAutosize
						name="title"
						value={editedText.title}
						onChange={handleEdit}
						placeholder="Add a title..."
						className="note-title"
					/>

					<TextareaAutosize
						name="text"
						value={editedText.text}
						onChange={handleEdit}
						placeholder="Take a note..."
						className="note-text"
					/>
				</div>
			</ScrollArea>
			{/* <TextareaAutosize
				name="text"
				value={editedText.text}
				onChange={handleEdit}
				placeholder="Type to add a note"
			/> */}
		</div>
	);
}
