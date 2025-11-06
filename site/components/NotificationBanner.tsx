"use client";

export default function NotificationBanner() {
  const message = "All projects will be added by Sunday 11th November this week";
  // Duplicate message multiple times for seamless infinite scroll
  const duplicatedMessage = Array(3).fill(`${message} • `).join("");

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-8 bg-purple-600/90 backdrop-blur-sm border-b border-purple-500/30 overflow-hidden">
      <div className="h-full flex items-center">
        <div className="animate-scroll text-sm text-white/90 font-medium">
          {duplicatedMessage}
        </div>
      </div>
    </div>
  );
}

