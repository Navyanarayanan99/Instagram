import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Highlight = () => {
  return (
    <View style={styles.container}>
      <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
        data={[1, 1, 1, 1, 1,1,1]}
        renderItem={({item, index}) => {
          return <TouchableOpacity style={styles.circle}></TouchableOpacity>;
        }}
      />
    </View>
  );
};

export default Highlight;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  circle: {
    width: wp('18%'),
    height: hp('10%'),
    borderRadius: 50,
    borderWidth: 0.4,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3
  },
});
