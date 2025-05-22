import PageScreen from "@/components/ui/screen";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <PageScreen className=""></PageScreen>;
}
