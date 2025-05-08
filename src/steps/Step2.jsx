import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { useDispatch, useSelector } from 'react-redux';
import { updatePhoto, deletePhoto, reorderPhotos } from '../store/userSlice';
import CropModal from "../components/CropModal";

function Step2({ setStep }) {
  const dispatch = useDispatch();
  const registrationData = useSelector((state) => state.user.registrationData);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [ghostPhoto, setGhostPhoto] = useState(null);
  const [ghostStyle, setGhostStyle] = useState({});

  const [croppingPhotoIndex, setCroppingPhotoIndex] = useState(null);
  const [rawPhotoData, setRawPhotoData] = useState(null);


  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

  // const handlePhotoUpload = (index, event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;
  //
  //   if (file.size > MAX_FILE_SIZE) {
  //     alert('Размер файла не должен превышать 5MB');
  //     return;
  //   }
  //
  //   if (!ALLOWED_TYPES.includes(file.type)) {
  //     alert('Поддерживаются только форматы JPG и PNG');
  //     return;
  //   }
  //
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     dispatch(updatePhoto({ index, photo: reader.result }));
  //     if (index === 0) {
  //       setDisabled(false);
  //     }
  //   };
  //   reader.readAsDataURL(file);
  //   event.target.value = '';
  // };

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
      setCroppingPhotoIndex(index);
      setRawPhotoData(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const checkPhotos = () => {
    const hasMainPhoto = registrationData.photos[0] !== null;
    setDisabled(!hasMainPhoto);
  };

  useEffect(() => {
    checkPhotos();
  }, [registrationData.photos]);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
    document.body.classList.add('dragging');
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    document.body.classList.remove('dragging');
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      e.currentTarget.classList.add('drag-over');
    }
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDeletePhoto = (index) => {
    dispatch(updatePhoto({ index, photo: null }));
    if (index === 0) {
      setDisabled(true);
    }
  };

  // 💡 Touch Drag Support Below

  const handleTouchStart = (e, index) => {
    const photo = registrationData.photos[index];
    if (!photo) return;

    setDraggedIndex(index);
    setGhostPhoto(photo);
    setTouchStartY(e.touches[0].clientY);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (draggedIndex === null) return;

    const touch = e.touches[0];
    setGhostStyle({
      top: touch.clientY - 80 + 'px',
      left: touch.clientX - 80 + 'px',
      position: 'fixed',
      width: '160px',
      height: '160px',
      zIndex: 1000,
      pointerEvents: 'none',
      opacity: 0.8,
    });

    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (draggedIndex === null) return;

    const touch = e.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
    const dropIndex = Number(dropTarget?.closest('[data-index]')?.getAttribute('data-index'));

    if (!isNaN(dropIndex) && dropIndex !== draggedIndex) {
      dispatch(reorderPhotos({ fromIndex: draggedIndex, toIndex: dropIndex }));
    }

    setDraggedIndex(null);
    setGhostPhoto(null);
  };

  return (
      <div className="flex flex-col items-center w-[343px] h-screen overflow-y-auto overflow-x-hidden">
        <h1 className="font-raleway font-semibold mt-6 text-white text-[20px]">Добавьте фото</h1>
        <h1 className="font-raleway font-light mt-2 text-white text-[16px]">Минимум одно, а лучше – все четыре</h1>

        <div className="w-[343px] h-[343px] mt-5 grid grid-cols-2 gap-[15px]">
          {[0, 1, 2, 3].map((index) => (
              <div
                  key={index}
                  data-index={index}
                  draggable={!!registrationData.photos[index]}
                  onDragStart={() => handleDragStart(index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onTouchStart={(e) => handleTouchStart(e, index)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className={`w-[164px] h-[164px] border-[1px] rounded-[16px] border-[#233636] bg-[#022424] relative flex items-center justify-center cursor-pointer
              ${draggedIndex === index ? 'opacity-50' : ''}
              transition-all duration-200 ease-in-out
              hover:border-[#A1F69E]
              drag-over:border-[#A1F69E]
              drag-over:scale-105`}
              >
                {registrationData.photos[index] ? (
                    <>
                      <img
                          src={registrationData.photos[index]}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover rounded-[16px] select-none"
                      />
                      <div className="absolute top-[8px] right-[8px] pointer-events-auto z-10" onClick={() => handleDeletePhoto(index)}>
                        <img src="/icons/delete_img.svg" className="w-[16px] h-[16px]" alt="Удалить" />
                      </div>
                      {index === 0 && (
                          <div className="absolute bottom-0 left-0 right-0 h-[40px] flex items-center justify-center bg-gradient-to-t from-[#032B2B] to-transparent rounded-b-[16px]">
                            <span className="text-white font-raleway text-[14px]">Главное фото</span>
                          </div>
                      )}
                    </>
                ) : (
                    <>
                      {index === 0 && (
                          <img src="/icons/main_photo_label.svg" alt="" className="absolute top-0 left-0" />
                      )}
                      {index > 0 && (
                          <span className="absolute top-1 right-1 text-white font-raleway text-[15px] font-medium">
                    +25 <img src="/icons/myta-coin.svg" alt="Монета MYTA" className="inline w-[16px]" />
                  </span>
                      )}
                      <img src="/icons/camera.svg" alt="Камера" />
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
          {croppingPhotoIndex !== null && rawPhotoData && (
              <CropModal
                  image={rawPhotoData}
                  onCancel={() => {
                    setCroppingPhotoIndex(null);
                    setRawPhotoData(null);
                  }}
                  onSave={(croppedImage) => {
                    dispatch(updatePhoto({ index: croppingPhotoIndex, photo: croppedImage }));
                    if (croppingPhotoIndex === 0) setDisabled(false);
                    setCroppingPhotoIndex(null);
                    setRawPhotoData(null);
                  }}
              />
          )}

        </div>

        <h1 className="font-raleway font-light mt-[15px] text-white text-[16px]">Перетащите, чтобы изменить порядок</h1>

        <div className="fixed bottom-[20px]">
          <Button onclick={() => setStep(3)} disabled={disabled}>
            Далее
          </Button>
        </div>

        {/* 👻 Призрак фото для тача */}
        {ghostPhoto && (
            <img
                src={ghostPhoto}
                style={ghostStyle}
                className="rounded-[16px] shadow-lg transition-none"
                alt="Призрак фото"
            />
        )}
      </div>
  );
}

export default Step2;
