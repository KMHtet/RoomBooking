import { Component } from "react";
import RoomBookingScreen from "../features/home/RoomBookingScreen";
import ScanScreen from "../features/home/ScanScreen";
import SuccessWebViewScreen from "../features/home/SuccessWebViewScreen";

export const SCREENS = {
    ROOM_BOOKING_CREEN: {
        name: 'RoomBooking',
        component: RoomBookingScreen
    },
    SCAN_SCREEN: {
        name: 'Scan',
        component: ScanScreen
    },
    SUCCESS_WEB_VIEW_SCREEN: {
        name: 'SuccessWebView',
        component: SuccessWebViewScreen
    }
}