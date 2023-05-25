
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Instagram</Text>
        <Image
         source={require('../../assets/images/chat.png')}
          style={{height: 25, width:25,position:'absolute',right:10}}
        />
        <Image
          source={require('../../assets/images/heart.png')}
          style={{height: 25, width:25,position:'absolute',right:50}}
        />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: "white",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    color: "black",
    position:'absolute',
    left:'2%'
  },
});

// import {
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import React from 'react';
// import {colors} from '../common/colors';
// import { useNavigation } from '@react-navigation/native';
// const {width, height} = Dimensions.get('screen');
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// const Header = () => {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Instagram</Text>
//       <TouchableOpacity onPress={() => navigation.navigate('Favourite')}>
//         <Image
//           source={require('../../assets/images/heart.png')}
//           style={{height: hp('3%'), width: wp('5.5%'),position:'absolute',left: 170,}}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
//         <Image
//           source={require('../../assets/images/chat.png')}
//           style={{height: hp('3%'), width: wp('5%'), position: 'absolute', left: 80}}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Header;

// const styles = StyleSheet.create({
//   container: {
//     width: wp('100%'),
//     height: hp('9%'),
//     backgroundColor: colors.white,
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 20,
//     color: colors.black,
//     position: 'absolute',
//     left: 10
//   },
// });
