"use client";
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';

interface IChildrenProps {
  children: React.ReactNode
}

export const Providers = ({ children }: IChildrenProps): React.ReactElement => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted){
    return <>{children}</>
  }

  return <ThemeProvider attribute='class'>{children}</ThemeProvider>
}
