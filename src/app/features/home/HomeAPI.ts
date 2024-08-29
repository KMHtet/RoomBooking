export const fetchRoomAvailability = async () => {
    const headers = {  };
    const config = {
        method: 'GET',
        headers: {
            ...headers,
        }
    };
    try {
        let response = await fetch(
            `https://gist.githubusercontent.com/yuhong90/7ff8d4ebad6f759fcc10cc6abdda85cf/raw/463627e7d2c7ac31070ef409d29ed3439f7406f6/room-availability.json`,
            config,
        );
        const data = await response.json();
        return data;
    } catch (error) {
        return [];
    }
};