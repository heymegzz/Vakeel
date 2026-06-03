import LenisProvider      from '@/components/landing/providers/LenisProvider'
import CustomCursor       from '@/components/landing/cursor/CustomCursor'
import Navigation         from '@/components/landing/ui/Navigation'
import OpeningSection     from '@/components/landing/sections/OpeningSection'
import ProblemSection     from '@/components/landing/sections/ProblemSection'
import ProductSection     from '@/components/landing/sections/ProductSection'
import ArchitectureSection from '@/components/landing/sections/ArchitectureSection'
import CloserSection      from '@/components/landing/sections/CloserSection'

export default function LandingPage() {
  return (
    <LenisProvider>
      {/* Custom cursor — rendered outside normal flow */}
      <CustomCursor />

      {/* Fixed navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        {/* ACT 0 — Opening (3D cinematic courtroom) */}
        <OpeningSection />

        {/* ACT I — The Problem */}
        <ProblemSection />

        {/* ACT II — The Product (horizontal scroll) */}
        <ProductSection />

        {/* ACT III — The Architecture */}
        <ArchitectureSection />

        {/* ACT IV — The Closer + Form + Footer */}
        <CloserSection />
      </main>
    </LenisProvider>
  )
}
