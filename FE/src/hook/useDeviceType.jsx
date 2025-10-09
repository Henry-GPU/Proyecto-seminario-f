import { isMobile, isTablet, isDesktop } from "react-device-detect";

const useDeviceType = () => {
  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useDeviceType;
