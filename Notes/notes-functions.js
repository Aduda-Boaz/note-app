// Read existing notes from localstorage
const getSavedNotes = function() {
    notesJSON = localStorage.getItem('notes');

    if (notesJSON !== null) {
        return JSON.parse(notesJSON);
    } else {
        return []
    }
}

// save notes to local storage
const saveNotes = function(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Remove a note from the list
const removeNote = function(id) {
    const noteIndex = notes.findIndex(function(note) {
        return note.id === id
    })

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// generate the DOM structure  for a note
const generateNoteDOM = function(note) {
        const noteEl = document.createElement('div');
        const textEl = document.createElement('a');
        const button = document.createElement('button');

        // setup the remove note button
        button.textContent = 'x';
        noteEl.appendChild(button);
        button.addEventListener('click', function() {
            removeNote(note.id)
            saveNotes(notes)
            renderNotes(notes, filters)
        })

        if (note.title.length > 0) {
            textEl.textContent = note.title
        } else {
            textEl.textContent = 'unnamed note'
        }
        textEl.setAttribute('href', `/edit.html#${note.id}`)
        noteEl.appendChild(textEl)

        return noteEl;
    }
    // render application notes
const renderNotes = function(notes, filters) {
    const filteredNotes = notes.filter(function(note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    });

    document.querySelector('#notes').innerHTML = '' // empties the DOM

    filteredNotes.forEach(function(note) {
        const noteEl = generateNoteDOM(note);
        document.querySelector('#notes').appendChild(noteEl)
    })
}