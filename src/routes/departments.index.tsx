import { Navigate, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/departments/")({
  component: () => <Navigate to="/services" replace />,
});
