import PageScreen from "@/components/ui/screen";
import { createFileRoute } from "@tanstack/react-router";
import WaterBodySVGFull from "../-components/water-body-svg-full";
import { Button } from "@/components/buttons";
import { useConnect, useConnectors } from "wagmi";

export const Route = createFileRoute("/onboarding/")({
  component: Onboarding,
});

function Onboarding() {
  const { connectors, connectAsync } = useConnect()
  return (
    <PageScreen className="flex flex-col gap-y-5 relative">
      <WaterBodySVGFull />
      <div className="w-screen fixed bottom-9 z-50 left-0 space-y-2 px-2.5 ">
        {connectors.map((connector) => (
          <Button
            key={connector.id}
            className="w-full"
            onTap={() => connectAsync({ connector })}
          >
            Connect {connector.name}
          </Button>
        ))}
        <Button variant="ghost"  className="w-full" >
          See How It Works
        </Button>
      </div>
    </PageScreen>
  );
}
