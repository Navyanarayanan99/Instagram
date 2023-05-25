import {StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [error, setError] = useState('');
  const [errorFields, setErrorFields] = useState([]);
  const navigation = useNavigation();
  const handleSignUp = () => {
    
    if (email != '' && password != '') {
      auth().createUserWithEmailAndPassword(email, password).then((res) => {
        console.log("response", res)
        Alert.alert("Success")
        navigation.navigate('Tab');
        handleUser();
      })
        .catch((error) => {
          console.log("error", error)
          Alert.alert("Error")
        })
    } else {
      Alert.alert("Field Empty")
    }
  }
  const handleUser = async () => {
    try {
      await firestore()
        .collection('Users')
        .add({
          email: email,
          username: username,
          phone: phone,
          password: password,
          cpassword: cpassword,
        })
        .then(() => {
          console.log('User added');
          setEmail('');
          setUsername('');
          setPhone('');
          setPassword('');
          setCpassword('');
          Snackbar.show({
            text: 'Added!',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#77C8F8',
            textColor: 'white',
          });
        });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      if (error.code === 'auth/weak-password') {
        console.log('weak-password');
      }
      console.error('error', error);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        {/* <Header /> */}
        <Image
          source={require('../../assets/images/insta.jpg')}
          style={styles.heading}
        />
        <CustomTextInput
          placeholder={'Username'}
          type="name"
          value={username}
          onChangeText={text => setUsername(text)}
          error={errorFields}
        />

        <CustomTextInput
          placeholder={'Phone number'}
          type="phone"
          value={phone}
          onChangeText={text => setPhone(text)}
          error={errorFields}
        />
        <CustomTextInput
          placeholder={'email'}
          type="email"
          value={email}
          onChangeText={text => setEmail(text)}
          error={errorFields}
        />
        <CustomTextInput
          placeholder={'Password'}
          value={password}
          type="password"
          onChangeText={text => setPassword(text)}
          error={errorFields}
        />
        <CustomTextInput
          placeholder={'Password'}
          value={cpassword}
          type="password"
          onChangeText={text => setCpassword(text)}
          error={errorFields}
        />
        <TouchableOpacity
          style={styles.signupBtn}
          onPress={() => handleSignUp()}>
          <Text style={styles.signupTxt}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  heading: {
    height: '10%',
    width: '58%',
    marginLeft: 20,
  },
  signupBtn: {
    width: '89%',
    height: '9%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#77C8F8',
    borderRadius: 10,
    marginTop: 30,
  },
  signupTxt: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
