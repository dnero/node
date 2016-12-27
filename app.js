//local pkgs
const notes = require('./notes.js');

// external pkgs
const _ = require('lodash'); // js utility belt
const yargs = require('yargs'); // parse argsv into user-friendly format
let titleOptions = {
		describe: 'Title of note',
		demand: true,
		alias: 't'
	},
	bodyOptions = {
		describe: 'Body of note',
		demand: true,
		alias: 'b'
	};

const argv = yargs
	.command('add', 'Add a new note', {
		title: titleOptions,
		body: bodyOptions
	})
	.command('list', 'List all notes')
	.help()
	.command('read', 'Read new note', {
		title: titleOptions
	})
	.command('remove', 'Remove note', {
		title: titleOptions
		})
    .argv;
var command = argv._[0],
	message,
	note;

switch(command){
	case 'add':
		note = notes.addNote(argv.title, argv.body);
		if(note) {
			notes.logNote(note);
		} else {
			console.log('Note title taken.');
		}
		break;

	case 'list':
		var allNotes = notes.getAll();
		console.log(`Printing ${allNotes.length} note(s)`);
		allNotes.forEach( (note) => notes.logNote(note) );
		break;

	case 'read':
		note = notes.getNote(argv.title);
		message = note.length ? note : 'Note not found';
		console.log(message);
		break;

	case 'remove':
		var noteRemoved = notes.removeNote(argv.title);
		message = noteRemoved ? 'Note was removed' : 'Note not found';
		console.log(message);
		break;

	default:
		console.log('Command not recognized');
}