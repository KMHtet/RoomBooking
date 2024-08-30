import React from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
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
import { SCREENS } from "../../navigations";
import { requestCameraPermission } from "../../../utils";

const ScanScreen: React.FC = ({ navigation }) => {

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

    const permissionsCheck = async () => {
        const permissionAccept = await requestCameraPermission();
        if (permissionAccept) {
            return permissionAccept;
        }
        return Alert.alert("permission denied");
    };

    const handleQrCode = useCallback(
        async (codes: Code[]) => {
            if (codes[0].value) {
                navigation.replace(SCREENS.SUCCESS_WEB_VIEW_SCREEN.name);
            }
        },
        [],
    );

    const codeScanner = useCodeScanner({
        codeTypes: ['qr'],
        onCodeScanned: handleQrCode,
    });

    return (
        <SafeAreaView style={styles.safeArea}>
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