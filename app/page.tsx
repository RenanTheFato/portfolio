'use client'

import { useState } from "react";
import { Terminal } from "@/components/terminal";
import { Topbar } from "@/components/topbar";

export default function Home() {
  const [topbarComplete, setTopbarComplete] = useState(false)

  return (
    <div className="w-screen h-screen flex flex-col">
      <Topbar onAnimationComplete={() => setTopbarComplete(true)} />
      <main className="flex-1 overflow-hidden">
        <Terminal startAnimation={topbarComplete} />
      </main>
    </div>
  )
}