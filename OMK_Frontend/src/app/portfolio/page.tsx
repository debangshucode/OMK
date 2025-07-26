import { Suspense } from "react"
import Portfolio from "./portfoliopage"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading portfolio...</div>}>
      <Portfolio />
    </Suspense>
  )
}
