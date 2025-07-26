import { Suspense } from "react"
import Clients from "./ClientPage"
export default function Page() {
  return (
    <Suspense fallback={<div>Loading portfolio...</div>}>
      <Clients />
    </Suspense>
  )
}
