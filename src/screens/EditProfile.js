import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Input} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import {colors} from '../common/colors';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const EditProfile = () => {
  const navigation = useNavigation();
  const [pic, setPic] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState('');

  useFocusEffect(
    useCallback(() => {
      getUserDetails();
      addUser();
      return () => {
        console.log('Screen was unfocused');
      };
    }, []),
  );

  const getUserDetails = async () => {
    // await firestore()
    //   .collection('Users')
    //   .get()
    //   .then(snapshot => {
    //     if (snapshot.empty) {
    //       console.log('empty');
    //     } else {
    //       const objectsArray = [];
    //       snapshot?.docs.forEach(document => {
    //         if (document.exists) {
    //           const result = {id: document.id, ...document?.data()};
    //           objectsArray.push(result);
    //         }
    //       });
    //       const user = objectsArray[0];
    //       setUsername(user.username || '');
    //       setPhone(user.phone || '');
    //       setEmail(user.email || '');
    //       setName(user.name || '');
    //       setPic(user.pic || '');
    //       setBio(user.bio || '');
    //       console.log(objectsArray);
    //     }
    //   });
  };

  const addUser = async () => {
    // try {
    //   await firestore()
    //     .collection('Users')
    //     .add({
    //       name: name,
    //       bio: bio,
    //       pic: pic,
    //     })
    //     .then(() => {
    //       setName('');
    //       setBio('');
    //       setPic('');
    //     });
    // } catch (err) {
    //   console.log(err, 'error');
    // }
  };

   const updateProfile = async () => {
  //   await firestore()
  //     .collection('Users')
  //     .doc()
  //     .update({
  //       name: name,
  //       username: username,
  //       email: email,
  //       pic: pic,
  //       phone: phone,
  //       bio: bio,
  //     })
  //     .then(() => {
  //       Snackbar.show({
  //         text: 'Added!',
  //         duration: Snackbar.LENGTH_SHORT,
  //         backgroundColor: '#77C8F8',
  //         textColor: 'white',
  //       });
  //     });
   };
  const handleLibrary = async () => {
    const options = {mediaType: 'photo'};
    const result = await launchImageLibrary(options);
    setPic(result.assets[0].uri);
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/images/close.png')}
              style={{height: hp('2%'), width: wp('4%'), marginRight: 90}}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Edit Profile</Text>
          <TouchableOpacity onPress={() => updateProfile()}>
            <Image
              source={require('../../assets/images/check.png')}
              style={{height: hp('3%'), width: wp('5.5%')}}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.profileCircle}>
          <Image
            source={pic ? {uri: pic} : require('../../assets/images/user.png')}
            style={{height: hp('10%'), width: wp('19%'), borderRadius: 50}}
          />
        </TouchableOpacity>
        {/* { pic && (
          <TouchableOpacity style={styles.profileCircle}>
          <Image source={{uri : pic}}  style={{height: 80, width: 80, borderRadius: 50}} />
          </TouchableOpacity> m
        )} */}
        <TouchableOpacity
          onPress={() => {
            handleLibrary();
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#2FA3F5',
              marginTop: 10,
            }}>
            Change Profile Photo
          </Text>
        </TouchableOpacity>
        <Input
          style={styles.input}
          value={name}
          onChangeText={txt => setName(txt)}
          placeholder="Name"
        />
        <Input
          style={styles.input}
          value={username}
          onChangeText={txt => setUsername(txt)}
          placeholder="Username"
        />
        <Input
          style={styles.input}
          value={bio}
          onChangeText={txt => setBio(txt)}
          placeholder="Bio"
        />
        <Input
          style={styles.input}
          value={email}
          onChangeText={txt => setEmail(txt)}
          placeholder="Email"
        />
        <Input
          style={styles.input}
          value={phone}
          onChangeText={txt => setPhone(txt)}
          placeholder="Phone"
        />
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
  },
  profileCircle: {
    width: wp('20%'),
    height: hp('11%'),
    borderRadius: 50,
    borderWidth: 0.4,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  headerContainer: {
    width: wp('100%'),
    height: hp('8%'),
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: colors.black,
    marginRight: 90,
  },
});
