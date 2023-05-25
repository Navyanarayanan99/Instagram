import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const More = () => {
  const uploadImageToFirestore = async () => {
    try {
      await firestore()
        .collection('upload')
        .add({
          imageUri: imageUri,
          timestamp: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log('Post added');
          setImageUri('');
          scheduleStoryDeletion(storyRef.id);
        });
    } catch (error) {
      console.log('Error uploading image to Firestore: ', error);
    }
  }
  return (

    <View>
      <Text>More</Text>
    </View>
  )
}

export default More

const styles = StyleSheet.create({})