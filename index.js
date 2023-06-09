import * as Contacts from "./contacts.js";
import { Command } from "commander";

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: refaktor
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      Contacts.listContacts();
      break;

    case "get":
      Contacts.getContactById(id);
      break;

    case "add":
      Contacts.addContact(name, email, phone);
      break;

    case "remove":
      Contacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// const allContacts = await Contacts.listContacts();
// console.log(allContacts);
