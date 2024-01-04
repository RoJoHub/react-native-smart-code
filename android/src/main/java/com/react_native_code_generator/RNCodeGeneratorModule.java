package com.react_native_code_generator;

import android.graphics.Bitmap;
import android.util.Base64;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by Jerry-Luo on 16/1/18.
 */

public class RNCodeGeneratorModule extends ReactContextBaseJavaModule {
    public RNCodeGeneratorModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    enum GeneratorCodeType {
        Code128("1"), QRCode("2");

        private String mValue;

        GeneratorCodeType(String value) {
            this.mValue = value;
        }

        @Override
        public String toString() {
            return mValue;
        }

        private static final Map<String, GeneratorCodeType> typesByValue = new HashMap<String, GeneratorCodeType>();

        static {
            for (GeneratorCodeType type : GeneratorCodeType.values()) {
                typesByValue.put(type.mValue, type);
            }
        }

    }

    @Override
    public String getName() {
        return "RNCodeGeneratorModule";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("Code128", GeneratorCodeType.Code128.toString());
        constants.put("QRCode", GeneratorCodeType.QRCode.toString());
        return constants;
    }

    @ReactMethod
    public void generateCode(ReadableMap params, Promise promise) {
        String code = params.getString("code");

        String typeValue = params.getString("type");
        GeneratorCodeType type = GeneratorCodeType.typesByValue.get(typeValue);
        int width = params.getInt("width");
        int height = params.getInt("height");


        String base64ImageString = null;
        try {

            BarcodeFormat format = null;
            switch (type) {
                case QRCode:
                    format = BarcodeFormat.QR_CODE;
                    break;
                case Code128:
                    format = BarcodeFormat.CODE_128;
                    break;
                default:
                    promise.reject("-1", "Code Type is incorrect");
                    return;
            }

            base64ImageString = this.generateBarcode(format, code, width, height);
            promise.resolve(base64ImageString);

        } catch (Exception e) {
            promise.reject(e);
            e.printStackTrace();
        }
    }

    @ReactMethod
    public String generateBarcode(BarcodeFormat type, String contents, int width, int height) throws Exception {
        Map hints = new HashMap<>();
        hints.put(EncodeHintType.CHARACTER_SET, "utf-8");
        hints.put(EncodeHintType.MARGIN, 0);   //先设置margin为1
        BitMatrix matrix = new MultiFormatWriter()
                .encode(contents, type, width, height, hints);
        int matrixWidth = matrix.getWidth();
        int matrixHeight = matrix.getHeight();
        int[] pixels = new int[matrixWidth * matrixHeight];
        for (int y = 0; y < matrixHeight; y++) {
            for (int x = 0; x < matrixWidth; x++) {
                if (matrix.get(x, y)) {
                    pixels[y * matrixWidth + x] = 0xff000000;
                }
            }
        }
        Bitmap bitmap = Bitmap.createBitmap(matrixWidth, matrixHeight,
                Bitmap.Config.ARGB_8888);
        bitmap.setPixels(pixels, 0, matrixWidth, 0, 0, matrixWidth, matrixHeight);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream);
        String barcodeBase64 = Base64.encodeToString(outputStream.toByteArray(), Base64.NO_WRAP);
        return barcodeBase64;
    }


}
