import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {Image} from 'react-native-elements';
import { colors } from '../../common/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const numColumns = 3;
const MyPhotos = () => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        data={[1, 1, 1, 1, 1, 1, 1, 1, 1]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity style={styles.square}>
              <Image
                source={require('../../../assets/images/user.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default MyPhotos;

const styles = StyleSheet.create({
  square: {
    width: wp('35%'),
    height: hp('22%'), 
    borderWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  image: {
    width: 130,
    height: 130,
  },
});
