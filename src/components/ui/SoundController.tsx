"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export default function SoundController() {
  const sound = useSound();
  const Icon = sound.enabled ? Volume2 : VolumeX;

  return (
    <button
      className="icon-button"
      type="button"
      onClick={sound.toggle}
      aria-label={sound.enabled ? "Mute sound" : "Enable sound"}
      title={sound.enabled ? "Mute sound" : "Enable sound"}
    >
      <Icon className="size-4" aria-hidden />
    </button>
  );
}
