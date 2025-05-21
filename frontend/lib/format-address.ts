import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_utils/format-address')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_utils/format-address"!</div>
}
