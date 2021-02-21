import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import AppImages from 'res';
import {Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {AddItemsToCart} from 'actions';

const screenWidth = Math.round(Dimensions.get('window').width);

function CartScene(props) {
  const [cartItems, setCartItems] = useState([]);

  renderTopView = () => {
    return (
      <View style={styles.topViewContainer}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{}}>
          <Image
            resizeMode={'center'}
            style={{height: 30, width: 30}}
            source={AppImages.ic_back}
          />
        </TouchableOpacity>
        <Text style={styles.topViewTitleText}>Cart</Text>
      </View>
    );
  };

  renderTotalItemsView = () => {
    return (
      <View style={{flexDirection: 'row', paddingHorizontal: 32, marginTop: 16}}>
        <View style={styles.cartSizeContainer}>
          <Text style={styles.cartSizeText}>
            {props.userData.cartItems.length}
          </Text>
        </View>
        <Text style={styles.addedText}> Added</Text>
      </View>
    );
  };

  function renderCartItems(item, index) {
    let isAddedToCart = false;
    let buttonBg = {};
    props.userData.cartItems.forEach((value) => {
      if (value.id === item.id) {
        isAddedToCart = true;
        return;
      }
    });
    if (isAddedToCart) {
      buttonBg = {backgroundColor: 'red'};
    } else {
      buttonBg = {backgroundColor: '#6100ff'};
    }
    return (
      <View key={index} style={styles.oneRowItemContainer}>
        <View style={{flexDirection: 'row', margin: 16}}>
          <Image style={[styles.itemImage]} source={{uri: item.imgUrl}} />
          <View style={{margin: 8, flex: 1}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
            <Text style={{marginTop: 4, fontSize: 14}}>{item.author}</Text>
            <TouchableOpacity
              onPress={() => onRemoveFromCartDidPressed(item)}
              style={[styles.addToCartContainerView, buttonBg]}>
              <Text style={styles.addToCartText}>
                {isAddedToCart === true ? '-' : '+'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function onRemoveFromCartDidPressed(item) {
    let allItems = props.userData.cartItems;
    let tempItems = [];
    allItems.forEach((data) => {
      if (data.id === item.id) {
        if (data.qty > 1) {
          data.qty = data.qty - 1;
          tempItems.push(data);
        }
      } else {
        tempItems.push(data);
      }
    });
    // this.setState({cartItems: tempItems});
    props.addItemsToCart(tempItems);
  }

  function renderCartEmptyView() {
    return (
      <View style={styles.emptyCartContainer}>
        <Text
          style={{
            fontSize: 20,
            height: '100%',
            textAlignVertical: 'center',
          }}>
          Cart Empty
        </Text>
      </View>
    );
  }

  console.warn(props.userData.cartItems);
  let isCartEmpty = props.userData.cartItems.length === 0;
  return (
    <SafeAreaView style={styles.safeAreaConatiner}>
      <View style={styles.containerView}>
        {renderTopView()}
        {isCartEmpty && renderCartEmptyView()}
        {!isCartEmpty && renderTotalItemsView()}

        {!isCartEmpty && (
          <FlatList
            style={{paddingHorizontal: 32, marginTop: 8}}
            data={props.userData.cartItems}
            renderItem={({item, index}) => renderCartItems(item, index)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaConatiner: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerView: {
    flex: 1,
  },
  topViewContainer: {
    flexDirection: 'row',
    marginTop: 28,
    marginHorizontal: 32,
    alignItems: 'center',
  },
  topViewTitleText: {
    textAlignVertical: 'center',
    paddingHorizontal: 14,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  itemImage: {
    height: 100,
    width: 100,
    borderRadius: 8,
    backgroundColor: 'grey',
  },
  cartOneRowContainer: {
    marginTop: 16,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#F8F9FC',
    elevation: 3,
    flexDirection: 'row',
  },
  emptyCartContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
  },
  oneRowItemContainer: {
    marginHorizontal: 4,
    backgroundColor: '#F8F9FC',
    elevation: 3,
    marginVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  addToCartContainerView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 8,
    backgroundColor: '#6100ff',
  },
  addToCartText: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  addedText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
    , marginLeft: 8
  },
  cartSizeContainer: {
    backgroundColor: '#f2b337',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    width: 25,
  },
  cartSizeText: {fontSize: 20, color: 'white', textAlign: 'center'},
});

function mapDispatchToProps(dispatch) {
  return {
    addItemsToCart: (items) => dispatch(AddItemsToCart(items)),
  };
}

function mapStateToProps(state) {
  return {
    userData: state.user_data_reducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScene);
