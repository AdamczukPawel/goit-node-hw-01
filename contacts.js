import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");

export const listContacts = () => {
  fs.readFile(contactsPath, { encoding: "utf-8" }, (error, data) => {
    if (error) {
      console.error(error);
      return;
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
};

export const getContactById = (contactId) => {
  fs.readFile(contactsPath, { encoding: "utf-8" }, (error, data) => {
    if (error) {
      console.error(error);
      return;
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find((cont) => cont.id === contactId);
    console.log(contact);
  });
};

export const removeContact = (contactId) => {
  fs.readFile(contactsPath, { encoding: "utf-8" }, (error, data) => {
    if (error) {
      console.error(error);
      return;
    }
    const contacts = JSON.parse(data);
    fs.writeFile(
      contactsPath,
      JSON.stringify(
        contacts.filter((contact) => contact.id !== contactId),
        null,
        2
      ),
      (error) => {
        if (error) {
          console.error(error);
        }
        console.log("Usunięto kontakt o ID:", contactId);
        listContacts();
      }
    );
  });
};

export const addContact = (name, email, phone) => {
  fs.readFile(contactsPath, { encoding: "utf-8" }, (error, data) => {
    if (error) {
      console.error(error);
      return;
    }
    const newContact = { id: nanoid(), name, email, phone };
    fs.writeFile(
      contactsPath,
      JSON.stringify([...JSON.parse(data), newContact]),
      (error) => {
        if (error) {
          console.error(error);
        }
        console.log("Dodano kontakt o imieniu:", name);
        listContacts();
      }
    );
  });
};
