// To memoize data FROM the redux store (only)
import { createSelector } from 'reselect';

// To memoize data that is NOT in the redux store
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsFromPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(
    key => collections[key]
  )
);

export const selectCollection = memoize(collectionUrlParam => 
  createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
  )
);