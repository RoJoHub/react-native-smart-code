/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TextInput,
  Image,
  Button
} from 'react-native';
import CodeGenerator from 'react-native-smart-code';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      base64Image: 'data:image/png;base64,',
      currentType: CodeGenerator.Type.Code128,
      currentSize: {
        width: 350,
        height: 200
      },
      barcodeSize: {
        width: 350,
        height: 200
      },
      qrcode: {
        width: 300,
        height: 300
      }
    };
  }

  processGenerateBarcode = async event => {
    try {
      const content = event.nativeEvent.text;
      const data = await CodeGenerator.generate({
        type: this.state.currentType,
        code: content,
        ...this.state.currentSize
      });
      this.setState({ base64Image: data }, () => {
        console.log(this.state.base64Image);
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Button
            title="QRCode"
            onPress={() => {
              this.setState({
                currentSize: this.state.qrcode,
                currentType: CodeGenerator.Type.QRCode
              });
            }}
          />
          <Button
            title="BarCode"
            onPress={() => {
              this.setState({
                currentSize: this.state.barcodeSize,
                currentType: CodeGenerator.Type.Code128
              });
            }}
          />
        </View>
        <TextInput
          placeholder="code value"
          style={{
            height: 50,
            alignSelf: 'stretch',
            paddingHorizontal: 16,
            margin: 32,
            borderColor: 'gray',
            borderWidth: 1,
            borderStyle: 'dashed'
          }}
          onChange={this.processGenerateBarcode}
        />
        <Image
          source={{ uri: this.state.base64Image }}
          resizeMode="stretch"
          style={{
            ...this.state.currentSize,
            borderColor: 'black',
            borderWidth: 1
          }}
        />
      </View>
    );
  }
}
