"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from 'next-themes';

export const ThemeSwitcher = (): React.ReactElement | null => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);
  const { theme, setTheme } = useTheme();

  const handleToggleActive = (): void => {
    setIsActive(!isActive);
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (isActive) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [isActive, isMounted, setTheme]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex justify-center items-center mt-4">
        <span>
          <svg className={`h-6 w-6 text-gray-400 ${isActive ? 'opacity-[0.2]' : 'opacity-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>

        <div className={`${!isActive ? 'bg-dark-gray-70' : 'bg-dark-black-30'} w-14 h-7 flex items-center bg-gray-300 rounded-full mx-3 px-1`} onClick={handleToggleActive}>
          <div className={`${isActive ? 'translate-x-7' : ''} bg-white w-5 h-5 rounded-full shadow-md transform`}></div>
        </div>

        <span>
          <svg className={`h-6 w-6 text-gray-400 ${!isActive ? 'opacity-1' : 'opacity-[0.2]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </span>
      </div>
    </div>
  );
};