import { Navigate, createFileRoute, redirect } from "@tanstack/react-router";
import { DEPARTMENTS, SERVICES } from "@/data/site";

export const Route = createFileRoute("/departments/$slug")({
  loader: ({ params }) => {
    const department = DEPARTMENTS.find((item) => item.slug === params.slug);
    const service = department
      ? SERVICES.find((item) => item.department === department.name)
      : undefined;

    if (service) {
      throw redirect({ to: "/services/$slug", params: { slug: service.slug } });
    }

    throw redirect({ to: "/services" });
  },
  component: () => <Navigate to="/services" replace />,
});
