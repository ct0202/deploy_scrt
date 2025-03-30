import React, { createContext, useContext, useState } from 'react';

const RegistrationContext = createContext();

export function RegistrationProvider({ children }) {
  const [registrationData, setRegistrationData] = useState({
    name: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    gender: '',
    height: '',
    location: '',
    city: '',
    wantToFind: '',
    goal: '',
    telegramId: '',
    photos: Array(4).fill(null),
  });

  const updateRegistrationData = (field, value) => {
    setRegistrationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updatePhoto = (index, photo) => {
    setRegistrationData(prev => ({
      ...prev,
      photos: prev.photos.map((p, i) => i === index ? photo : p)
    }));
  };

  const deletePhoto = (index) => {
    setRegistrationData(prev => ({
      ...prev,
      photos: prev.photos.map((p, i) => i === index ? null : p)
    }));
  };

  const reorderPhotos = (startIndex, endIndex) => {
    setRegistrationData(prev => {
      const newPhotos = [...prev.photos];
      const [removed] = newPhotos.splice(startIndex, 1);
      newPhotos.splice(endIndex, 0, removed);
      return {
        ...prev,
        photos: newPhotos
      };
    });
  };

  return (
    <RegistrationContext.Provider value={{ 
      registrationData, 
      updateRegistrationData, 
      updatePhoto,
      deletePhoto,
      reorderPhotos 
    }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration должен использоваться внутри RegistrationProvider');
  }
  return context;
} 