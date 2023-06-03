import React from 'react';

export interface MoviePlayerHeight {
  height: string;
}

export function MoviePlayerSkeleton({ height }: MoviePlayerHeight) {
  return (
    <div
      role="status"
      className="flex items-center justify-center h-[630px] bg-gray-300 animate-pulse dark:bg-gray-700"
      style={{ height: `${height}px` }}
    >
      <svg
        className="w-12 h-12 text-gray-200 dark:text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 384 512"
      >
        <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
      </svg>
    </div>
  );
}

export function PlaylistSkeleton() {
  return (
    <div className="flex items-center h-28">
      <div className="flex items-center justify-center w-[168px] h-[96px] bg-gray-300 dark:bg-gray-500 animate-pulse" />
      <div className="px-3 w-[78%] h-[96px] lg:w-[259px] animate-pulse">
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-1.5" />
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4/5" />
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 mt-3" />
        <div className="flex">
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4 mt-2" />
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3 ml-2 mt-2" />
        </div>
      </div>
    </div>
  );
}
