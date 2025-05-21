import Components from "@/components";
import PageScreen from "@/components/ui/screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/showcase/')({
  component: ComponentShowcase,
})

function ComponentShowcase() {
  return (
    <PageScreen className="bg-white" >
      <Components />
    </PageScreen>
  )
}

export default ComponentShowcase;
