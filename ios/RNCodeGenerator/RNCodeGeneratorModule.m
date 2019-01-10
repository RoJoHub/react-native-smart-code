//
//  RNCodeGeneratorModule.m
//  Jerry-Luo<tiancailuohao@gmail.com>
//
//  Created by Jerry on 2018/1/17.
//  Copyright © 2018年 Jerry. All rights reserved.
//

#import "RNCodeGeneratorModule.h"
#import "NKDCode128Barcode.h"
#import "UIImage-NKDBarcode.h"
@implementation RNCodeGeneratorModule

RCT_EXPORT_MODULE();
+ (BOOL)requiresMainQueueSetup{
    return NO;
}
- (dispatch_queue_t)methodQueue
{
    return dispatch_queue_create("com.Jerry.ReactNativeGeneratorModuleQueue", DISPATCH_QUEUE_SERIAL);
}
- (NSDictionary *)constantsToExport
{
    return @{
             @"Code128" : @(GeneratorCode_Code128),
             @"QRCode" : @(GeneratorCode_QRCode),
             };
};


RCT_EXPORT_METHOD(
                  generateCode:(NSDictionary *)infoDict
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ){
    
    NSString *code=infoDict[@"code"];
    
    CGFloat width=[infoDict[@"width"] floatValue];
    CGFloat height=[infoDict[@"height"] floatValue];
    CGSize size=CGSizeMake(width, height);
    
    NSNumber *typeNumber=infoDict[@"type"];
    GeneratorCodeType type=typeNumber.integerValue;
    
    
    
    @try {
        UIImage *image;
        switch (type) {
            case GeneratorCode_Code128:
            {
                NKDCode128Barcode *barcode = [NKDCode128Barcode alloc];
                barcode = [barcode initWithContent:code printsCaption:NO];
                [barcode setBarWidth:1.0];
                [barcode setCodeSet:SET_B];
                [barcode generateChecksum];
                [barcode setWidth:size.width];
                [barcode setHeight:size.height];
                [barcode calculateWidth];
                image= [UIImage imageFromBarcode:barcode];
                
            }
                break;
            case GeneratorCode_QRCode:
            {
                image=[RNCodeGeneratorModule generterQRCode:code size:size];
            }
                break;
                
            default:
                reject(@"-1",@"Code Type is incorrect",nil);
                return;
        }
        
        NSData *imageData=UIImagePNGRepresentation(image);
        NSString *encodedImageStr =[imageData base64EncodedStringWithOptions: 0];
        
        
        resolve(encodedImageStr);
    } @catch (NSException *exception) {
        NSError *error=[NSError errorWithDomain:exception.name code:-1 userInfo:exception.userInfo];
        reject(@"-1",error.domain,error);
    }
}

#pragma mark -
#pragma mark QRCode
#pragma mark -
+ (UIImage *)generterQRCode:(NSString *)code size:(CGSize)size{
    //1.创建过滤器
    CIFilter *filter = [CIFilter filterWithName:@"CIQRCodeGenerator"];
    
    //2.恢复默认
    [filter setDefaults];
    
    //3.给过滤器添加数据
    NSData *data = [code dataUsingEncoding:NSUTF8StringEncoding];
    [filter setValue:data forKey:@"inputMessage"];
    
    //4.获取输出二维码
    CIImage *outputImage = [filter outputImage];
    UIImage *qrcode=[RNCodeGeneratorModule createNonInterpolatedUIImageFromCIImage:outputImage withSize:size];
    return qrcode;
}

+(UIImage *)createNonInterpolatedUIImageFromCIImage:(CIImage *)image withSize:(CGSize)size
{
    CGRect extent = CGRectIntegral(image.extent);
    CGFloat scale = MIN(size.width/CGRectGetWidth(extent), size.height/CGRectGetHeight(extent));
    
    //1.创建bitmap
    size_t width = CGRectGetWidth(extent) *scale;
    size_t height = CGRectGetHeight(extent) *scale;
    CGColorSpaceRef cs = CGColorSpaceCreateDeviceGray();
    CGContextRef bitmapRef = CGBitmapContextCreate(nil, width, height, 8, 0, cs, (CGBitmapInfo)kCGImageAlphaNone);
    CIContext *context = [CIContext contextWithOptions:nil];
    CGImageRef bitmapImage = [context createCGImage:image fromRect:extent];
    CGContextSetInterpolationQuality(bitmapRef, kCGInterpolationNone);
    CGContextScaleCTM(bitmapRef, scale, scale);
    CGContextDrawImage(bitmapRef, extent, bitmapImage);
    
    //2.保存bitmap到图片
    CGImageRef scaledImage = CGBitmapContextCreateImage(bitmapRef);
    CGContextRelease(bitmapRef);
    CGImageRelease(bitmapImage);
    return [UIImage imageWithCGImage:scaledImage];
}
@end
