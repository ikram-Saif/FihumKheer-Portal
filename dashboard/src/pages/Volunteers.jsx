import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStor"
import axios from "axios";
import toast from "react-hot-toast";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Badge, Button, Dropdown, DropdownItem, DropdownHeader } from "flowbite-react";
import StatusBadge from "../components/StatusBadge"
import { LuTrash2, LuEye, LuSquarePen, LuUpload, LuPhone, LuMail } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa';
import { TablePagination } from "../components/Pagination";
import { ViewModal } from "../components/ViewModal"
import { useVolunteersStore } from "../store/volunteersStor";
import { deleteItem } from "../utils/deleteItem";
import { Link } from "react-router-dom"
import PageTopSection from "../components/PageTopSection";
import { LuUsers, LuUserCheck, LuUserPlus } from 'react-icons/lu';
import { exportToCSV } from "../utils/csvExport";

function Volunteers() {
  const { setSelectedVolunteer, openModal } = useVolunteersStore();

  const [volunteers, setVolunteers] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const token = useAuthStore((state) => state.token);

  const fetchVolunteers = async (pageNumber) => {
    try {
      let url = `http://localhost:1337/api/volunteers?populate=*&pagination[page]=${pageNumber}&pagination[pageSize]=10`;

      if (searchTerm) {
        url += `&filters[name][$containsi]=${searchTerm}`;
      }

      if (filterType !== "all") {
        if (filterType === "Permanent Volunteer") {
          // Include both explicit "Permanent Volunteer" and null/empty records
          url += `&filters[$or][0][volunteer_type][$containsi]=${filterType}&filters[$or][1][volunteer_type][$null]=true`;
        } else {
          url += `&filters[volunteer_type][$containsi]=${filterType}`;
        }
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setVolunteers(response.data.data);
      setMeta(response.data.meta);
      setPage(response.data.meta.pagination.page);
    } catch (error) {
      toast.error("Failed to fetch volunteers");
    }
  };

  const handleExport = () => {
    if (!volunteers || volunteers.length === 0) {
      toast.error("No volunteers to export");
      return;
    }

    const headers = ["Name", "Age", "Gender", "Type", "Work Mode", "Job", "Location", "Phone", "Email"];
    const exportData = volunteers.map(vol => ({
      "Name": vol.name,
      "Age": vol.age,
      "Gender": vol.gender,
      "Type": vol.volunteer_type || "Permanent Volunteer",
      "Work Mode": vol.working_type || "pending",
      "Job": vol.current_job || "—",
      "Location": `${vol.city}, ${vol.country}`,
      "Phone": vol.phone,
      "Email": vol.email
    }));

    exportToCSV(exportData, headers, "volunteers_export.csv");
    toast.success("Volunteers exported to CSV");
  };

  useEffect(() => {
    fetchVolunteers(1);
  }, [searchTerm, filterType, refresh]);

  const handleDelete = (id) => {
    deleteItem(
      id,
      "volunteers",
      token,
      () => setRefresh((prev) => !prev)
    );
  };

  const tableHeader = ["Volunteer", "Engagement", "Work Mode", "Contact Channel", "Professional", "Location & Days", "Actions"];

  return (
    <>
      <PageTopSection
        onSearch={setSearchTerm}
        searchPlaceholder="Search volunteers by name..."
        filterOptions={[
          { label: "All Types", value: "all", icon: LuUsers },
          { label: "Permanent", value: "Permanent Volunteer", icon: LuUserCheck },
          { label: "Per-Project", value: "Per-Project", icon: LuUserPlus },
        ]}
        onFilterSelect={setFilterType}
        currentFilterLabel={filterType === "all" ? "All Types" : filterType.replace(' Volunteer', '')}
        addButtonLink="/volunteers/add"
        addButtonLabel="Add Volunteer"
        onExport={handleExport}
        totalCount={meta?.pagination?.total}
        countLabel="Contributors"
      />

      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden">
        <Table hoverable={true} className="min-w-full">
          <TableHead className="bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
            {tableHeader.map((title, index) => (
              <TableHeadCell key={index} className="py-6 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none bg-transparent">
                {title}
              </TableHeadCell>
            ))}
          </TableHead>

          <TableBody className="divide-y divide-gray-50 dark:divide-gray-800">
            {volunteers.map((data, index) => {
              const imageUrl = data.image?.[0]?.url ? `http://localhost:1337${data.image[0].url}` : "/placeholder.png";
              return (
                <TableRow key={index} className="bg-white dark:bg-gray-950/50 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group">
                  {/* Volunteer (Name + Photo + Age/Gender) */}
                  <TableCell className="py-6 px-6">
                    <div className="flex items-center gap-4">
                      <img src={imageUrl} alt={data.name} className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 shadow-sm object-cover" />
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 dark:text-gray-100 tracking-tight">{data.name}</span>
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                          {data.age} yrs • {data.gender}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Engagement (Type) */}
                  <TableCell className="py-6">
                    <Badge color="info" className="w-fit rounded-lg px-2.5 py-1 font-black text-[10px] tracking-widest uppercase">
                      {data.volunteer_type || "Permanent Volunteer"}
                    </Badge>
                  </TableCell>

                  {/* Work Mode */}
                  <TableCell className="py-6">
                    <StatusBadge status={data.working_type || "pending"} />
                  </TableCell>

                  {/* Contact Channel (Icons) */}
                  <TableCell className="py-6">
                    <div className="flex items-center gap-2">
                      <a href={`tel:${data.phone}`} title={data.phone} className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
                        <LuPhone size={14} />
                      </a>
                      {data.whatsapp && (
                        <a href={`https://wa.me/${data.whatsapp.replace(/\D/g, '')}`} target="_blank" className="p-2 rounded-lg bg-green-50 text-green-500 hover:bg-green-500 hover:text-white transition-all">
                          <FaWhatsapp size={14} />
                        </a>
                      )}
                      {data.email && (
                        <a href={`mailto:${data.email}`} title={data.email} className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-500 hover:text-white transition-all">
                          <LuMail size={14} />
                        </a>
                      )}
                    </div>
                  </TableCell>

                  {/* Professional */}
                  <TableCell className="py-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300 line-clamp-1">{data.current_job || "—"}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{data.office || "Remote"}</span>
                    </div>
                  </TableCell>

                  {/* Location & Days */}
                  <TableCell className="py-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{data.city}, {data.country}</span>
                      <div className="flex gap-0.5">
                        {data.available_days?.split(',').slice(0, 3).map((d, i) => (
                          <span key={i} className="text-[8px] font-black text-blue-500 px-1 py-0.5 bg-blue-50 rounded uppercase">
                            {d.trim()}
                          </span>
                        ))}
                        {(data.available_days?.split(',').length > 3) && <span className="text-[8px] text-gray-400">...</span>}
                      </div>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="py-6">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        title="View Details"
                        onClick={() => {
                          setSelectedVolunteer(data);
                          openModal();
                        }}
                        className="p-2 rounded-[1rem] bg-gray-50 dark:bg-gray-800 text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-sm"
                      >
                        <LuEye size={16} />
                      </button>
                      <Link to={`/volunteers/edit/${data.documentId}`}>
                        <button
                          title="Edit Volunteer"
                          className="p-2 rounded-[1rem] bg-gray-50 dark:bg-gray-800 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                        >
                          <LuSquarePen size={16} />
                        </button>
                      </Link>
                      <button
                        title="Delete Volunteer"
                        onClick={() => handleDelete(data.documentId)}
                        className="p-2 rounded-[1rem] bg-gray-50 dark:bg-gray-800 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      >
                        <LuTrash2 size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="pt-6">
        <TablePagination meta={meta} fetchProjects={fetchVolunteers} />
      </div>

      <ViewModal />
    </>
  );
}

export default Volunteers;