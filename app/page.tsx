'use client'

import { useState } from "react";
import { PresentationSection } from "@/components/presentation";
import { Topbar } from "@/components/topbar";

export default function Home() {
  const [topbarComplete, setTopbarComplete] = useState(false)

  return (
    <div className="w-screen h-screen flex flex-col">
      <Topbar onAnimationComplete={() => setTopbarComplete(true)} />
      <main className="flex-1 overflow-hidden">
        <PresentationSection startAnimation={topbarComplete} />
      </main>
    </div>
  )
}