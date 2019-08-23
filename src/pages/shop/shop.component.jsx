import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { updateCollections } from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { createStructuredSelector } from 'reselect';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync()
    // const collectionRef = firestore.collection('collections');

    // collectionRef.get().then(snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
  }

  render() {
    const { match, isCollectionFetching, isCollectionsLoaded } = this.props;
  //   const { loading } = this.state;

    return(
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={props => (
            <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />
          )} />
        <Route path={`${match.path}/:collectionId`} render={props => (
            <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />
          )} />
      </div>
    )
  }
 
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () =>
    dispatch(fetchCollectionsStartAsync())
});
// const mapDispatchToProps = dispatch => ({
//   updateCollections: collectionsMap =>
//     dispatch(updateCollections(collectionsMap))
// });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPage);