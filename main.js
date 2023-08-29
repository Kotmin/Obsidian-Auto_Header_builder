// main.js
const { Plugin } = require('obsidian');

module.exports = class NoteFormatterPlugin extends Plugin {
    async onload() {
        console.log('NoteFormatterPlugin loaded');

        this.registerEvent(this.app.vault.on('create', (file) => {
            this.formatNewNote(file.path);
        }));
    }

    async formatNewNote(notePath) {
        const noteName = this.app.vault.getNameFromPath(notePath);
        const rootNotePath = this.app.vault.getRoot().path;
        const rootNoteName = this.app.vault.getNameFromPath(rootNotePath);

        const content = `# ${noteName}\n\n[[${rootNoteName}]]\n\n---\n\n### End of note template\n`;

        const note = this.app.vault.getAbstractFileByPath(notePath);
        if (note) {
            await this.app.vault.modify(note, content);
        }
    }
};

