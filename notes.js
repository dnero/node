//console.log('Starting notes.js');
const fs = require('fs');

var fetchNotes = () => {
	"use strict";
	try {
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch (e) {
		return [];
	}
};

var saveNotes = (notes) => {
	"use strict";
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
	"use strict";
	var notes = fetchNotes();
	var note = {
		title,
		body
	};
	var duplicateNotes = notes.filter((note) => note.title === title);

	if(duplicateNotes.length === 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	}
	
};

var getAll = () => {
	"use strict";
	console.log('Getting all notes');
};

var getNote = (title) => {
	"use strict";
	console.log('Reading note', title);
};

var removeNote = (title) => {
	"use strict";
	console.log('Removing note', title);
};

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote
};