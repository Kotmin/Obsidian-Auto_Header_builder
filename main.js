// main.js
const { Plugin } = require('obsidian');

module.exports = class NoteFormatterPlugin extends Plugin {
    async onload() {
        console.log('NoteFormatterPlugin loaded');


	//this.previousNoteName = null;

        this.registerEvent(this.app.workspace.on('file-open', (file) => {
            this.previousNoteName = file?.name;
        }));


        this.registerEvent(this.app.vault.on('create', (file) => {
            this.formatNewNote(file.path,this.previousNoteName);
        }));







    }

    async formatNewNote(notePath,previousNoteName) {
	console.log('New note created and got function');
	//console.log(this.app.valut.getName());
	//this.app.vault.
        //const noteName = this.app.vault.getNameFromPath(notePath);
        const rootNotePath = this.app.vault.getRoot().path;
        //const rootNoteName = this.app.vault.getNameFromPath(rootNotePath);

        //const content = `# ${noteName}\n\n[[${rootNoteName}]]\n\n---\n\n`;
	// previousNoteName = previousNoteName.replace(/\.[^.]+$/, '');
	const content = `# Hello TEST\n [[${previousNoteName}]] \n `;

	

        const note = this.app.vault.getAbstractFileByPath(notePath);
        if (note) {
	    console.log('note obj not empty');
            await this.app.vault.modify(note, content);
	    console.log('Note succesfully formated');
        }
    }
};

