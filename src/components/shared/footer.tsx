"use client";

export default function Footer() {
  return (
    <div className="px-4 md:px-6 py-8 md:py-10 bg-secondary/80 rounded-xl flex items-center justify-center flex-col border gap-1 w-full">
      <div className="text-xs text-center">
        &copy; {new Date().getFullYear()} Aarron Heldian Portfolio - Where Ideas
        Come to Life. All rights reserved.
      </div>
      <div className="text-xs text-center">
        Crafted with passion by{" "}
        <span className="font-semibold">Aarron Heldian</span>
      </div>
    </div>
  );
}
