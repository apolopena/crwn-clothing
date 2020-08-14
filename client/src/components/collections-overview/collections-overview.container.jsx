import { connect } from 'react-redux';

import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

import WithSpinner from '../with-spinner/with-spinner.component';
import  CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
});

// Using compose here strictly for readability, cpose reads its args from right to left
// below code is same as:
// connect(mapStateToProps)(WithSpinner(CollectionsOverview))
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;