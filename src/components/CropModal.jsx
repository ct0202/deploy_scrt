import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './cropUtils'; // утилита ниже
import { Button } from '../components/Button';

function CropModal({ image, onCancel, onSave, aspect = 363 / 544 }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((_, areaPixels) => {
        setCroppedAreaPixels(areaPixels);
    }, []);

    const handleSave = async () => {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        onSave(croppedImage);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="relative bg-white w-[90vw] h-[80vh] rounded-lg overflow-hidden">
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                />
                <div className="absolute bottom-4 left-0 right-0 flex justify-around">
                    <Button onClick={onCancel}>Отмена</Button>
                    <Button onClick={handleSave}>Обрезать</Button>
                </div>
            </div>
        </div>
    );
}

export default CropModal;
