import React from 'react';
import { connect } from 'react-redux';

import { selectCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

import {
  CollectionPageContainer,
  CollectionItemTitleContainer,
  CollectionItemContainer
} from './collection.styles';

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <CollectionPageContainer>
      <CollectionItemTitleContainer>{title}</CollectionItemTitleContainer>
      <CollectionItemContainer>
        {
          items.map(item => (<CollectionItem key={item.id} item={item} />))
        }
      </CollectionItemContainer>
    </CollectionPageContainer>
  )
}

// Second arg: ownProps are all the props from this component
// curry state to the select selectCollections (note the s) function that is return from selectCollection
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);