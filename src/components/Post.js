import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {Image} from 'react-native-elements';
import {colors} from '../common/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Post = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[1, 1, 1, 1, 1, 1, 1]}
        renderItem={({item, index}) => {
          return (
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                <TouchableOpacity style={styles.postContainer} />
                <Text style={styles.name}>Name</Text>
                <Image
                  source={require('../../assets/images/vertical-dots.png')}
                  style={{height: 20, width:20, marginLeft: 200, marginTop: 10, }}
                />
              </View>
              <TouchableOpacity style={styles.post}></TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    height: hp('68%'),
  },
  postContainer: {
    height: hp('5.5%'),
    width: wp('10%'),
    borderRadius: 50,
    borderWidth: 2,
margin: 3,
    borderColor: '#c13584',
  },
  post: {
    height: hp('50%'),
    width: '100%',
    //borderWidth: 1,
    margin: 10,
    alignSelf: 'center'
  },
  name: {
    fontSize: 18,
    color: colors.black,
    fontWeight: '600',
    marginRight: 50,
    marginTop: 8,
  },
});
