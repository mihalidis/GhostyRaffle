"use client";

import { useState, useCallback } from "react";
import { Plus, Send, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react";
import { Participant } from "@/lib/shuffler";
import ParticipantRow from "./ParticipantRow";
import PixelButton from "./PixelButton";
import GhostMascot from "./GhostMascot";

const MIN = 3;
const MAX = 50;

const emptyParticipant = (): Participant => ({ name: "", email: "" });

type FieldErrors = Record<number, { name?: string; email?: string }>;
type Status = "idle" | "loading" | "success" | "error";

export default function DrawForm({ ghostColor }: { ghostColor: string }) {
  const [participants, setParticipants] = useState<Participant[]>([
    emptyParticipant(),
    emptyParticipant(),
    emptyParticipant(),
  ]);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<{ sent: number; failedCount: number } | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const handleChange = useCallback(
    (index: number, field: keyof Participant, value: string) => {
      setParticipants((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], [field]: value };
        return next;
      });
      setFieldErrors((prev) => {
        const next = { ...prev };
        if (next[index]) {
          delete next[index][field];
          if (!Object.keys(next[index]).length) delete next[index];
        }
        return next;
      });
      setGlobalError(null);
    },
    []
  );

  const handleAdd = () => {
    if (participants.length < MAX) {
      setParticipants((prev) => [...prev, emptyParticipant()]);
    }
  };

  const handleRemove = (index: number) => {
    if (participants.length <= MIN) return;
    setParticipants((prev) => prev.filter((_, i) => i !== index));
    setFieldErrors((prev) => {
      const next: FieldErrors = {};
      Object.entries(prev).forEach(([k, v]) => {
        const ki = Number(k);
        if (ki < index) next[ki] = v;
        else if (ki > index) next[ki - 1] = v;
      });
      return next;
    });
  };

  const validate = (): boolean => {
    const errors: FieldErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const seenEmails = new Set<string>();

    participants.forEach((p, i) => {
      const rowErrors: { name?: string; email?: string } = {};
      if (!p.name.trim()) rowErrors.name = "Required";
      if (!p.email.trim()) {
        rowErrors.email = "Required";
      } else if (!emailRegex.test(p.email)) {
        rowErrors.email = "Invalid";
      } else if (seenEmails.has(p.email.toLowerCase())) {
        rowErrors.email = "Duplicate";
      } else {
        seenEmails.add(p.email.toLowerCase());
      }
      if (Object.keys(rowErrors).length) errors[i] = rowErrors;
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setGlobalError(null);
    setResult(null);

    try {
      const res = await fetch("/api/draw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participants }),
      });
      const data = await res.json();

      if (!res.ok) {
        setGlobalError(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setResult({ sent: data.sent, failedCount: data.failedCount });
      setStatus(data.success ? "success" : "error");
    } catch {
      setGlobalError("Network error. Please try again.");
      setStatus("error");
    }
  };

  const handleReset = () => {
    setParticipants([emptyParticipant(), emptyParticipant(), emptyParticipant()]);
    setFieldErrors({});
    setStatus("idle");
    setResult(null);
    setGlobalError(null);
  };

  const isLoading = status === "loading";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Participant rows */}
      <div className="flex flex-col gap-3">
        {/* Header labels */}
        <div className="flex gap-2 sm:gap-3 ml-9 mr-10">
          <span className="flex-1 text-[7px] font-['Press_Start_2P'] text-[#7B6FA0] uppercase tracking-widest">
            Name
          </span>
          <span className="flex-[2] text-[7px] font-['Press_Start_2P'] text-[#7B6FA0] uppercase tracking-widest">
            Email
          </span>
        </div>

        {participants.map((p, i) => (
          <ParticipantRow
            key={i}
            index={i}
            participant={p}
            onChange={handleChange}
            onRemove={handleRemove}
            canRemove={participants.length > MIN}
            error={fieldErrors[i]}
          />
        ))}
      </div>

      {/* Add participant */}
      {participants.length < MAX && (
        <PixelButton
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleAdd}
          className="self-start flex items-center gap-2"
        >
          <Plus size={10} />
          ADD PLAYER
        </PixelButton>
      )}

      <div className="text-[7px] font-['Press_Start_2P'] text-[#4A2080]">
        {participants.length} / {MAX} PLAYERS
      </div>

      {/* Separator */}
      <div className="border-t-2 border-dashed border-[#2A1550]" />

      {/* Global error */}
      {globalError && (
        <div className="flex items-start gap-3 p-4 border-2 border-[#FF3366] bg-[#1A0010]">
          <AlertTriangle size={14} className="text-[#FF3366] flex-shrink-0 mt-0.5" />
          <p className="text-[8px] font-['Press_Start_2P'] text-[#FF3366] leading-relaxed">
            {globalError}
          </p>
        </div>
      )}

      {/* Success state */}
      {status === "success" && result && (
        <div className="flex flex-col items-center gap-4 p-6 border-2 border-[#00FF88] bg-[#001A0D]">
          <GhostMascot size={56} color={ghostColor} variant="success" />
          <div className="text-center">
            <p className="text-[11px] font-['Press_Start_2P'] text-[#00FF88] mb-2">
              DRAW COMPLETE!
            </p>
            <p className="text-[8px] font-['Press_Start_2P'] text-[#B8A9D9] leading-loose">
              {result.sent} GHOST MAIL{result.sent !== 1 ? "S" : ""} SENT
            </p>
            {result.failedCount > 0 && (
              <p className="text-[7px] font-['Press_Start_2P'] text-[#FF3366] mt-2 leading-loose">
                {result.failedCount} FAILED
              </p>
            )}
          </div>
          <p className="text-[7px] font-['Press_Start_2P'] text-[#4A2080] text-center leading-loose">
            NO MATCHES WERE STORED.
            <br />
            THE GHOSTS KNOW. NO ONE ELSE DOES.
          </p>
        </div>
      )}

      {/* Partial error */}
      {status === "error" && result && (
        <div className="p-4 border-2 border-[#FF3366] bg-[#1A0010]">
          <p className="text-[8px] font-['Press_Start_2P'] text-[#FF3366] leading-loose">
            {result.failedCount} GHOST MAIL{result.failedCount !== 1 ? "S" : ""} COULD NOT BE DELIVERED.
            <br />CHECK SERVER LOGS FOR DETAILS.
          </p>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col items-center gap-4 py-4">
          <GhostMascot size={48} color={ghostColor} variant="shuffle" />
          <p className="text-[9px] font-['Press_Start_2P'] text-[#B8A9D9] animate-pulse">
            SHUFFLING GHOSTS...
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        {status !== "success" ? (
          <PixelButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            className="flex items-center gap-3"
          >
            {isLoading ? (
              <RefreshCw size={12} className="animate-spin" />
            ) : (
              <Send size={12} />
            )}
            {isLoading ? "HAUNTING..." : "START DRAW"}
          </PixelButton>
        ) : (
          <PixelButton
            type="button"
            variant="secondary"
            size="lg"
            onClick={handleReset}
            className="flex items-center gap-3"
          >
            <RefreshCw size={12} />
            NEW DRAW
          </PixelButton>
        )}
      </div>
    </form>
  );
}
