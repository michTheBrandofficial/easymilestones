import * as React from "react";
import {
  Outlet,
  createRootRoute
} from "@tanstack/react-router";
import FloatingTabBar from "./-components/floating-tab-bar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <FloatingTabBar />
    </React.Fragment>
  );
}
