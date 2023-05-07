const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

// const readFile = async () => {
//    const data = await fs.readFile(contactsPath, 'utf-8');
//    console.log(data);
// };

// const writeFile = async () => {
//    const data = await fs.writeFile(contactsPath);
// };

// const data = readFile();

// TODO: задокументировать каждую функцию
async function listContacts() {
   const data = await fs.readFile(contactsPath, 'utf-8');
   return JSON.parse(data);
}

async function getContactById(contactId) {
   const contacts = await listContacts();
   const result = contacts.find(contact => {
      return contact.id === contactId;
   });
   return result || null;
}

async function removeContact(contactId) {
   const contacts = await listContacts();
   const index = contacts.findIndex(contact => contact.id === contactId);
   console.log(index);
   if (index === -1) {
      return null;
   }
   const [findedContact] = contacts.splice(index, 1);
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
   return findedContact;
}

async function addContact(data) {
   const contacts = await listContacts();
   const newContact = {
      id: nanoid(),
      ...data,
   };
   contacts.push(newContact);
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
   return newContact;
}

const data = listContacts();

module.exports = { listContacts, getContactById, addContact, removeContact };
