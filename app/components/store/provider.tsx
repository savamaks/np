"use client";
import React, { createContext, ReactNode } from "react";
import { RootStore } from "./store";

export const StoreContext = createContext<RootStore | null>(null)

export const StoreWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <StoreContext.Provider value={ new RootStore()}>{children}</StoreContext.Provider>
  );
};