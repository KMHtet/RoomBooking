import { fetchRoomAvailability } from './HomeAPI'; 

global.fetch = jest.fn();

describe('fetchRoomAvailability', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return data when fetch is successful', async () => {
        const mockData = { rooms: ['Room1', 'Room2'] };
        global.fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockData),
        });

        const result = await fetchRoomAvailability();
        expect(result).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith(
            'https://gist.githubusercontent.com/yuhong90/7ff8d4ebad6f759fcc10cc6abdda85cf/raw/463627e7d2c7ac31070ef409d29ed3439f7406f6/room-availability.json',
            { method: 'GET', headers: {} }
        );
    });

    it('should return an empty array when fetch fails', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

        const result = await fetchRoomAvailability();
        expect(result).toEqual([]);
    });

    it('should handle empty JSON response', async () => {
        global.fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({}),
        });

        const result = await fetchRoomAvailability();
        expect(result).toEqual({});
    });
});
