import { useEffect, useState } from "react";

function formatSecondsToMmSs(totalSeconds: number): string {
  if (!isFinite(totalSeconds) || totalSeconds <= 0) return "0:00";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  const padded = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${padded}`;
}

/**
 * Loads media metadata in a hidden <video> to compute duration.
 * Returns duration in mm:ss and a boolean ready state.
 */
export function useVideoDuration(srcUrl?: string): { duration: string | null; ready: boolean } {
  const [duration, setDuration] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!srcUrl) {
      setDuration(null);
      setReady(true);
      return;
    }
    let cancelled = false;
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = srcUrl;
    // Required for some CDNs; harmless otherwise
    (video as any).crossOrigin = "anonymous";

    const onLoaded = () => {
      if (cancelled) return;
      const seconds = Number(video.duration);
      setDuration(formatSecondsToMmSs(seconds));
      setReady(true);
    };
    const onError = () => {
      if (cancelled) return;
      setReady(true);
    };
    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("error", onError);

    // Attach to DOM to ensure some browsers load metadata
    video.style.position = "absolute";
    video.style.width = "0px";
    video.style.height = "0px";
    video.style.opacity = "0";
    document.body.appendChild(video);

    return () => {
      cancelled = true;
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("error", onError);
      try { document.body.removeChild(video); } catch {}
    };
  }, [srcUrl]);

  return { duration, ready };
}

/** Builds a direct media URL from a Google Drive preview/embed URL. */
export function deriveDirectMediaUrl(embedUrl?: string): string | undefined {
  if (!embedUrl) return undefined;
  // Expect formats like: https://drive.google.com/file/d/<ID>/preview
  const match = embedUrl.match(/\/file\/d\/([^/]+)\//);
  const id = match?.[1];
  if (!id) return undefined;
  return `https://drive.google.com/uc?export=download&id=${id}`;
}


