import type { ReactNode } from "react"
import TWHeader from "./twheader"
import TWFooter from "./twfooter"
import { useState } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  
  return (
    <>
      <TWHeader/>
        <main>{children}</main>
      <TWFooter/>
    </>
  )
}