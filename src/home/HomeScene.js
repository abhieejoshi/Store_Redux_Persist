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
import {UserLogOut, AddItemsToCart} from 'actions';

const screenWidth = Math.round(Dimensions.get('window').width);

function HomeScene(props) {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'The Book Thief',
      author: 'Markus Zusak',
      imgUrl:
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1522157426l/19063._SY475_.jpg',
    },
    {
      id: 2,
      name: 'Sapiens',
      author: 'Yuval Noah Harari',
      imgUrl:
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1420585954l/23692271.jpg',
    },
    {
      id: 3,
      name: 'Crime and Punishment',
      author: 'Fyodor Dostoyevsky',
      imgUrl:
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1382846449l/7144.jpg',
    },
    {
      id: 4,
      name: 'No Longer Human',
      author: 'Osamu Dazai',
      imgUrl:
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1422638843l/194746.jpg',
    },
    {
      id: 5,
      name: 'Atomic Habits',
      author: 'James Clear',
      imgUrl:
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1535115320l/40121378._SY475_.jpg',
    },
    {
      id: 7,
      name: 'Dune',
      author: 'Frank Herbert',
      imgUrl:
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1434908555l/234225._SY475_.jpg',
    },
    {
      id: 8,
      name: 'Atlas Shrugged',
      author: 'Ayn Rand',
      imgUrl:
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1405868167l/662.jpg',
    },
  ]);

  function renderTopView() {
    const showCartSize = props.userData.cartItems.length > 0 ? true : false;
    return (
      <View style={styles.topViewContainer}>
        <Text style={styles.topViewTitleText}>Book Shop</Text>
        {showCartSize && (
          <View style={styles.cartSizeContainer}>
            <Text style={styles.cartSizeText}>
              {props.userData.cartItems.length}
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            props.navigation.navigate('CartScene');
          }}>
          <Image
            style={{height: 30, width: 30}}
            resizeMode={'center'}
            source={AppImages.ic_store}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderItems(item, index, type) {
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
              onPress={() => onAddToCartPressed(item, isAddedToCart)}
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

  function onAddToCartPressed(item, isAddedToCart) {
    let items = props.userData.cartItems;
    if (isAddedToCart) {
      let tempItems = [];
      items.forEach((value) => {
        if (item.id !== value.id) {
          tempItems.push(value);
        }
        props.addItemsToCart(tempItems);
      });
    } else {
      items.push({
        id: item.id,
        name: item.name,
        author: item.author,
        imgUrl: item.imgUrl,
        qty: 1,
      });
      props.addItemsToCart(items);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaConatiner}>
      <View style={styles.containerView}>
        {renderTopView()}
        <FlatList
          style={{paddingHorizontal: 32}}
          data={data}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item, index}) => renderItems(item, index)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaConatiner: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  containerView: {
    flex: 1,
  },
  topViewContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 32,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  cartButton: {
    width: 24,
    height: 24,
    alignSelf: 'flex-end',
  },
  typeText: {
    fontWeight: 'bold',
    fontSize: 24,
    letterSpacing: -0.41,
    color: 'black',
    marginTop: 4,
    flex: 4,
  },
  gradientContainerView: {
    width: '100%',
    height: 150,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: '500',
    color: 'white',
    fontWeight: 'bold',
  },
  removeFromCartContainerView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: 'red',
  },
  priceText: {textAlign: 'center', alignContent: 'flex-start', padding: 4},
  itemBottomContainerView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  itemNameText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    padding: 4,
    marginBottom: 16,
    marginEnd: 4,
  },
  itemImage: {
    height: 100,
    width: 100,
    borderRadius: 8,
    backgroundColor: 'grey',
  },
  topViewTitleText: {
    textAlignVertical: 'center',
    paddingHorizontal: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  oneRowItemContainer: {
    marginHorizontal: 4,
    backgroundColor: '#F8F9FC',
    elevation: 3,
    marginVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScene);
