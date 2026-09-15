(() => {
  'use strict';

  const storageKey = 'mgt3745.contacts.v1';
  // E13: the seven-day threshold comes from the day 3 / day 7 follow-up cadence
  // already committed to in FEATURES.md E8, not from a fresh guess.
  const followUpDays = 7;
  const maxFieldLength = 200;

  const contactForm = document.querySelector('#contact-form');
  const coachNameInput = document.querySelector('#coach-name-input');
  const schoolInput = document.querySelector('#school-input');
  const contactDateInput = document.querySelector('#contact-date-input');
  const statusSelect = document.querySelector('#status-select');
  const contactList = document.querySelector('#contact-list');
  const entryError = document.querySelector('#entry-error');
  const saveStatus = document.querySelector('#save-status');
  const emptyState = document.querySelector('#empty-state');

  // The query switch enables a repeatable classroom failure without filling real storage.
  const simulateFailedSave = new URLSearchParams(window.location.search).has('failSave');

  const requiredFields = [
    { key: 'coachName', label: 'Coach name', element: coachNameInput },
    { key: 'school', label: 'School', element: schoolInput },
    { key: 'contactDate', label: 'Date contacted', element: contactDateInput }
  ];

  let contactEntries = loadContacts();

  function loadContacts() {
    try {
      const storedText = window.localStorage.getItem(storageKey);
      const parsed = storedText === null ? [] : JSON.parse(storedText);
      if (!Array.isArray(parsed) || !parsed.every(isValidEntry)) {
        throw new Error('Unexpected stored data');
      }
      return parsed;
    } catch {
      saveStatus.textContent = 'Saved contacts could not be read. Original storage was left unchanged. A successful new save will replace it.';
      return [];
    }
  }

  function isValidEntry(entry) {
    return entry !== null
      && typeof entry === 'object'
      && typeof entry.coachName === 'string'
      && typeof entry.school === 'string'
      && typeof entry.contactDate === 'string'
      && typeof entry.status === 'string';
  }

  function saveContacts(nextContacts) {
    try {
      if (simulateFailedSave) throw new Error('Simulated write failure');
      // Persist the proposed state before changing the visible state or clearing input.
      window.localStorage.setItem(storageKey, JSON.stringify(nextContacts));
      return true;
    } catch {
      entryError.textContent = 'Could not save. Your entry is still here. Try again when storage is available.';
      saveStatus.textContent = '';
      return false;
    }
  }

  function daysSinceContact(isoDate) {
    // Both sides are reduced to local midnight so a contact logged earlier today
    // counts as zero days rather than a fraction that rounds unpredictably.
    const contactDay = new Date(`${isoDate}T00:00:00`);
    if (Number.isNaN(contactDay.getTime())) return 0;
    const now = new Date();
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.floor((todayMidnight - contactDay) / 86400000);
  }

  function isOverdue(entry) {
    return entry.status === 'awaiting reply'
      && daysSinceContact(entry.contactDate) >= followUpDays;
  }

  function findFieldProblem(candidate) {
    // E12 requires naming the offending field, so validation returns which one
    // failed rather than a single generic rejection message.
    for (const field of requiredFields) {
      if (candidate[field.key] === '') {
        return { message: `${field.label} is required.`, element: field.element };
      }
    }
    for (const field of requiredFields) {
      if (candidate[field.key].length > maxFieldLength) {
        return {
          message: `${field.label} must be ${maxFieldLength} characters or fewer.`,
          element: field.element
        };
      }
    }
    return null;
  }

  function clearFieldErrors() {
    requiredFields.forEach(field => field.element.removeAttribute('aria-invalid'));
  }

  function renderContactLog() {
    contactList.replaceChildren();
    emptyState.hidden = contactEntries.length > 0;

    contactEntries.forEach((entry, index) => {
      const listItem = document.createElement('li');

      const summary = document.createElement('span');
      const overdue = isOverdue(entry);
      summary.textContent = `${entry.coachName} — ${entry.school} — contacted ${entry.contactDate} — ${entry.status}`;

      listItem.append(summary);

      if (overdue) {
        const flag = document.createElement('span');
        flag.className = 'overdue-flag';
        flag.textContent = `Due for follow-up (${daysSinceContact(entry.contactDate)} days)`;
        listItem.append(flag);
      }

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.textContent = 'Delete';
      deleteButton.setAttribute('aria-label', `Delete contact ${index + 1}: ${entry.coachName} at ${entry.school}`);
      deleteButton.addEventListener('click', () => {
        const nextContacts = contactEntries.filter((item, itemIndex) => itemIndex !== index);
        if (!saveContacts(nextContacts)) return;
        contactEntries = nextContacts;
        entryError.textContent = '';
        renderContactLog();
        saveStatus.textContent = 'Contact deleted.';
        coachNameInput.focus();
      });

      listItem.append(deleteButton);
      contactList.append(listItem);
    });
  }

  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const candidate = {
      coachName: coachNameInput.value.trim(),
      school: schoolInput.value.trim(),
      contactDate: contactDateInput.value,
      status: statusSelect.value
    };

    const problem = findFieldProblem(candidate);
    if (problem !== null) {
      clearFieldErrors();
      entryError.textContent = problem.message;
      problem.element.setAttribute('aria-invalid', 'true');
      saveStatus.textContent = '';
      problem.element.focus();
      return;
    }

    clearFieldErrors();
    entryError.textContent = '';

    const nextContacts = [...contactEntries, candidate];
    // A failed save must leave the typed entry in the form, so the fields are
    // only cleared after storage has confirmed the write.
    if (!saveContacts(nextContacts)) return;

    contactEntries = nextContacts;
    renderContactLog();
    contactForm.reset();
    coachNameInput.focus();
    saveStatus.textContent = 'Contact saved in this browser.';
  });

  renderContactLog();
})();
