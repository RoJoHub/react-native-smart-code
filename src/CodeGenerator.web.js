import JsBarcode from 'jsbarcode';
import QRCode from './qrcode';
import { resolve } from 'path';
const Type = {
  Code128: 'Code128',
  QRCode: 'QRCode'
};


class CodeGenerator {
  static async generate({ type = Type.Code128, code }) {
    let base64Image;

    switch (type) {
      case Type.Code128:
        base64Image = await CodeGenerator.generateBarcode(code);
        break;
      case Type.QRCode:
        base64Image = await CodeGenerator.generateQRCode(code);
        break;

      default:
        return;
    }

    return base64Image;
  }

  static async generateBarcode(barcode, width = 4, height = 150) {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, barcode, {
      format: 'CODE128',
      displayValue: false,
      width,
      height
    });
    return canvas.toDataURL('image/png');
  }
  static async generateQRCode(code, width = 500, height = 500) {
    return new Promise((resolve, reject) => {
      try {
        const divObj = document.createElement('div');
        divObj.setAttribute('id', 'qrcodeGenerter');

        const qrcode = new QRCode(divObj, {
          width: 400,
          height: 400
        });
        const img = divObj.querySelector('img');
        img.onload = () => {
          resolve(img.src);
        };
        qrcode.makeCode(code);
      } catch (error) {
        reject(error);
      }
    });
  }
}
CodeGenerator.Type = Type;
export default CodeGenerator;
