//
//  RCTConvert+CodeType.m
//  react-native-smart-code
//
//  Created by Jerry on 2018/4/17.
//  Copyright © 2018年 Jerry. All rights reserved.
//

#import "RCTConvert+GeneratorCodeType.h"

@implementation RCTConvert (GeneratorCodeType)

RCT_ENUM_CONVERTER(GeneratorCodeType, (@{
                                                @"codeTypeCode128" : @(GeneratorCode_Code128),
                                                @"codeTypeQRCode" : @(GeneratorCode_QRCode)}),
                   GeneratorCode_Code128, integerValue)
@end
