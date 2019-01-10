import React, { Component } from 'react';
import CodeGenerator from 'react-native-code-generator';
import logo from './logo.svg';
import './App.css';

const divStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
};

class App extends Component {
  constructor() {
    super();
    this.inputValueOnChange = this.inputValueOnChange.bind(this);
    this.render = this.render.bind(this);

    this.state = {
      imageBase64: '',
      currentType: CodeGenerator.Type.Code128,
      barcodeSize: {
        width: 300,
        height: 100
      },
      qrcodeSize: {
        width: 300,
        height: 300
      },
      size: {
        width: 300,
        height: 100
      }
    };
  }
  async inputValueOnChange(proxy) {
    const obj = document.querySelector('input[name="value"]');
    try {
      const option = {
        ...this.state.size,
        type: this.state.currentType,
        code: obj.value,
      };
      console.log(option);
      const data = await CodeGenerator.generate(option);

      this.setState({ imageBase64: data });
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    return (
      <div className="App">
        
        <div style={divStyle}>
          <div>
            <button
              onClick={() => {
                this.setState({
                  currentType: CodeGenerator.Type.Code128,
                  size: this.state.barcodeSize
                });
              }}
            >
              Barcode
            </button>
            <button
              onClick={() => {
                this.setState({
                  currentType: CodeGenerator.Type.QRCode,
                  size: this.state.qrcodeSize
                });
              }}
            >
              QRCode
            </button>
          </div>

          <p className="App-intro">请输入value来体验</p>
          <input type="text" name="value" onChange={this.inputValueOnChange} />

          <img
            src={this.state.imageBase64}
            width={this.state.size.width}
            height={this.state.size.height}
          />
        </div>
      </div>
    );
  }
}

export default App;
