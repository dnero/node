//console.log('Starting app.js');

//local pkgs
const notes = require('./notes.js');

// external pkgs
const _ = require('lodash'); // js utility belt
const yargs = require('yargs'); // parse argsv into user-friendly format


const argv = yargs.argv;
var command = argv._[0];
console.log('Command:', command);
console.log('Yargs', argv);

switch(command){
	case 'add':
		var note = notes.addNote(argv.title, argv.body);
		if(note) {
			console.log(`--`);
			console.log(`Title: ${note.title}`);
			console.log(`Body: ${note.body}`);
		} else {
			console.log('Note title taken.');
		}
		break;

	case 'list':
		notes.getAll();
		break;

	case 'read':
		notes.getNote(argv.title);
		break;

	case 'remove':
		var noteRemoved = notes.removeNote(argv.title);
		var message = noteRemoved ? 'Note was removed' : 'Note not found';
		console.log(message);
		break;

	default:
		console.log('Command not recognized');
}