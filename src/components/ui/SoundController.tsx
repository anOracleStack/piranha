"use client";

import { useSound } from "@/hooks/useSound";

export default function SoundController() {
  const sound = useSound();

  return (
    <button
      className="icon-button"
      type="button"
      onClick={sound.toggle}
      aria-label={sound.enabled ? "Mute Sound" : "Enable Sound"}
      title={sound.enabled ? "Mute Sound" : "Enable Sound"}
    >
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {sound.enabled ? (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a7 7 0 0 1 0 9.9M18.3 5.7a11 11 0 0 1 0 15.58" />
          </>
        ) : (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        )}
      </svg>
    </button>
  );
}
