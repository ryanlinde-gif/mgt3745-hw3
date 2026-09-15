(() => {
  'use strict';

  const storageKey = 'mgt3745.notes.v617';
  const noteForm = document.querySelector('#note-form');
  const noteInput = document.querySelector('#note-input');
  const noteList = document.querySelector('#note-list');
  const noteError = document.querySelector('#note-error');
  const saveStatus = document.querySelector('#save-status');
  const emptyState = document.querySelector('#empty-state');
  // The query switch enables a repeatable classroom failure without filling real storage.
  const simulateFailedSave = new URLSearchParams(window.location.search).has('failSave');
  let notes = loadNotes();

  function loadNotes() {
    try {
      const storedText = window.localStorage.getItem(storageKey);
      const parsed = storedText === null ? [] : JSON.parse(storedText);
      if (!Array.isArray(parsed) || parsed.some(note => typeof note !== 'string')) {
        throw new Error('Unexpected stored data');
      }
      return parsed;
    } catch {
      saveStatus.textContent = 'Saved notes could not be read. Original storage was left unchanged. A successful new save will replace it.';
      return [];
    }
  }

  function saveNotes(nextNotes) {
    try {
      if (simulateFailedSave) throw new Error('Simulated write failure');
      // Persist the proposed state before changing the visible state or clearing input.
      window.localStorage.setItem(storageKey, JSON.stringify(nextNotes));
      return true;
    } catch {
      noteError.textContent = 'Could not save. Your text is still here. Try again when storage is available.';
      saveStatus.textContent = '';
      return false;
    }
  }

  function renderNotes() {
    noteList.replaceChildren();
    emptyState.hidden = notes.length > 0;
    notes.forEach((note, index) => {
      const listItem = document.createElement('li');
      const noteText = document.createElement('span');
      noteText.textContent = note;
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.textContent = 'Delete';
      deleteButton.setAttribute('aria-label', `Delete note ${index + 1}: ${note}`);
      deleteButton.addEventListener('click', () => {
        const nextNotes = notes.filter((entry, entryIndex) => entryIndex !== index);
        if (!saveNotes(nextNotes)) return;
        notes = nextNotes;
        noteError.textContent = '';
        renderNotes();
        saveStatus.textContent = 'Note deleted.';
        noteInput.focus();
      });
      listItem.append(noteText, deleteButton);
      noteList.append(listItem);
    });
  }

  noteForm.addEventListener('submit', event => {
    event.preventDefault();
    const candidate = noteInput.value.trim();
    const characterCount = Array.from(candidate).length;
    if (characterCount < 1 || characterCount > 200) {
      noteError.textContent = 'Enter a note containing 1–200 characters.';
      noteInput.setAttribute('aria-invalid', 'true');
      saveStatus.textContent = '';
      noteInput.focus();
      return;
    }
    noteInput.removeAttribute('aria-invalid');
    noteError.textContent = '';
    const nextNotes = [...notes, candidate];
    if (!saveNotes(nextNotes)) return;
    notes = nextNotes;
    renderNotes();
    noteInput.value = '';
    noteInput.focus();
    saveStatus.textContent = 'Note saved in this browser.';
  });

  renderNotes();
})();
