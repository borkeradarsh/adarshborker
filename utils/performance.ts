// Utility for optimizing long tasks with requestIdleCallback
export const scheduleWork = (callback: () => void, fallbackDelay = 5) => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    // Use requestIdleCallback if available
    (window as any).requestIdleCallback(callback, { timeout: 1000 });
  } else {
    // Fallback to setTimeout for browsers without requestIdleCallback
    setTimeout(callback, fallbackDelay);
  }
};

// Break up heavy work into smaller chunks
export const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

// Process array in chunks using requestIdleCallback
export const processArrayInChunks = <T>(
  array: T[],
  processor: (item: T, index: number) => void,
  chunkSize = 10,
  onComplete?: () => void
) => {
  const chunks = chunkArray(array, chunkSize);
  let currentChunkIndex = 0;

  const processNextChunk = () => {
    if (currentChunkIndex >= chunks.length) {
      onComplete?.();
      return;
    }

    const chunk = chunks[currentChunkIndex];
    const startIndex = currentChunkIndex * chunkSize;
    
    chunk.forEach((item, index) => {
      processor(item, startIndex + index);
    });

    currentChunkIndex++;
    scheduleWork(processNextChunk);
  };

  scheduleWork(processNextChunk);
};

// Debounce utility to prevent excessive function calls
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

// Throttle utility for scroll/resize events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};