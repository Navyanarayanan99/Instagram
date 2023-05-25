import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../common/colors';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {request, PERMISSIONS} from 'react-native-permissions';
import firestore from '@react-native-firebase/firestore';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const Story = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const openImagePicker = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
    })
      .then(response => {
        const uri = response.path;
        setImageUri(uri);
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const uploadImageToFirestore = async () => {
    try {
      await firestore()
        .collection('story')
        .add({
          imageUri: imageUri,
          timestamp: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log('added');
          setImageUri('');
          scheduleStoryDeletion(storyRef.id);
        });
    } catch (error) {
      console.log('Error uploading image to Firestore: ', error);
    }

    // if (imageUri) {
    //   const imageFileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    //   const imagePath = `${RNFS.DocumentDirectoryPath}/${imageFileName}`;

    //   try {
    //     await RNFS.copyFile(imageUri, imagePath);
    //     const fileData = await RNFS.readFile(imagePath, 'base64');
    //     const docId = firestore().collection('story').doc().id;

    //     await firestore()
    //       .collection('story')
    //       .doc(docId)
    //       .set({ image: fileData });

    //     const imageUrl = await firestore()
    //       .collection('story')
    //       .doc(docId)
    //       .get()
    //       .then((snapshot) => snapshot.data().image);

    //     await RNFS.unlink(imagePath);

    //     Alert.alert('Image uploaded successfully!');
    //     // Display the image on the screen
    //     setImageUri(imageUrl);
    //   } catch (error) {
    //     console.log('Error uploading image to Firestore: ', error);
    //   }
    // } else {
    //   Alert.alert('Please select an image first!');
    // }
  };
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'column'}}>
          <TouchableOpacity style={styles.circle} onPress={openImagePicker}>
            <Image
              source={require('../../assets/images/add.png')}
              style={styles.add}
            />
            {imageUri && (
              <TouchableOpacity
                style={styles.image}
                onPress={uploadImageToFirestore}>
                <Image source={{uri: imageUri}} style={styles.image} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          <Text style={{color: colors.black, marginLeft: 5}}>Your Story</Text>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[1, 1, 1, 1, 1, 1, 1]}
          renderItem={({item, index}) => {
            return <TouchableOpacity style={styles.circle}></TouchableOpacity>;
          }}
        />
      </View>
    </ScrollView>
  );
};
export default Story;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  circle: {
    width: wp('18%'),
    height: hp('10%'),
    borderRadius: 40,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    borderColor: '#c13584',
  },
  add: {
    height: hp('2.5%'),
    width: wp('4.5%'),
    marginLeft: 48,
    marginTop: 50,
    position: 'relative',
  },
  image: {
    width: wp('17%'),
    height: hp('9%'),
    borderRadius: 50,
    position: 'absolute',
  },
});
