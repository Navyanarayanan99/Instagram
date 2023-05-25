// In App.js in a new project

import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import CustomTabBarContent from '../components/CustomTabBarContent';
import Search from '../screens/Search';
import More from '../screens/Upload';
import Reals from '../screens/Reals';
import Account from '../screens/Account';
import Favourite from '../screens/Favourite';
import Chat from '../screens/Chat';
import EditProfile from '../screens/EditProfile';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyPhotos from '../screens/TopTab/MyPhotos';
import Tags from '../screens/TopTab/Tags';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StoryScreen from '../components/StoryScreen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';

const Tab = createBottomTabNavigator();
function AppTabs() {

  // useFocusEffect(
  //   useCallback(() => {
  //     handleIconPress();
  //     return () => {
  //       console.log('Screen was unfocused');
  //     };
  //   }, []),
  // );
  const [selectedOption, setSelectedOption] = useState('');
  const [upload, setUpload] = useState(null)

  const openImagePicker = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
    })
      .then(response => {
        const uri = response.path;
        setUpload(uri);
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };
  const handleIconPress = () => {
  try{
        firestore()
          .collection('uploadImage')
          .add({
            upload: upload,
          })
          .then(() => {
            console.log('added');
            setUpload('');
          });
      } catch (error) {
        console.log('Error uploading image to Firestore: ', error);
      }
  
  };
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {width: wp('100')},
        tabBarStyle: {backgroundColor: '#fff'},
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#red',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/images/home.png')}
                style={{height: hp('3.5%'), width: wp('6%')}}
              />
            ) : (
              <Image
                source={require('../../assets/images/home-outline.png')}
                style={{height: hp('3.5%'), width: wp('6.5%')}}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarActiveTintColor: '#000',
          // tabBarInactiveTintColor: '#red',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/images/search.png')}
                style={{height: hp('3.5%'), width: wp('6%')}}
              />
            ) : (
              <Image
                source={require('../../assets/images/search-outline.png')}
                style={{height: hp('3.5%'), width: wp('6.5%')}}
              />
            ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarActiveTintColor: '#000',
          // tabBarInactiveTintColor: '#red',
          tabBarIcon: ({focused}) =>
            focused ? (
              <TouchableOpacity  onPress={handleIconPress}>
                <Image
                  source={require('../../assets/images/more-outline.png')}
                  style={{height: hp('3.5%'), width: wp('6%')}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={openImagePicker}>
                <Image
                  source={require('../../assets/images/more.png')}
                  style={{height: hp('3.5%'), width: wp('6%')}}
                />
              </TouchableOpacity>
            ),
        }}
      />
      <Tab.Screen
        name="Reals"
        component={Reals}
        options={{
          tabBarActiveTintColor: '#000',
          //   tabBarInactiveTintColor: '#red',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/images/clapperboard.png')}
                style={{height: hp('4%'), width: wp('6%')}}
              />
            ) : (
              <Image
                source={require('../../assets/images/video-outline.png')}
                style={{height: hp('3.5%'), width: wp('6%')}}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Top"
        component={TopTab}
        options={{
          tabBarActiveTintColor: '#000',
          //  tabBarInactiveTintColor: '#red',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/images/account-outline.png')}
                style={{height: hp('3.5%'), width: wp('6.5%')}}
              />
            ) : (
              <Image
                source={require('../../assets/images/account.png')}
                style={{height: hp('3.5%'), width: wp('6.5%')}}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const Top = createMaterialTopTabNavigator();
function TopTab() {
  return (
    <View style={{flex: 1}}>
      <Account />
      <Top.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarIndicatorStyle: {backgroundColor: 'black'},
        }}>
        <Top.Screen
          name="MyPhotos"
          component={MyPhotos}
          options={{
            tabBarActiveTintColor: '#000',
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image
                  source={require('../../assets/images/grid.png')}
                  style={{height: hp('3.5%'), width: wp('6%')}}
                />
              ) : (
                <Image
                  source={require('../../assets/images/grid-gray.png')}
                  style={{height: hp('3.5%'), width: wp('6%')}}
                />
              ),
          }}
        />
        <Top.Screen
          name="Tags"
          component={Tags}
          options={{
            tabBarActiveTintColor: '#000',
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image
                  source={require('../../assets/images/tag.png')}
                  style={{height: hp('4.5%'), width: wp('6.5%')}}
                />
              ) : (
                <Image
                  source={require('../../assets/images/taggray.png')}
                  style={{height: hp('4.5%'), width: wp('6.5%')}}
                />
              ),
          }}
        />
      </Top.Navigator>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Tab"
          component={AppTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Favourite"
          component={Favourite}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Top"
          component={TopTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StoryScreen"
          component={StoryScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
