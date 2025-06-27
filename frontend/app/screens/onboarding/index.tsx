import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/onboarding/')({
  component: Onboarding,
})

function Onboarding() {
  return <div>Hello "/onboarding/"!</div>
}
