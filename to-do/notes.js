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
	return fetchNotes();
};

var getNote = (title) => {
	"use strict";
	var notes = fetchNotes();
	var note = notes.filter((note) => note.title === title)[0] || [];
	return note;
};

var removeNote = (title) => {
	"use strict";
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note) => note.title !== title);
	saveNotes(filteredNotes);
	
	return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
	"use strict";
	
	debugger;
	console.log(`--`);
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
};

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote
};