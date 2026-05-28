import { useState, useEffect, useRef } from 'react';

export function useFramePreloader(frameCount: number, basePath: string) {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        // Reset just in case
        setProgress(0);
        setIsLoaded(false);

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(4, '0');
            img.src = `${basePath}/frame_${paddedIndex}.jpg`;

            const onImageLoad = () => {
                loadedCount++;
                setProgress(Math.floor((loadedCount / frameCount) * 100));

                if (loadedCount === frameCount) {
                    imagesRef.current = images;
                    setIsLoaded(true);
                }
            };

            img.onload = onImageLoad;
            img.onerror = onImageLoad; // Count errors so it doesn't hang

            images.push(img);
        }
    }, [frameCount, basePath]);

    return { progress, isLoaded, images: imagesRef.current };
}
