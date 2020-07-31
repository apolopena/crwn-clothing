import React from 'react';
import  { connect } from 'react-redux';

import { selectCollectionsFromPreview } from '../../redux/shop/shop.selectors';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../collection-preview/collection-preview.component';

import './collections-overview.styles.scss';

const CollectionsOverview = ({ collections }) => (
  <div className='collections-overview'>
    {
      collections.map(({ id, ...otherItemProps}) => (
        <CollectionPreview key={id} {...otherItemProps} />
      ))
    }
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsFromPreview
});

export default connect(mapStateToProps)(CollectionsOverview);
