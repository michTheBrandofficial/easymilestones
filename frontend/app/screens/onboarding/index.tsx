import PageScreen from "@/components/ui/screen";
import { createFileRoute } from "@tanstack/react-router";
import WaterBodySVGFull from "../-components/water-body-svg-full";
import { Button } from "@/components/buttons";
import { useConnect } from "wagmi";
import Logo from "@/app/android-chrome-512x512.png";

export const Route = createFileRoute("/onboarding/")({
  component: Onboarding,
});

function Onboarding() {
  const { connectors, connectAsync } = useConnect();
  return (
    <PageScreen className="flex flex-col gap-y-5 relative ">
      <div className="w-full flex items-center justify-center fixed left-1/2 -translate-x-1/2 top-[20%] z-50">
        <img src={Logo} alt="Logo" className="size-28 " />
      </div>
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
        <Button
          onTap={() => {
            window.open(
              "https://github.com/michTheBrandofficial/easymilestones/blob/main/README.md",
              "_blank"
            );
          }}
          variant="ghost"
          className="w-full"
        >
          See How It Works
        </Button>
      </div>
    </PageScreen>
  );
}
