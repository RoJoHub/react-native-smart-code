# react-native-smart-code

## Getting started

`$ npm install react-native-smart-code --save`
or
`$ yarn add react-native-smart-code`

### Mostly automatic installation

`$ react-native link react-native-smart-code`

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-smart-code` and add `RNCodeGenerator.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `RNCodeGenerator.framework` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`

- Add `import com.react_native_code_generator.RNCodeGeneratorPackage;` to the imports at the top of the file
- Add `new RNCodeGeneratorPackage()` to the list returned by the `getPackages()` method

```diff
+ import com.react_native_code_generator.RNCodeGeneratorPackage;

  public class MainApplication extends Application implements ReactApplication {
    //......

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
+         new RNCodeGeneratorPackage(),
          new MainReactPackage()
      );
    }

    ......
  }
```

2. Append the following lines to `android/settings.gradle`:

```diff
...
include ':app'
+ include ':react-native-smart-code'
+ project(':react-native-smart-code').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-smart-code/android')

```

3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:

```diff
dependencies {
    ...
    compile "com.facebook.react:react-native:+"  // From node_modules
+   compile project(':react-native-smart-code')
}
```

## Usage

### React Native

```javascript
import CodeGenerator from 'react-native-smart-code';

const ImageWidth = 300;
const ImageHeight = 100;

const data = await CodeGenerator.generate({
  type: CodeGenerator.Type.Code128,
  code: 'codeValue'
});

<Image
  source={{ uri: data }}
  resizeMode="cover"
  style={{
    height: ImageHeight,
    width: ImageWidth,
    borderColor: 'black',
    borderWidth: 1
  }}
/>;
```

### React

Note: `generate`API width max value is 4,height max value is 150

```javascript
import CodeGenerator from 'react-native-smart-code';

const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 100;

const data = await CodeGenerator.generate({
  type: CodeGenerator.Type.Code128,
  code: 'codeValue'
});

<img src={data} width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />;
```

#### HTML

Note: `generate`API width max value is 4,height max value is 150

```HTML
<script src="../../lib/CodeGenerator.web.js"></script>
<script>
  const promise = CodeGenerator.default.generate({
    type: CodeGenerator.Type.Code128,
    code: 'codeValue'
  })
  promise.then(function (value) {
    console.log(value, (typeof value));
  }, function (error) {
    console.log(error.message)
  });
</script>
```
