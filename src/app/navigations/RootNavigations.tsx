import { NavigationContainer } from "@react-navigation/native";
import { SCREENS } from "./ScreensRouter";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "../../utils";

const Stack = createStackNavigator();

export const RootNavigation = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName={SCREENS.ROOM_BOOKING_CREEN.name}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name={SCREENS.ROOM_BOOKING_CREEN.name}
                    component={SCREENS.ROOM_BOOKING_CREEN.component}
                />
                <Stack.Screen
                    name={SCREENS.SCAN_SCREEN.name}
                    component={SCREENS.SCAN_SCREEN.component}
                />
                <Stack.Screen
                    name={SCREENS.SUCCESS_WEB_VIEW_SCREEN.name}
                    component={SCREENS.SUCCESS_WEB_VIEW_SCREEN.component}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}