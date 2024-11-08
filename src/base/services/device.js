import { IPHONE, ANDROID } from '@src/base/constants/mobile-device-models';
import windowService from '@src/base/services/window';

export const getMobileDeviceModel = () => {
  if(isMobileDeviceModel('iphone')) return IPHONE;
  if(isMobileDeviceModel('android')) return ANDROID;
  return null;
};

function isMobileDeviceModel(model){
  return windowService.getUserAgent().toLowerCase().includes(model);
}
