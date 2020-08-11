import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDtyofw6IcKQh9AnqBaxGH93Yxgzs74zrE",
  authDomain: "crwn-db-d5ab4.firebaseapp.com",
  databaseURL: "https://crwn-db-d5ab4.firebaseio.com",
  projectId: "crwn-db-d5ab4",
  storageBucket: "crwn-db-d5ab4.appspot.com",
  messagingSenderId: "436446874065",
  appId: "1:436446874065:web:a95c76592005bf6571f8f0",
  measurementId: "G-PE54XLS0W9"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  // If the snapshot shows no user data in the db then put some in
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  // Do a batch write to ensure all data is saved in one shot
  const batch = firestore.batch();
  objectsToAdd.forEach( obj => {
    // Make an empty document with a unique id by not passing an arg to .doc()
    const newDocRef = collectionRef.doc();
    // Add the data to the empty document added to the batch
    batch.set(newDocRef, obj);
  });
  // Batch write all the data here, returns a promise, makes it chainable
  return await batch.commit()
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map( doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });
  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;