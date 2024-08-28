"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@/lib/store";

export function ClientProvider({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}
