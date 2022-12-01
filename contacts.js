const path = require("path");
const fs = require("fs");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  let rawData = fs.readFileSync(contactsPath);
  let contactList = JSON.parse(rawData);
  console.table(contactList);
}

function getContactById(contactId) {
  let rawData = fs.readFileSync(contactsPath);
  let contactList = JSON.parse(rawData);
  let contactById = contactList.find((item) => item.id === contactId);
  console.table(contactById);
}

function removeContact(contactId) {
  let rawData = fs.readFileSync(contactsPath);
  let contactList = JSON.parse(rawData);

  let updatedList = contactList.filter((item) => item.id !== contactId);

  fs.writeFileSync(contactsPath, JSON.stringify(updatedList, null, 2));

  console.table(updatedList)
}

function addContact(name, email, phone) {
  let rawData = fs.readFileSync(contactsPath);
  let contactList = JSON.parse(rawData);

  let lastContact = contactList[contactList.length - 1];

  let newID = String(Number(lastContact.id) + 1);

  let newContact = {
    id: newID,
    name: name,
    email: email,
    phone: phone,
  };

  contactList.push(newContact);

  fs.writeFileSync(contactsPath, JSON.stringify(contactList, null, 2));

  console.table(contactList)
}

module.exports = { listContacts, getContactById, removeContact, addContact };
