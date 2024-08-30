const VisionCamera = {
    requestCameraPermission: jest.fn(() => Promise.resolve('granted')),
  };
  
  export default VisionCamera;