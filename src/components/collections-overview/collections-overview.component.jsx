import React from 'react';
import  { connect } from 'react-redux';

import { selectCollectionsFromPreview } from '../../redux/shop/shop.selectors';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../collection-preview/collection-preview.component';

import { CollectionsOverviewContainer } from './collection-overview.styles'

const CollectionsOverview = ({ collections }) => (
  <CollectionsOverviewContainer>
    {
      collections.map(({ id, ...otherItemProps}) => (
        <CollectionPreview key={id} {...otherItemProps} />
      ))
    }
  </CollectionsOverviewContainer>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsFromPreview
});

export default connect(mapStateToProps)(CollectionsOverview);
