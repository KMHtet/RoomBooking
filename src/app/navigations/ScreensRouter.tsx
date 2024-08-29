import { Component } from "react";
import RoomBookingScreen from "../features/home/RoomBookingScreen";
import ScanScreen from "../features/home/ScanScreen";

export const SCREENS = {
    ROOM_BOOKING_CREEN: {
        name: 'RoomBooking',
        component: RoomBookingScreen
    },
    SCAN_SCREEN: {
        name: 'Scan',
        component: ScanScreen
    }
}