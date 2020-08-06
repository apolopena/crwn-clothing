// Listen for every action of a specific type
import { takeLatest, call, put } from 'redux-saga/effects';

import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shop.actions';

export function* fetchCollectionsAsync () {
  try {
    const collectionRef = firestore.collection('collections');
    // Instead of collectionRef.get().then().catch()
    const snapshot = yield collectionRef.get();
    // Instead of const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    // Instead of dispatching the function with thunk, in sagas we use put()
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}