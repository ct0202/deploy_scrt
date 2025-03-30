import React, { useState } from "react";
import { Button } from "../components/Button";
import { useRegistration } from "../context/RegistrationContext";

function Step2({ setStep }) {
  const { registrationData, updatePhoto, deletePhoto, reorderPhotos } = useRegistration();
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

  const handlePhotoUpload = (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert('Размер файла не должен превышать 5MB');
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('Поддерживаются только форматы JPG и PNG');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      updatePhoto(index, reader.result);
      checkPhotos();
    };
    reader.readAsDataURL(file);
  };

  const checkPhotos = () => {
    const hasPhotos = registrationData.photos.some(photo => photo !== null);
    setDisabled(!hasPhotos);
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;
    reorderPhotos(draggedIndex, dropIndex);
    setDraggedIndex(null);
  };

  return (
    <div className="flex flex-col items-center w-[343px] h-screen overflow-y-auto overflow-x-hidden">
      <h1 className="font-raleway font-semibold mt-6 text-white text-[20px]">
        Добавьте фото
      </h1>
      <h1 className="font-raleway font-light mt-2 text-white text-[16px]">
        Минимум одно, а лучше – все четыре
      </h1>
      <div className={`w-[343px] h-[343px] mt-5 grid grid-cols-2 gap-[15px]`}>
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            draggable={!!registrationData.photos[index]}
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className={`w-[164px] h-[164px] border-[1px] rounded-[16px] border-[#233636] bg-[#022424] relative flex items-center justify-center cursor-pointer
              ${draggedIndex === index ? 'opacity-50' : ''}`}
          >
            {registrationData.photos[index] ? (
              <>
                <img
                  src={registrationData.photos[index]}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover rounded-[16px]"
                />
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-[40px] flex items-center justify-center bg-gradient-to-t from-[#032B2B] to-transparent rounded-b-[16px]">
                    <span className="text-white font-raleway text-[14px]">Главное фото</span>
                  </div>
                )}
              </>
            ) : (
              <>
                {index === 0 && (
                  <img
                    src="/icons/main_photo_label.svg"
                    className="absolute top-0 left-0"
                  />
                )}
                {index > 0 && (
                  <span className="absolute top-1 right-1 text-white font-raleway text-[15px] font-medium">
                    +25 <img src="/icons/myta-coin.svg" alt="" className="inline w-[16px]"/>
                  </span>
                )}
                <img src="/icons/camera.svg" />
              </>
            )}
            <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
              <input
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={(e) => handlePhotoUpload(index, e)}
              />
            </label>
          </div>
        ))}
      </div>
      <h1 className="font-raleway font-light mt-[15px] text-white text-[16px]">
        Перетащите, чтобы изменить порядок
      </h1>
      <div className="fixed bottom-[20px]">
        <Button onclick={() => setStep(3)} disabled={disabled}>
          Далее
        </Button>
      </div>
    </div>
  );
}

export default Step2;
