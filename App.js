import React, { Component } from 'react';
import { Button, Text, ScrollView, StyleSheet, Image, View } from 'react-native';
import { ImagePicker, Permissions, Constants } from 'expo';

export default class App extends Component {
  state = {
    result: null,
  };

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  useLibraryHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: false,
    });
    this.setState({ result: result.uri });
  };

  useCameraHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: false,
    });
    this.setState({ result: result.uri });
  };

  render() {
    let { result } = this.state
    console.log(this.state)
    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        <Button 
        title="Take a picture" 
        onPress={this.useCameraHandler} />
        <Button
          title="Choose from your saved photos"
          onPress={this.useLibraryHandler}
        />
        {result !== null && 
        (<View  style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.paragraph}>
          Your picture here...
        </Text>
        <Image 
        style={{ flex:1, width: 250, height: 250, borderRadius: 50, marginTop: 30 }}
        source={{ uri: result }}/>
        </View>)
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 150,
    minHeight: 1000,
  },
  paragraph: {
    marginHorizontal: 15,
    marginTop: 30,
    fontSize: 18,
    color: '#34495e',
  },
});