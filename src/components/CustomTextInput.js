import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../common/colors';

const RenderIcon = props => {
  const {iconType, passwordShow} = {...props};
  const imagePath =
    iconType === 'password'
      ? passwordShow
        ? require('../../assets/images/eye.png')
        : require('../../assets/images/eye-crossed.png')
      : null;
  return (
    <>
      <Image source={imagePath} style={style.iconStyle} />
    </>
  );
};

const CustomTextInput = props => {
  const {
    value,
    placeholder,
    type,
    onChangeText,
    error,
    multiline,
    keyboardType,
    editable = true,
  } = {...props};
  const {width, height} = Dimensions.get('window');
  const [focus, setFocus] = useState(false);
  const [color, setColor] = useState(colors.grey);
  const [brColor, setBrColor] = useState(
    error?.includes(type) ? 'red' : colors.borderGrey,
  );
  const [passwordShow, setPasswordShow] = useState(false);

  useEffect(() => {
    if (focus) {
      setColor(colors.lightGray);
      setBrColor(colors.lightGray);
    } else {
      setColor(colors.grey);
      setBrColor(error?.includes(type) ? 'red' : colors.borderGrey);
    }
  }, [focus]);

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  return (
    <View style={style.container}>
      <View
        style={[
          style.textInputContainer,
          {borderColor: '#EEEEEE', backgroundColor: '#FAFAFA'},
        ]}>
        <TextInput
          style={[
            style.customTextInput,
            {
              width: type === 'search-field' ? width * 0.825 : width * 0.8,
              padding: type === 'search-field' ? width * 0.03 : width * 0.05,
              height: multiline ? width * 0.4 : width * 0.15,
            },
          ]}
          editable={editable}
          secureTextEntry={type === 'password' ? !passwordShow : false}
          selectionColor={color}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          onChangeText={onChangeText}
          defaultValue={value}
          keyboardType={keyboardType === 'number' ? 'decimal-pad' : 'default'}
          multiline={multiline ?? false}
        />
          {type === 'email' || type === 'password' ? (
          <TouchableOpacity
            disabled={type === 'password' ? false : true}
            onPress={togglePassword}>
            <RenderIcon iconType={type} passwordShow={passwordShow} />
          </TouchableOpacity>
        ) : (
          <View style={style.iconStyle}></View>
        )}
      </View>
    </View>
  );
};

export default CustomTextInput;
export const style = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: 15,
      
    },
    textInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 1.25,
    },
    customTextInput: {
      color: '#8A8A8A',
      fontFamily: 'Lato-Regular',
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
      marginRight: 15,
      color: '#C7C7C7'
    },
  });
  