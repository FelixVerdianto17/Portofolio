export const SEQUENCE_CONFIG = {
  frameCount: 120,
  extension: "webp",
  folder: "/sequence",
  padLength: 4,
};

export const getSequencePaths = (): string[] => {
  const paths: string[] = [];
  for (let i = 1; i <= SEQUENCE_CONFIG.frameCount; i++) {
    const paddedIndex = i.toString().padStart(SEQUENCE_CONFIG.padLength, '0');
    paths.push(`${SEQUENCE_CONFIG.folder}/${paddedIndex}.${SEQUENCE_CONFIG.extension}`);
  }
  return paths;
};

export const preloadSequenceImages = (
  paths: string[],
  onProgress?: (progress: number) => void
): Promise<HTMLImageElement[]> => {
  let loaded = 0;

  return Promise.all(
    paths.map((path) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
          loaded++;
          if (onProgress) {
            onProgress((loaded / paths.length) * 100);
          }
          resolve(img);
        };
        img.onerror = (err) => reject(err);
      });
    })
  );
};
