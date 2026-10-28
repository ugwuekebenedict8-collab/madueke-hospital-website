import { Outlet, createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/doctors")({ component: DoctorsLayout });
function DoctorsLayout() { return <Outlet />; }
