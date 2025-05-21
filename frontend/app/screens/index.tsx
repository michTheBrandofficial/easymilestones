import { Button } from "@/components/buttons";
import PageScreen from "@/components/ui/screen";
import { useSheet } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/toast-context";
import { ArrowLeft01Icon } from "hugeicons-react";
import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { Sheet, SheetContent, openSheet } = useSheet("account");
  const showToast = useToast()
  return (
    <PageScreen className="" skipInitialAnimation >
      <ArrowLeft01Icon width={24} height={24} className="text-black " />
      <Sheet title="Account" backButton="Back" >
        <SheetContent>Address: 0x1234567890</SheetContent>
      </Sheet>
      <Button onTap={() => {
        openSheet()
        showToast('info', 'Transaction complete')
      }} className="mt-40">
        Open
      </Button>
      <Link to={'/showcase'}>
        <Button className="mt-40">
          Showcase
        </Button>
      </Link>
    </PageScreen>
  );
};