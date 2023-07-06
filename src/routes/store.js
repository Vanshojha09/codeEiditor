import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBQueryBuilderPlugin);
// import noteSchema from './rxdb';
// import eventSchema from './eventSchema';
const eventSchema = {
    title: 'event',
    description: 'an individual event',
    version: 0,
    type: 'object',
    // indexes: ['start', 'end'],
    primaryKey: 'id',
    properties: {
      title: {
        type: 'string',
      },
      id: {
        type: 'string',
      },
    },
    required: ['title'],
  };
export const eventList = [
  {
    title:"UI/UX Design Conference Meeting",
    id:"1",
    start: new Date("2023-06-05T02:15:00.000Z").toISOString(),
    end: new Date("2023-06-05T04:30:00.000Z").toISOString(),
    // body:"34rfhu",
    // host: "Meghan Smith",
    // sorted: "Upcoming",
    // status:"Upcoming",
    // color:"#0037FC",
    // backgroundColor:"#0037FC",
    // editable: false,
  },
  {
    title:"UI/UX Design Conference Meeting",
    id:"2",
    start: new Date().toISOString(),
    end: new Date().toISOString(),
    // host: "Meghan Smith",
    // sorted: "Ongoing",
    // status:"Ongoing",
    // color:"#dcdc00",
    // backgroundColor:"#dcdc00",
    // editable: false,
  },
];
/**
 * RxDB ========================================================================
 */

addRxPlugin(RxDBQueryBuilderPlugin);

let dbPromise;

const _create = async () => {
  const db = await createRxDatabase({
    name: 'FilesAppr',
    storage: wrappedValidateAjvStorage({
      storage: getRxStorageDexie(),
    }),
    ignoreDuplicate: true
  });
  await db.addCollections({ files: { schema: eventSchema } });
  dbPromise = db;
  return db;
};
// let val;
export const db = () => dbPromise ? dbPromise : _create();

export const events = writable(browser ? JSON.parse(localStorage.getItem("events") || JSON.stringify(eventList)) : eventList);
events.subscribe((val) => browser && (localStorage.events = JSON.stringify(val)));

export const main = writable(browser ? JSON.parse(localStorage.getItem("main") || JSON.stringify("erv")) : '');
main.subscribe((val) => browser && (localStorage.main = JSON.stringify(val)));
export const utils = writable(browser ? JSON.parse(localStorage.getItem("utils") || JSON.stringify("")) : '');
utils.subscribe((val) => browser && (localStorage.utils = JSON.stringify(val)));
export const styles = writable(browser ? JSON.parse(localStorage.getItem("styles") || JSON.stringify("")) : '');
styles.subscribe((val) => browser && (localStorage.styles = JSON.stringify(val)));

/*
 * Svelte Writables ============================================================
 */

// export const eventListList = writable([]);
export const selectedEvent = writable({});
export const id = writable('');
export const title = writable('');