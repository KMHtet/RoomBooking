import React from "react";
import { Text, StyleSheet, SafeAreaView } from "react-native";
import {
    Camera,
    Code,
    useCameraDevice,
    useCameraFormat,
    useCodeScanner,
} from 'react-native-vision-camera';
import { Colors } from "../../commons";
import { useCallback } from "react";
import { useEffect } from "react";
import { Alert } from "react-native";
import { Linking } from "react-native";

const ScanScreen: React.FC = () => {

    const device = useCameraDevice('back');
    const format = useCameraFormat(device, [
        {
            fps: 30,
        },
    ]);

    useEffect(() => {
        try {
            permissionsCheck();
        } catch (error) {
            console.log({ error });
        }
    }, []);

    const requestCameraPermission = async (): Promise<boolean> => {
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

    const permissionsCheck = async () => {
        const permissionAccept = await requestCameraPermission();
        if (permissionAccept) {
            return permissionAccept;
        }
        return Alert.alert("permission denied");
    }

    const handleQrCode = useCallback(
        async (codes: Code[]) => {
            console.warn("on scanned qr code", codes);
        },
        [],
    );

    const codeScanner = useCodeScanner({
        codeTypes: ['qr'],
        onCodeScanned: handleQrCode,
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <Text>Hello</Text>
            <Camera
                style={StyleSheet.absoluteFill}
                format={format}
                device={device}
                video={false}
                isActive={true}
                fps={30}
                torch={'off'}
                codeScanner={codeScanner}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.white,
    },
});

export default ScanScreen;