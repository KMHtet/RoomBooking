import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image, Dimensions, ListRenderItem } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../../commons';
import { HeaderView } from '../../components';
import { ImagesAsset } from '../../../assets';
import { fetchRoomAvailability } from './HomeAPI';
import { Modalize } from 'react-native-modalize';
import { SCREENS } from '../../navigations';
import { requestCameraPermission } from '../../../utils';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const snapPoint = DEVICE_HEIGHT / 1.5;

const roomFake = [
    {
        "name": "Kopi-O",
        "capacity": "8",
        "level": "10",
        "availability": {
            "08:00": "1",
            "08:30": "1",
            "09:00": "0",
            "09:30": "0",
            "10:00": "0",
            "10:30": "0",
            "11:00": "0",
            "11:30": "0",
            "12:00": "0",
            "12:30": "0",
            "13:00": "0",
            "13:30": "0",
            "14:00": "1",
            "14:30": "1",
            "15:00": "0",
            "15:30": "0",
            "16:00": "0",
            "16:30": "0",
            "17:00": "0",
            "17:30": "0",
            "18:00": "0",
            "18:30": "0",
            "19:00": "0",
            "19:30": "0"
        }
    },
    {
        "name": "Teh-O",
        "capacity": "8",
        "level": "7",
        "availability": {
            "08:00": "1",
            "08:30": "1",
            "09:00": "0",
            "09:30": "0",
            "10:00": "0",
            "10:30": "0",
            "11:00": "0",
            "11:30": "0",
            "12:00": "0",
            "12:30": "0",
            "13:00": "0",
            "13:30": "0",
            "14:00": "1",
            "14:30": "1",
            "15:00": "0",
            "15:30": "0",
            "16:00": "0",
            "16:30": "0",
            "17:00": "0",
            "17:30": "0",
            "18:00": "0",
            "18:30": "0",
            "19:00": "0",
            "19:30": "0"
        }
    },
    {
        "name": "Milo",
        "capacity": "4",
        "level": "7",
        "availability": {
            "08:00": "0",
            "08:30": "0",
            "09:00": "0",
            "09:30": "0",
            "10:00": "0",
            "10:30": "0",
            "11:00": "0",
            "11:30": "0",
            "12:00": "0",
            "12:30": "0",
            "13:00": "0",
            "13:30": "0",
            "14:00": "0",
            "14:30": "0",
            "15:00": "0",
            "15:30": "0",
            "16:00": "0",
            "16:30": "0",
            "17:00": "0",
            "17:30": "0",
            "18:00": "0",
            "18:30": "0",
            "19:00": "0",
            "19:30": "0"
        }
    },
    {
        "name": "Holick",
        "capacity": "4",
        "level": "7",
        "availability": {
            "08:00": "1",
            "08:30": "1",
            "09:00": "0",
            "09:30": "0",
            "10:00": "0",
            "10:30": "0",
            "11:00": "0",
            "11:30": "0",
            "12:00": "0",
            "12:30": "0",
            "13:00": "0",
            "13:30": "0",
            "14:00": "1",
            "14:30": "1",
            "15:00": "0",
            "15:30": "0",
            "16:00": "0",
            "16:30": "0",
            "17:00": "0",
            "17:30": "0",
            "18:00": "0",
            "18:30": "0",
            "19:00": "0",
            "19:30": "0"
        }
    },
     {
        "name": "Teh-Halia",
        "capacity": "4",
        "level": "7",
        "availability": {
            "08:00": "0",
            "08:30": "0",
            "09:00": "0",
            "09:30": "0",
            "10:00": "0",
            "10:30": "0",
            "11:00": "0",
            "11:30": "0",
            "12:00": "0",
            "12:30": "0",
            "13:00": "0",
            "13:30": "0",
            "14:00": "1",
            "14:30": "1",
            "15:00": "0",
            "15:30": "0",
            "16:00": "0",
            "16:30": "0",
            "17:00": "0",
            "17:30": "0",
            "18:00": "0",
            "18:30": "0",
            "19:00": "0",
            "19:30": "0"
        }
    },
    {
        "name": "Laksa",
        "capacity": "14",
        "level": "8",
        "availability": {
            "08:00": "0",
            "08:30": "0",
            "09:00": "0",
            "09:30": "0",
            "10:00": "0",
            "10:30": "0",
            "11:00": "0",
            "11:30": "0",
            "12:00": "0",
            "12:30": "0",
            "13:00": "0",
            "13:30": "0",
            "14:00": "1",
            "14:30": "1",
            "15:00": "0",
            "15:30": "0",
            "16:00": "0",
            "16:30": "0",
            "17:00": "0",
            "17:30": "0",
            "18:00": "0",
            "18:30": "0",
            "19:00": "1",
            "19:30": "1"
        }
    },
    {
        "name": "Prata",
        "capacity": "14",
        "level": "8",
        "availability": {
            "08:00": "0",
            "08:30": "0",
            "09:00": "0",
            "09:30": "0",
            "10:00": "0",
            "10:30": "0",
            "11:00": "0",
            "11:30": "0",
            "12:00": "0",
            "12:30": "0",
            "13:00": "0",
            "13:30": "0",
            "14:00": "1",
            "14:30": "1",
            "15:00": "0",
            "15:30": "0",
            "16:00": "0",
            "16:30": "0",
            "17:00": "0",
            "17:30": "0",
            "18:00": "0",
            "18:30": "0",
            "19:00": "1",
            "19:30": "1"
        }
    },
    {
        "name": "Rojak",
        "capacity": "14",
        "level": "8",
        "availability": {
            "08:00": "0",
            "08:30": "0",
            "09:00": "0",
            "09:30": "0",
            "10:00": "0",
            "10:30": "0",
            "11:00": "0",
            "11:30": "0",
            "12:00": "0",
            "12:30": "0",
            "13:00": "0",
            "13:30": "0",
            "14:00": "1",
            "14:30": "1",
            "15:00": "0",
            "15:30": "0",
            "16:00": "0",
            "16:30": "0",
            "17:00": "0",
            "17:30": "0",
            "18:00": "0",
            "18:30": "0",
            "19:00": "1",
            "19:30": "1"
        }
    },
    {
        "name": "Roti",
        "capacity": "10",
        "level": "8",
        "availability": {
            "08:00": "0",
            "08:30": "0",
            "09:00": "0",
            "09:30": "0",
            "10:00": "0",
            "10:30": "0",
            "11:00": "0",
            "11:30": "0",
            "12:00": "0",
            "12:30": "0",
            "13:00": "0",
            "13:30": "0",
            "14:00": "1",
            "14:30": "1",
            "15:00": "0",
            "15:30": "0",
            "16:00": "0",
            "16:30": "0",
            "17:00": "0",
            "17:30": "0",
            "18:00": "0",
            "18:30": "0",
            "19:00": "1",
            "19:30": "1"
        }
    },
    {
        "name": "Mee-Siam",
        "capacity": "10",
        "level": "8",
        "availability": {
            "08:00": "0",
            "08:30": "0",
            "09:00": "0",
            "09:30": "0",
            "10:00": "0",
            "10:30": "0",
            "11:00": "0",
            "11:30": "0",
            "12:00": "0",
            "12:30": "0",
            "13:00": "0",
            "13:30": "0",
            "14:00": "1",
            "14:30": "1",
            "15:00": "0",
            "15:30": "0",
            "16:00": "0",
            "16:30": "0",
            "17:00": "0",
            "17:30": "0",
            "18:00": "0",
            "18:30": "0",
            "19:00": "1",
            "19:30": "1"
        }
    },
    {
        "name": "Sky",
        "capacity": "2",
        "level": "9",
        "availability": {
            "08:00": "1",
            "08:30": "1",
            "09:00": "1",
            "09:30": "1",
            "10:00": "1",
            "10:30": "1",
            "11:00": "1",
            "11:30": "1",
            "12:00": "1",
            "12:30": "1",
            "13:00": "1",
            "13:30": "1",
            "14:00": "1",
            "14:30": "1",
            "15:00": "1",
            "15:30": "1",
            "16:00": "1",
            "16:30": "1",
            "17:00": "1",
            "17:30": "1",
            "18:00": "1",
            "18:30": "1",
            "19:00": "1",
            "19:30": "1"
        }
    },
    {
        "name": "Cloud",
        "capacity": "2",
        "level": "9",
        "availability": {
            "08:00": "1",
            "08:30": "1",
            "09:00": "1",
            "09:30": "1",
            "10:00": "1",
            "10:30": "1",
            "11:00": "1",
            "11:30": "1",
            "12:00": "1",
            "12:30": "1",
            "13:00": "1",
            "13:30": "1",
            "14:00": "1",
            "14:30": "1",
            "15:00": "1",
            "15:30": "1",
            "16:00": "1",
            "16:30": "1",
            "17:00": "1",
            "17:30": "1",
            "18:00": "1",
            "18:30": "1",
            "19:00": "1",
            "19:30": "1"
        }
    },
    {
        "name": "Sea",
        "capacity": "2",
        "level": "9",
        "availability": {
            "08:00": "0",
            "08:30": "0",
            "09:00": "0",
            "09:30": "0",
            "10:00": "0",
            "10:30": "0",
            "11:00": "0",
            "11:30": "0",
            "12:00": "0",
            "12:30": "0",
            "13:00": "0",
            "13:30": "0",
            "14:00": "0",
            "14:30": "0",
            "15:00": "0",
            "15:30": "0",
            "16:00": "0",
            "16:30": "0",
            "17:00": "0",
            "17:30": "0",
            "18:00": "0",
            "18:30": "0",
            "19:00": "0",
            "19:30": "0"
        }
    },
    {
        "name": "Hill",
        "capacity": "2",
        "level": "9",
        "availability": {
            "08:00": "1",
            "08:30": "1",
            "09:00": "1",
            "09:30": "1",
            "10:00": "1",
            "10:30": "1",
            "11:00": "1",
            "11:30": "1",
            "12:00": "1",
            "12:30": "1",
            "13:00": "1",
            "13:30": "1",
            "14:00": "1",
            "14:30": "1",
            "15:00": "1",
            "15:30": "1",
            "16:00": "1",
            "16:30": "1",
            "17:00": "1",
            "17:30": "1",
            "18:00": "1",
            "18:30": "1",
            "19:00": "1",
            "19:30": "1"
        }
    },
    {
        "name": "Grassland",
        "capacity": "2",
        "level": "9",
        "availability": {
            "08:00": "1",
            "08:30": "1",
            "09:00": "1",
            "09:30": "1",
            "10:00": "1",
            "10:30": "1",
            "11:00": "1",
            "11:30": "1",
            "12:00": "1",
            "12:30": "1",
            "13:00": "1",
            "13:30": "1",
            "14:00": "1",
            "14:30": "1",
            "15:00": "1",
            "15:30": "1",
            "16:00": "1",
            "16:30": "1",
            "17:00": "1",
            "17:30": "1",
            "18:00": "1",
            "18:30": "1",
            "19:00": "1",
            "19:30": "1"
        }
    }
]

const SORTING_OPTION_DATA = [
    {
        id: 1,
        title: 'Location',
    },
    {
        id: 2,
        title: 'Capacity',
    },
    {
        id: 3,
        title: 'Availability',
    }
];

const RoomBookingScreen = ({ navigation }) => {

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [selectedSorting, setSelectedSorting] = useState(SORTING_OPTION_DATA[0]);

    const modalizeRef = useRef(null);

    useEffect(() => {
        fetchRooms();
    }, [date]);

    const fetchRooms = async () => {
        const data = await fetchRoomAvailability();
        // const data = roomFake;
        data.sort((a, b) => a.level - b.level);
        setRooms(data);
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || date;
        setShowTimePicker(false);
        setDate(currentTime);
    };

    const renderRoomItem: ListRenderItem<any> = ({ item }) => {
        return (
            <View style={[styles.roomContainer, item.available ? styles.unavailableRoom : styles.unavailableRoom]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                    <Text style={styles.roomName}>{item.name}</Text>
                    <Text style={[styles.roomStatus, isAvailable(item.availability) ? styles.availableText : styles.unavailableText]}>
                        {isAvailable(item.availability) ? 'Available' : 'Not Available'}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.roomInfo}>Level {item.level}</Text>
                    <Text style={styles.roomPax}>{item.capacity}</Text>
                </View>
            </View>
        )
    }

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const onChooseShoringItem = (item: any) => {
        setSelectedSorting(item);
    }

    const renderSortingItem: ListRenderItem<any> = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => onChooseShoringItem(item)} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}>
                <Text style={{ fontSize: 16, color: Colors.black }}>{item.title}</Text>
                <Image source={item?.id == selectedSorting?.id ? ImagesAsset.selected : ImagesAsset.unSelect} style={{ width: 20, height: 20 }} resizeMode='contain' />
            </TouchableOpacity>
        );
    }

    const onReset = () => {
        setSelectedSorting(SORTING_OPTION_DATA[0]);
        const sortedRooms = [...rooms].sort((a, b) => {
            return b.level - a.level
        });
        setRooms(sortedRooms);
        modalizeRef.current?.close();
    }

    const onApply = () => {
        const sortedRooms = [...rooms].sort((a, b) => {
            switch (selectedSorting.title) {
                case 'Capacity':
                    return b.capacity - a.capacity;
                case 'Availability':
                    return countAvailability(b.availability) - countAvailability(a.availability);
                default: // location or level
                    return b.level - a.level;
            }
        });
        setRooms(sortedRooms);
        modalizeRef.current?.close();
    }

    const isAvailable = (availability: { [s: string]: unknown; } | ArrayLike<unknown>) => {
        return Object.values(availability).some(slot => slot === "1");
    };

    const  countAvailability = (availability: ArrayLike<unknown> | { [s: string]: unknown; }) => {
        return Object.values(availability).filter(slot => slot === "1").length;
    }

    function formatDate(date) {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
    
        // Function to add suffix to day
        const getDayWithSuffix = (day) => {
            if (day > 3 && day < 21) return day + 'th'; // for 11th, 12th, 13th, etc.
            switch (day % 10) {
                case 1: return day + 'st';
                case 2: return day + 'nd';
                case 3: return day + 'rd';
                default: return day + 'th';
            }
        };
    
        const dayWithSuffix = getDayWithSuffix(day);
        
        return `${dayWithSuffix} ${month} ${year}`;
    }

    const onPressCamera = async () => {
        const permissionAccept = await requestCameraPermission();
        if (permissionAccept) {
            navigation.navigate(SCREENS.SCAN_SCREEN.name);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>

            <HeaderView
                title={'Book a Room'}
                isIconLeft={false}
                isIconRight={true}
                onPressIconRight={() => onPressCamera()}
            />

            <View style={styles.container}>

                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.value}>{formatDate(date)}</Text>
                    <View style={styles.underline} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                    <Text style={styles.label}>Timeslot</Text>
                    <Text style={styles.value}>{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true})}</Text>
                    <View style={styles.underline} />
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                    />
                )}

                {showTimePicker && (
                    <DateTimePicker
                        value={date}
                        mode="time"
                        display="default"
                        onChange={onChangeTime}
                    />
                )}

                <View style={{ paddingTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.roomsLabel, { color: Colors.textLight }]}>Rooms</Text>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={onOpen}>
                        <Text style={[styles.roomsLabel, { fontWeight: '500', color: Colors.black, paddingRight: 7 }]}>Sort</Text>
                        <Image source={ImagesAsset.sort} style={{ width: 25, height: 25 }} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={rooms}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderRoomItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
            />

            <Modalize ref={modalizeRef} snapPoint={snapPoint} handlePosition='inside'>
                <View style={{ height: snapPoint }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: Colors.black, fontWeight: '500', textAlign: 'center', paddingTop: 40 }}>Sort</Text>
                        <FlatList
                            data={SORTING_OPTION_DATA}
                            renderItem={renderSortingItem}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ padding: 20 }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 20 }}>
                        <TouchableOpacity onPress={() => onReset()} style={[styles.btn, {backgroundColor: Colors.cancelBtn, width: '30%'}]}>
                            <Text style={styles.btnText}>Reset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onApply()} style={[styles.btn, {backgroundColor: Colors.confirmBtn, width: '60%'}]}>
                            <Text style={styles.btnText}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modalize>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    btnText: {
        color: Colors.white,
        fontSize: 17,
        fontWeight: 'bold'
    },
    btn: {
        padding: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    safeArea: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    container: {
        paddingHorizontal: 20
    },
    label: {
        color: Colors.textLight,
        fontSize: 16,
        marginTop: 20,
    },
    value: {
        fontSize: 18,
        color: Colors.black,
        marginVertical: 5,
    },
    roomsLabel: {
        fontSize: 16,
    },
    roomContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 5,
    },
    roomName: {
        color: Colors.black,
        fontWeight: 'bold',
        fontSize: 16,
    },
    roomInfo: {
        fontSize: 15,
        color: '#7B7B7B',
    },
    roomPax: {
        fontSize: 15,
        color: '#7B7B7B',
    },
    roomStatus: {
        fontSize: 15,
        fontWeight: '400',
        fontStyle: 'italic'
    },
    availableRoom: {
        backgroundColor: '#E5F9E0',
    },
    unavailableRoom: {
        backgroundColor: '#F5F5F5',
    },
    availableText: {
        color: '#5CB85C',
    },
    unavailableText: {
        color: '#A0A0A0',
    },
    underline: {
        height: 1,
        backgroundColor: Colors.underline
    }
});

export default RoomBookingScreen;
