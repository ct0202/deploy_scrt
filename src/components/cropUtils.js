export const getCroppedImg = (imageSrc, crop) => {
    return new Promise((resolve) => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 363;
            canvas.height = 544;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(
                image,
                crop.x, crop.y, crop.width, crop.height,
                0, 0, 363, 544
            );

            canvas.toBlob((blob) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.readAsDataURL(blob);
            }, 'image/jpeg');
        };
    });
};
