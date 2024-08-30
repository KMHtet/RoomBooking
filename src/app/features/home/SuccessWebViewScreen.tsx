import React from "react";
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity } from "react-native";
import { Colors } from "../../commons";
import { HeaderView } from "../../components";
import { WebView } from 'react-native-webview';
import { SCREENS } from "../../navigations";

const SuccessWebViewScreen: React.FC = ({ navigation }) => {

    const backToHome = () => {
        navigation?.reset({
            index: 0,
            routes: [{ name: SCREENS.ROOM_BOOKING_CREEN.name }],
        });
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <HeaderView
                title={'Book a Room'}
                isIconLeft={true}
                isIconRight={false}
                onPressIconLeft={() => backToHome()}
            />
            <View style={{ flex: 1, backgroundColor: 'gray' }}>
                <WebView source={{ uri: 'https://qrgo.page.link/N3vzh' }} />
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => backToHome()}>
                <Text style={styles.btnText}>Back to Home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    btn: {
        backgroundColor: Colors.confirmBtn,
        padding: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    btnText: {
        color: Colors.white,
        fontSize: 17,
        fontWeight: 'bold'
    }
});

export default SuccessWebViewScreen;