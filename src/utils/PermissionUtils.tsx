import { Linking } from "react-native";
import { Camera } from "react-native-vision-camera";

export const requestCameraPermission = async (): Promise<boolean> => {
    try {
        const hasPermission = await Camera.getCameraPermissionStatus();

        if (hasPermission === 'granted') {
            return true;
        }
        const res = await Camera.requestCameraPermission();
        if (res === 'granted') {
            return true;
        }
    } catch (error) {
        console.log(error);
        Linking.openSettings();
    }
    return false;
};