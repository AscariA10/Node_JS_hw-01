const { Command } = require('commander');
const program = new Command();

const contacts = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
   switch (action) {
      case 'read':
         const allContacts = await contacts.listContacts();
         return console.log(allContacts);
      case 'get':
         const getContactById = await contacts.getContactById(id);
         return console.log(getContactById);
      case 'add':
         const addContact = await contacts.addContact({ name, email, phone });
         return console.log(addContact);
      case 'delete':
         const deleteContact = await contacts.removeContact(id);
         return console.log(deleteContact);
      default:
         console.warn('\x1B[31m Unknown action type!');
   }
}

program
   .option('-a, --action <type>', 'choose action')
   .option('-i, --id <type>', 'id')
   .option('-n, --name <type>', 'name')
   .option('-e, --email <type>', 'email')
   .option('-p, --phone <type>', 'phone');

program.parse();

const options = program.opts();
invokeAction(options);

// invokeAction(argv);

// invokeAction({ action: 'read' });
// invokeAction({ action: 'get', id: 'Z5sbDlS7pCzNsnAHLtDJd' });
// invokeAction({
//    action: 'add',
//    name: 'newName',
//    email: 'newmail@mail.com',
//    phone: '(077) 777-7777',
// });
// invokeAction({
//    action: 'delete',
//    id: 'xVGo4_b8u7j940xb0lCMj',
// });
