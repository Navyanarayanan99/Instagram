import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView
} from 'react-native';
import React, {useCallback, useState, useEffect, useRef} from 'react';
import AccountHeader from '../components/AccountHeader';
import {colors} from '../common/colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Highlight from '../components/Highlight';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Account = () => {
  const navigation = useNavigation();
  // const [pic, setPic] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState('');
  // const [bio, setBio] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');

  useFocusEffect(
    useCallback(() => {
      getUsername();
      return () => {
        console.log('Screen was unfocused');
      };
    }, []),
  );

  const getUsername = async () => {
    try {
      const snapshot = await firestore().collection('Users').get();

      if (snapshot.empty) {
        console.log('empty');
      } else {
        const objectsArray = [];
        snapshot.docs.forEach(document => {
          if (document.exists) {
            const result = {
              id: document.id,
              ...document.data(),
            };
            objectsArray.push(result);
          }
        });
        const user = objectsArray[0];
        setUsername(user.username || '');
        setName(user.name || '');
      }
    } catch (error) {
      console.error('Error retrieving usernames:', error);
    }
  };

  return (
    <View style={styles.container}>
      <AccountHeader />
     <ScrollView style={{flexDirection: 'column'}}>
     <View>
        <View style={styles.profile}>
          <TouchableOpacity
            onPress={() => handleLibrary()}
            style={styles.profileCircle}>
            <Image
              source={require('../../assets/images/user.png')}
              style={{height: hp('9%'), width: wp('16%'), marginLeft: 10, marginTop: 5}}
            />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', marginLeft: 20}}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 16, fontWeight: '700', color: colors.black}}>
                0
              </Text>
              <Text
                style={{fontSize: 16, fontWeight: '700', color: colors.black}}>
                Post
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: colors.black,
                  marginLeft: 35,
                }}>
                0
              </Text>
              <Text
                style={{
                  marginLeft: 40,
                  fontSize: 16,
                  fontWeight: '700',
                  color: colors.black,
                }}>
                Followers
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: colors.black,
                  marginLeft: 35,
                }}>
                0
              </Text>
              <Text
                style={{
                  marginLeft: 40,
                  fontSize: 16,
                  fontWeight: '700',
                  color: colors.black,
                }}>
                Following
              </Text>
            </View>
          </View>
        </View>
        <View style={{marginLeft: 20, marginTop: 8}}>
          <Text style={{fontSize: 17, fontWeight: '500', color: colors.black}}>
            {name}
            name
          </Text>
          <Text style={{fontSize: 15, fontWeight: '400', color: colors.black}}>
            {username}
          </Text>
          <Text style={{fontSize: 15, fontWeight: '400', color: colors.black}}>
            Bio
          </Text>
        </View>
        <View style={{flexDirection: 'row', height: hp('6.5%'), marginBottom: 10}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EditProfile')}>
            <Text style={{color: colors.black}}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={{color: colors.black}}>Share Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 20, marginLeft: 10}}>
          <Highlight />
        </View>
      </View>
     </ScrollView>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profile: {
    marginLeft: 10,
    // marginTop: 10,
    flexDirection: 'row',
  },
  profileCircle: {
    width: wp('18%'),
    height: hp('10%'),
    borderRadius: 50,
    borderWidth: 0.4,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: wp('42%'),
    height: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    borderRadius: 10,
    borderWidth: 1,
  },
});
