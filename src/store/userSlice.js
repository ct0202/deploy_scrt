import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  registrationData: {
    // Step 1 data
    name: '',
    gender: '',
    wantToFind: '',
    birthDay: '',
    country: '',
    city: '',
    coordinates: {
      latitude: null,
      longitude: null
    },
    
    // Step 2 data
    photos: [null, null, null, null],
    
    // Step 3 data
    audioMessage: null,
    
    // Step 4 data
    purpose: null,
    
    // Step 5 data
    interests: []
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    // Step 1 actions
    updateRegistrationData: (state, action) => {
      const { field, value } = action.payload;
      state.registrationData[field] = value;
    },
    // Step 2 actions
    updatePhoto: (state, action) => {
      const { index, photo } = action.payload;
      state.registrationData.photos[index] = photo;
    },
    deletePhoto: (state, action) => {
      const index = action.payload;
      state.registrationData.photos[index] = null;
    },
    reorderPhotos: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const photos = [...state.registrationData.photos];
      const [movedPhoto] = photos.splice(fromIndex, 1);
      photos.splice(toIndex, 0, movedPhoto);
      state.registrationData.photos = photos;
    },
    // Step 3 actions
    setAudioMessage: (state, action) => {
      state.registrationData.audioMessage = action.payload;
    },
    // Step 4 actions
    setPurpose: (state, action) => {
      state.registrationData.purpose = action.payload;
    },
    // Step 5 actions
    setInterests: (state, action) => {
      state.registrationData.interests = action.payload;
    },
    addInterest: (state, action) => {
      const interest = action.payload;
      if (!state.registrationData.interests.includes(interest)) {
        state.registrationData.interests.push(interest);
      }
    },
    removeInterest: (state, action) => {
      const interest = action.payload;
      state.registrationData.interests = state.registrationData.interests.filter(i => i !== interest);
    }
  },
});

export const { 
  setUserId, 
  updateRegistrationData, 
  updatePhoto, 
  deletePhoto, 
  reorderPhotos,
  setAudioMessage,
  setPurpose,
  setInterests,
  addInterest,
  removeInterest
} = userSlice.actions;

export default userSlice.reducer; 