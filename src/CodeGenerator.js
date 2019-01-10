import { NativeModules } from 'react-native';

const codeGenerator = NativeModules.RNCodeGeneratorModule;

const Type = {
  Code128: codeGenerator.Code128,
  QRCode: codeGenerator.QRCode
};

class CodeGenerator {

  static async generate({ type = Type.Code128, code, width=300, height=300 }) {
    const base64Str = await codeGenerator.generateCode({
      type,
      code,
      width,
      height
    });
    return 'data:image/png;base64,'.concat(base64Str);
  }
}

CodeGenerator.Type = Type;
export default CodeGenerator;
