import { Badge } from "flowbite-react";

export default function StatusBadge({ status }) {
  // Map status to Flowbite colors
   const statusColors = {
      Pending: "warning",
      InProgress: "success",
      Completed: "purple"
    };

  // fallback color if status not found
    const badgeColor = statusColors[status];


  return (
    <Badge
      className="w-fit rounded-full px-2 py-1 font-medium"
      color={badgeColor}
    >
      {status}
    </Badge>
  );
}
