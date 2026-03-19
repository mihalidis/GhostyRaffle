"use client";

import { Participant } from "@/lib/shuffler";
import { X } from "lucide-react";

interface ParticipantRowProps {
  index: number;
  participant: Participant;
  onChange: (index: number, field: keyof Participant, value: string) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
  error?: { name?: string; email?: string };
}

export default function ParticipantRow({
  index,
  participant,
  onChange,
  onRemove,
  canRemove,
  error,
}: ParticipantRowProps) {
  return (
    <div className="group flex items-start gap-2 sm:gap-3 animate-[fadeIn_0.2s_ease-out]">
      {/* Row number */}
      <div className="w-7 h-10 flex items-center justify-center flex-shrink-0">
        <span className="text-[8px] font-['Press_Start_2P'] text-[#7B6FA0]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <input
          type="text"
          placeholder="NAME"
          value={participant.name}
          onChange={(e) => onChange(index, "name", e.target.value)}
          className={`
            w-full px-3 py-2.5 text-[9px] font-['Press_Start_2P']
            bg-[#130A24] text-[#F8F8FF] placeholder-[#4A2080]
            border-2 outline-none tracking-wider uppercase
            transition-colors duration-150
            ${error?.name ? "border-[#FF3366]" : "border-[#4A2080] focus:border-[#FF007F]"}
          `}
        />
        {error?.name && (
          <p className="text-[7px] font-['Press_Start_2P'] text-[#FF3366]">{error.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1 flex-[2] min-w-0">
        <input
          type="email"
          placeholder="EMAIL@ADDRESS.COM"
          value={participant.email}
          onChange={(e) => onChange(index, "email", e.target.value)}
          className={`
            w-full px-3 py-2.5 text-[9px] font-['Press_Start_2P']
            bg-[#130A24] text-[#F8F8FF] placeholder-[#4A2080]
            border-2 outline-none tracking-wider
            transition-colors duration-150
            ${error?.email ? "border-[#FF3366]" : "border-[#4A2080] focus:border-[#00E5FF]"}
          `}
        />
        {error?.email && (
          <p className="text-[7px] font-['Press_Start_2P'] text-[#FF3366]">{error.email}</p>
        )}
      </div>

      {/* Remove button */}
      <button
        type="button"
        onClick={() => onRemove(index)}
        disabled={!canRemove}
        aria-label="Remove participant"
        className={`
          mt-1 w-8 h-8 flex-shrink-0 flex items-center justify-center
          border-2 transition-all duration-75
          ${
            canRemove
              ? "border-[#3D1F6E] text-[#7B6FA0] hover:border-[#FF3366] hover:text-[#FF3366] cursor-pointer"
              : "border-[#2A1550] text-[#2A1550] cursor-not-allowed"
          }
        `}
      >
        <X size={12} />
      </button>
    </div>
  );
}
