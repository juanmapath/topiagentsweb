import { Hero } from "@/components/landing/Hero"
import { PainAgitation } from "@/components/landing/PainAgitation"
import { UseCases } from "@/components/landing/UseCases"
import { ValueLadderOffer } from "@/components/landing/ValueLadderOffer"
import { FrictionCalculator } from "@/components/landing/FrictionCalculator"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <UseCases />
      <PainAgitation />
      <ValueLadderOffer />
      <FrictionCalculator />
    </div>
  )
}
