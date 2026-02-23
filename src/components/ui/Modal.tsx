"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import IconButton from "./IconButton";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  /** Panel width for the floating card (default 360px) */
  width?: string | number;
  /** Position: 'center' or 'right' (default right for panel-style modals) */
  position?: "center" | "right";
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  className = "",
  width = 360,
  position = "right",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const widthStyle =
    typeof width === "number" ? `${width}px` : width;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-stretch justify-end"
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Panel */}
      <div
        className={`
          relative z-10 flex flex-col
          bg-bg-secondary border-l border-border-subtle
          shadow-2xl
          animate-modal-slide-in
          ${position === "center" ? "m-auto rounded-lg border border-border" : "h-full"}
          ${className}
        `.trim()}
        style={{
          width: widthStyle,
          maxWidth: position === "center" ? "90vw" : "100%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle shrink-0">
          {title ? (
            <h2
              id="modal-title"
              className="font-mono text-xs tracking-[1.5px] font-semibold uppercase text-text-primary"
            >
              {title}
            </h2>
          ) : (
            <span />
          )}
          <IconButton
            icon={X}
            size="sm"
            aria-label="Close"
            onClick={onClose}
          />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
