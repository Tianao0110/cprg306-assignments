import { db } from "../../utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";

// get user's items
export const getItems = async (userId) => {
  const items = [];

  // find user's items
  const itemsRef = collection(db, "users", userId, "items");
  const q = query(itemsRef);
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });

  return items;
};

// Create a new item
export const addItem = async (userId, item) => {
  // Add a new document with a generated id
  const itemsRef = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsRef, item);

  // Firebase automatically generates an id
  return docRef.id;
};

// Delete an item
export const deleteItem = async (userId, itemId) => {
  const itemRef = doc(db, "users", userId, "items", itemId);
  await deleteDoc(itemRef);
};
