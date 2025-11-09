"use client";

export default function NotificationBanner() {
  const message = "All projects successfully uploaded";
  // Duplicate message multiple times for seamless infinite scroll
  const duplicatedMessage = Array(3).fill(`${message} • `).join("");

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-8 bg-lime-600/90 backdrop-blur-sm border-b border-lime-500/30 overflow-hidden">
      <div className="h-full flex items-center">
        <div className="animate-scroll text-sm text-white/90 font-medium">
          {duplicatedMessage}
        </div>
      </div>
    </div>
  );
}

