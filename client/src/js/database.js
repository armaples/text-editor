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
	const jateDB = await openDB('jate', 1);
	const tx = jateDB.transaction('jate', 'readwrite');
	const store = tx.objectStore('jate');
	const request = store.put({ id: 1, content: content });
	const result = await request;
	console.log("Data updated!", result);
};

// Retrieving the data with indexedDB
export const getDb = async () => {
  	console.log("Retrieving data...")
	const jateDb = await openDB('jate', 1);
	const tx = jateDb.transaction('jate', 'readonly');
	const store = tx.objectStore('jate');
	const request = store.get(1);
	const result = await request;
  	console.log("Data Retrieved!", result)
	return result?.value;
};

initdb();
