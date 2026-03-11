'use client'

import { useState } from "react";
import { PresentationSection } from "@/components/presentation";
import { Topbar } from "@/components/topbar";
import { Projects } from "@/components/projects";
import { useCustomScrollbar, ScrollTrack } from "@/utils/scroll";

export default function Home() {
  const [topbarComplete, setTopbarComplete] = useState(false)
  const [presentationComplete, setPresentationComplete] = useState(false)
  const { mainRef, thumbRef, trackRef, handleScroll } = useCustomScrollbar()

  const canScroll = topbarComplete && presentationComplete

  return (
    <div className="w-screen h-screen flex flex-col">
      <Topbar onAnimationComplete={() => setTopbarComplete(true)} />

      <div className="relative flex-1 overflow-hidden">
        <ScrollTrack trackRef={trackRef} thumbRef={thumbRef} />

        <main
          ref={mainRef}
          onScroll={handleScroll}
          className={`h-full ${canScroll ? "overflow-y-scroll" : "overflow-hidden"}`}
          style={{ scrollbarWidth: "none" }}
        >
          <style>{`main::-webkit-scrollbar { display: none; }`}</style>

          <PresentationSection
            startAnimation={topbarComplete}
            onAnimationComplete={() => setPresentationComplete(true)}
          />
          <Projects />
        </main>
      </div>
    </div>
  )
}