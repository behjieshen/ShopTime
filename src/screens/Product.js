import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import { withNavigation } from 'react-navigation';
import TabNavigator from '../components/TabNavigator';
import Info from './ProductInfo';
import Measurements from './ProductSize';
import SizeChooser from '../components/SizeChooser';

import FavouriteButton from '../components/FavouriteButton';

import Icon from 'react-native-vector-icons/Ionicons';

let imageWidth = Dimensions.get('window').width;
function getImageHeight(imageWidth) {
  return (imageWidth * 1100) / 762;
}

let Tabs = TabNavigator({
  Info,
  Measurements
});

class Product extends Component {
  render() {
    data = this.props.navigation.getParam('data');
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-round-back" size={44} color="#212224" />
            </TouchableOpacity>
            <FavouriteButton product_id={data.product_id} />
          </View>
          <Image
            source={{ uri: data.imageUrl }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <View style={{ margin: 20 }}>
            <Text style={styles.productTitle}>{data.name}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10
              }}
            >
              <Text style={styles.productPromoPrice}>$ {data.promo_price}</Text>
              <Text style={styles.productOriPrice}>$ {data.ori_price}</Text>
            </View>
            <SizeChooser sizes={data.sizes} productName={data.name} />
          </View>
          <Tabs
            screenProps={{
              description: data.description,
              washing_instructions: data.washing_instructions,
              sizes: data.sizes,
              size_description: data.size_description
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    width: imageWidth - 40
  },
  productImage: {
    width: imageWidth,
    height: getImageHeight(imageWidth)
  },
  productTitle: {
    color: '#212224',
    fontFamily: 'Montserrat-Medium',
    fontSize: 22
  },
  productPromoPrice: {
    color: '#0070D6',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginRight: 10
  },
  productOriPrice: {
    color: '#212224',
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  }
});

export default withNavigation(Product);
