import { Dropdown, DropdownItem } from "flowbite-react";

export default function VolunteerCell({ volunteers }) {
  return (
    <Dropdown
      label=""
      dismissOnClick={false}
      renderTrigger={() => (
        <div className="flex -space-x-3 cursor-pointer">
          {volunteers?.slice(0, 2).map((vol, index) => {
            const imageUrl = vol.image?.[0]?.url
              ? `http://localhost:1337${vol.image[0].url}`
              : "/placeholder.png";
            return (
              <img
                key={index}
                src={imageUrl}
                alt={vol.name}
                className="w-10 h-10 overflow-hidden border-2 border-white rounded-full"
              />
            );
          })}

          {volunteers?.length > 2 && (
            <span className="flex justify-center items-center w-10 h-10 border-2 border-white rounded-full bg-gray-300 text-black font-bold">
              +{volunteers.length - 2}
            </span>
          )}
        </div>
      )}
    >
      {volunteers?.map((vol, index) => {
        const imageUrl = vol.image?.[0]?.url
          ? `http://localhost:1337${vol.image[0].url}`
          : "/placeholder.png";
        return (
          <DropdownItem key={index} className="flex items-center gap-2">
            <img
              src={imageUrl}
              alt={vol.name}
              className="w-7 h-7 rounded-full object-cover border"
            />
            <span>{vol.name}</span>
          </DropdownItem>
        );
      })}
    </Dropdown>
  );
}
