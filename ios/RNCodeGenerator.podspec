require 'json'
version = JSON.parse(File.read('../package.json'))["version"]

Pod::Spec.new do |s|

  s.name            = "react-native-smart-code"
  s.version         = version
  s.homepage        = "https://github.com/RoJoHub/react-native-smart-code"
  s.summary         = "Support React & ReactNative.In react-native,it's create base64 String,which is qrcode or barcode ,and without webview.In react,we use jsbarcode."
  s.license         = "MIT"
  s.author          = { "Jerry.Luo" => "tiancailuohao@gmail.com" }
  s.ios.deployment_target = '7.0'
  s.tvos.deployment_target = '9.0'
  s.source          = { :git => "git@github.com:RoJoHub/react-native-smart-code.git" }
  s.source_files    = '*/*.{h,m}'
  s.preserve_paths  = "**/*.js"
  
  s.dependency 'React'

end
