import React from 'react';
import {Dimensions, View, Text, Image, TouchableOpacity} from 'react-native';
import { colors } from '../common/colors';

const CustomTabBarContent = ({state, descriptors, navigation}) => {
  const {width, height} = Dimensions.get('screen');
  return (
    <View
      style={{
        width: width,
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: colors.white,
        paddingVertical: 12,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const icon =
          route.name === 'Home'
            ? require('../../assets/images/home.png')
            : route.name === 'Search'
            ? require('../../assets/images/search.png')
            : route.name === 'Account'
            ? require('../../assets/images/more.png')
            : route.name === 'Account'
            ? require('../../assets/images/clapperboard.png')
            : null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            {isFocused ? (
              <Text
                style={{
                  color: colors.white,
                  fontSize: 35,
                  textAlign: 'left',
                  marginTop: -35,
                  fontFamily: 'Lato-Regular'
                }}>
                .
              </Text>
            ) : null}
            <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
                marginBottom: 5,
              }}
              source={icon}
            />
            <Text
              style={{
                fontFamily: 'Lato-Black',
                fontSize: 16,
                color: colors.black,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBarContent;
