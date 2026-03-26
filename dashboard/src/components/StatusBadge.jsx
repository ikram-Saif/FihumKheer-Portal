import { Badge } from "flowbite-react";

export default function StatusBadge({ status }) {
  // Normalize status: trim spaces and handle case
  const normalizedStatus = status?.trim().toLowerCase() || "";

  const statusMap = {
    pending: { label: "Pending", color: "warning" },
    inprogress: { label: "In Progress", color: "success" },
    completed: { label: "Completed", color: "purple" },
    offline: { label: "Offline", color: "dark" },
    onsite: { label: "Onsite", color: "indigo" },
    online: { label: "Online", color: "success" },
    both: { label: "Hybrid", color: "purple" },
  };

  const config = statusMap[normalizedStatus] || { label: status, color: "gray" };

  return (
    <Badge
      className="w-fit rounded-full px-3 py-1 font-bold text-xs uppercase tracking-wider shadow-sm"
      color={config.color}
    >
      {config.label}
    </Badge>
  );
}
