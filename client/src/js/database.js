import { openDB } from 'idb';

// Initializes indexedDB
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: false });
      console.log('jate database created');
    },
  });

// Updating the data with indexedDB
export const putDb = async (content) => {
  	console.log("Updating data...")
	// Creates a connection to database & version to be used
	const jateDB = await openDB('jate', 1);
	// Creates new "transaction" and specifies database and what someone can do with that data (in this case, possible to read and edit)
	const tx = jateDB.transaction('jate', 'readwrite');
	// Opens the object store
	const store = tx.objectStore('jate');
	// uses .put to store content with an associated id
	const request = store.put({ id: 1, content: content });
	const result = await request;
	console.log("Data updated!", result);
};

// Retrieving the data with indexedDB
export const getDb = async () => {
  	console.log("Retrieving data...")
	// Creates a connection to database & version to be used
	const jateDb = await openDB('jate', 1);
	// Creates new "transaction" and specifies database and what someone can do with that data (in this case, it is only possible to read)
	const tx = jateDb.transaction('jate', 'readonly');
	// Opens the object store
	const store = tx.objectStore('jate');
	// uses .get to get content with the associated id
	const request = store.get(1);
	const result = await request;
  	console.log("Data Retrieved!", result)
	// returns only the value of the result (not the id!). ? helps in case the result is undefined
	return result?.value;
};

initdb();
