import { ThemeProvider }     from '@/components/landing/providers/ThemeProvider'
import LenisProvider         from '@/components/landing/providers/LenisProvider'
import CustomCursor          from '@/components/landing/cursor/CustomCursor'
import Navigation            from '@/components/landing/ui/Navigation'
import OpeningSection        from '@/components/landing/sections/OpeningSection'
import ProblemSection        from '@/components/landing/sections/ProblemSection'
import VitalsSection         from '@/components/landing/sections/VitalsSection'
import ProductSection        from '@/components/landing/sections/ProductSection'
import ArchitectureSection   from '@/components/landing/sections/ArchitectureSection'
import CloserSection         from '@/components/landing/sections/CloserSection'

export default function LandingPage() {
  return (
    <ThemeProvider>
      <LenisProvider>
        <CustomCursor />
        <Navigation />
        <main>
          <OpeningSection />
          <ProblemSection />
          <VitalsSection />
          <ProductSection />
          <ArchitectureSection />
          <CloserSection />
        </main>
      </LenisProvider>
    </ThemeProvider>
  )
}
