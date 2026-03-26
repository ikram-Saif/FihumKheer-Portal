import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStor"
import axios from "axios";
import toast from "react-hot-toast";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Badge, Button, DropdownItem, Dropdown } from "flowbite-react";
import VolunteerCell from "../../components/VolunteerCell"
import StatusBadge from "../../components/StatusBadge"
import { LuTrash2, LuEye, LuSquarePen } from 'react-icons/lu';
import { TablePagination } from "../../components/Pagination";
import { ViewModal } from "../../components/ViewModal"
import { useProjectStore } from "../../store/projectsStor";
import { deleteItem } from "../../utils/deleteItem";
import { Link } from "react-router-dom"
import PageTopSection from "../../components/PageTopSection";
import { LuLayoutDashboard, LuClock, LuActivity, LuCircleCheck } from 'react-icons/lu';
import { exportToCSV } from "../../utils/csvExport";



function Projects() {
  const { setSelectedProject, openModal } = useProjectStore();

  const tableHeader = ["Project Name", "Status", "Progress", "Urgent Need", "Domain", "Volunteers", "Actions"];
  const [projects, setProjects] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const token = useAuthStore((state) => state.token)
  const fetchProjects = async (pageNumber) => {
    try {
      let url = `http://localhost:1337/api/projects?populate[0]=volunteers.image&populate[1]=project_domain&populate[2]=media&pagination[page]=${pageNumber}&pagination[pageSize]=10`;

      if (searchTerm) {
        url += `&filters[name][$containsi]=${searchTerm}`;
      }

      if (filterType !== "all") {
        url += `&filters[project_status][$containsi]=${filterType}`;
      }

      const response = await axios.get(url,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
      setProjects(response.data.data)
      console.log(response.data.data)
      setMeta(response.data.meta)
      setPage(response.data.meta.pagination.page); // update current page

    } catch (error) {
      toast.error(error?.response?.data?.error?.message || error.message || "An error occurred");
    }
  }

  const handleDelete = (id) => {
    deleteItem(
      id,
      "projects",
      token,
      () => setRefresh((prev) => !prev)
    );
  };

  const handleExport = () => {
    if (!projects || projects.length === 0) {
      toast.error("No projects to export");
      return;
    }

    const headers = ["Name", "Status", "Progress", "Domain", "Volunteers"];
    const exportData = projects.map(proj => ({
      "Name": proj.name,
      "Status": proj.project_status,
      "Progress": `${proj.progress}%`,
      "Domain": proj.project_domain?.name || "—",
      "Volunteers": proj.volunteers?.map(v => v.name).join(", ") || "—"
    }));

    exportToCSV(exportData, headers, "projects_export.csv");
    toast.success("Projects exported to CSV");
  };

  useEffect(() => {
    fetchProjects(1);
  }, [searchTerm, filterType, refresh]);

  return (
    <>
      <PageTopSection
        onSearch={setSearchTerm}
        searchPlaceholder="Search projects by name..."
        filterOptions={[
          { label: "All Statuses", value: "all", icon: LuLayoutDashboard },
          { label: "Pending", value: "pending", icon: LuClock },
          { label: "In Progress", value: "InProgress", icon: LuActivity },
          { label: "Completed", value: "completed", icon: LuCircleCheck },
        ]}
        onFilterSelect={setFilterType}
        currentFilterLabel={filterType === "all" ? "All Statuses" : filterType.replace('InProgress', 'In Progress').replace('pending', 'Pending').replace('completed', 'Completed')}
        addButtonLink="/projects/add"
        addButtonLabel="New Initiative"
        onExport={handleExport}
        totalCount={meta?.pagination?.total}
        countLabel="Initiatives"
      />
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-[2rem] border border-gray-100 dark:border-gray-800 overflow-hidden">
        <Table hoverable={true} className="min-w-full">
          <TableHead className="bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
            {tableHeader.map((title, index) => (
              <TableHeadCell key={index} className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none bg-transparent">
                {title}
              </TableHeadCell>
            ))}
          </TableHead>

          <TableBody className="divide-y divide-gray-50 dark:divide-gray-800">
            {projects && projects.map((data, index) => (
              <TableRow key={index} className="bg-white dark:bg-gray-950/50 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group">
                <TableCell className="py-5 px-6 font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                  {data.name}
                </TableCell>
                <TableCell className="py-5">
                  <StatusBadge status={data?.project_status} />
                </TableCell>
                <TableCell className="py-5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-gray-700 dark:text-gray-300">{data.progress}%</span>
                    <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden hidden sm:block">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-700"
                        style={{ width: `${data.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-5">
                  <div className="flex flex-wrap gap-1.5">
                    {(Array.isArray(data?.urgent_need)
                      ? data.urgent_need
                      : (data?.urgent_need?.split(',') || [])).filter(Boolean).map((need, idx) => (
                        <Badge key={idx} color={
                          need === 'partners' ? 'purple' :
                            need === 'donors' ? 'green' :
                              need === 'volunteers' ? 'blue' : 'gray'
                        } size="xs" className="rounded-md px-2 py-0.5 font-bold border-0 shadow-sm capitalize">
                          {need}
                        </Badge>
                      ))}
                  </div>
                </TableCell>
                <TableCell className="py-5 text-sm font-semibold text-gray-500 dark:text-gray-400 italic">
                  {data.project_domain?.name || "—"}
                </TableCell>

                <TableCell className="py-5">
                  <VolunteerCell volunteers={data?.volunteers} />
                </TableCell>

                <TableCell className="py-5">
                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <button
                      title="View Details"
                      onClick={() => {
                        setSelectedProject(data);
                        openModal();
                      }}
                      className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-sm"
                    >
                      <LuEye size={18} />
                    </button>
                    <Link to={`/projects/edit/${data.documentId}`}>
                      <button
                        title="Edit Project"
                        className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                      >
                        <LuSquarePen size={18} />
                      </button>
                    </Link>
                    <button
                      title="Delete Project"
                      onClick={() => handleDelete(data.documentId)}
                      className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      <LuTrash2 size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="pt-3">
        <TablePagination meta={meta} fetchProjects={fetchProjects} />
      </div>

      <ViewModal />
    </>

  )
}

export default Projects