import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  import {colors} from '../common/colors';
  import { useNavigation } from '@react-navigation/native';
  const {width, height} = Dimensions.get('screen');
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  const AccountHeader = () => {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Header</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Favourite')}>
          <Image
            source={require('../../assets/images/more.png')}
            style={{height: hp('3%'), width: wp('5.5%'), marginLeft: 200,}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Image
            source={require('../../assets/images/menu.png')}
            style={{height: hp('3%'), width: wp('7%')}}
          />
        </TouchableOpacity>
      </View>
    );
  };
  
  export default AccountHeader;
  
  const styles = StyleSheet.create({
    container: {
      width: width,
      height: hp('8%'),
      backgroundColor: colors.white,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    headerText: {
      fontSize: 20,
      color: colors.black
    },
  });
  