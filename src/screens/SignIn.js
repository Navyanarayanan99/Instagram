import {View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SignIn = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorFields, setErrorFields] = useState([]);
  //   const { signIn } = useContext(AuthContext);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');
        if (email !== null && password !== null) {
          setEmail(email);
          setPassword(password);
          navigation.navigate('Tab');
        }
      } catch (e) {
        console.error(e);
      }
    };
    checkLoggedIn();
  }, []);

  const handleSignIn = async () => {
    try {
      const {user} = await auth().signInWithEmailAndPassword(email, password);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      console.log('User logged in successfully!', user);
      navigation.navigate('Tab');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}}>
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/insta.jpg')}
            style={styles.heading}
          />

          <CustomTextInput
            placeholder={'Email'}
            type="email"
            value={email}
            onChangeText={text => setEmail(text)}
            // error={errorFields}
          />
          <CustomTextInput
            placeholder={'Password'}
            value={password}
            type="password"
            onChangeText={text => setPassword(text)}
            //   error={errorFields}
          />
          <TouchableOpacity style={styles.forgotText}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              handleSignIn();
            }}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={styles.hr} />
            <Text style={styles.or}>OR</Text>
            <View style={styles.hr} />
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Image
              source={require('../../assets/images/facebook.png')}
              style={styles.facebookIcon}
            />
            <TouchableOpacity
              style={styles.facebookText}
              // onPress={() =>
              //   onFacebookButtonPress().then(() =>
              //     console.log('Signed in with Facebook!'),
              //   )
              // }
            >
              <Text style={styles.facebookText}>Log In With Facebok</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginTop: 100}}>
            <Text style={{fontSize: 14, fontWeight: '500'}}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 4,
                  fontWeight: '700',
                  color: '#4194F3',
                }}>
                Sign up.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    backgroundColor: '#fff',
    marginTop: 120,
  },
  heading: {
    height: hp('10%'),
    width: wp('48%'),
    marginLeft: 20,
  },
  forgotText: {
    marginLeft: 115,
    color: '#2FA3F5',
    fontWeight: 'bold',
  },
  loginButton: {
    width: wp('89%'),
    height: hp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#77C8F8',
    borderRadius: 10,
    marginTop: 30,
  },
  loginText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  hr: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: wp('35%'),
    marginVertical: 16,
    margin: 20,
  },
  or: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  facebookIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  facebookText: {
    color: '#4194F3',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 4,
    marginTop: 1,
  },
});
