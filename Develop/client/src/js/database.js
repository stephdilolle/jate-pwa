import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Putting content into the database');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  // Add a new entry (id will auto-increment)
  const id = await store.add({ content });
  await tx.done;
  console.log(`Content added to the database with id: ${id}`);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Getting content from the database');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // Get all 
  const allRecords = await store.getAll();
  await tx.done;
  console.log('Content retrieved from the database');
  return allRecords;
};

initdb();