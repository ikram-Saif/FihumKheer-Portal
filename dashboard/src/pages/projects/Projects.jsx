import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStor"
import axios from "axios";
import toast from "react-hot-toast";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Badge, Button, DropdownItem, Dropdown } from "flowbite-react";
import VolunteerCell from "../../components/VolunteerCell"
import StatusBadge from "../../components/StatusBadge"
import { LuTrash2, LuEye, LuSquarePen } from 'react-icons/lu';
import { TablePagination } from "../../components/Pagination";
import { LuSearch } from 'react-icons/lu';
import { TextInput } from "flowbite-react"
import { LuPlus } from 'react-icons/lu';
import { LuUpload } from 'react-icons/lu';
import Filter from "../../components/Filter"
import { ViewModal } from "../../components/ViewModal"
import { useProjectStore } from "../../store/projectsStor";
import { deleteItem } from "../../utils/deleteItem";
import { Link } from "react-router-dom"
import AddButon from "../../components/AddButon";



function Projects() {
  const { setSelectedProject, openModal } = useProjectStore();

  const tableHeader = ["Project name", "status", "progress", "type", "domain", "volunteers", "actions"];
  const [projects, setProjects] = useState([])
  const [meta, setMeta] = useState(null)
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const token = useAuthStore((state) => state.token)

  const fetchProjects = async (pageNumber) => {
    try {
      console.log(pageNumber, "from project")
      const response = await axios.get(`http://localhost:1337/api/projects?populate=*&pagination[page]=${pageNumber}&pagination[pageSize]=2`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
      setProjects(response.data.data)
      setMeta(response.data.meta)
      setPage(response.data.meta.pagination.page); // update current page

    } catch (error) {
      toast.error(error)
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

  useEffect(() => {
    fetchProjects(page)
  }, [page, refresh])

  return (
    <>
      <div className="flex justify-between items-center my-2">
        <div>
          <TextInput id="search" type="text" rightIcon={LuSearch} placeholder="Search..." className="bg-white" />
        </div>
        <div className="flex gap-1">
          <AddButon link="/projects/add" />

          <Filter />

          <Button color="alternative">
            <LuUpload className="me-2 h-4 w-4" />

            Export

          </Button>
        </div>

      </div>
      <div className="">
        <Table className="min-w-full">
          <TableHead className="border-gray-100 border-y bg-gray-50">
            <TableRow className="px-6 py-3 whitespace-nowrap">
              {tableHeader.map((title, index) => (<TableHeadCell key={index}>{title}</TableHeadCell>))}
            </TableRow>
          </TableHead>

          <TableBody className="divide-y divide-gray-100">

            {
              projects && projects.map((data, index) => (
                <TableRow key={index} className="whitespace-nowrap">

                  <TableCell className="py-2">{data.name}</TableCell>
                  <TableCell className="py-2">
                    <StatusBadge status={data?.project_status} />
                  </TableCell>
                  <TableCell className="py-2 text-red-600">{data.progress}%</TableCell>
                  <TableCell className="py-2">{data?.type}</TableCell>
                  <TableCell className="py-2">{data.domain?.domain_name}</TableCell>

                  <TableCell className="py-2">{

                    <VolunteerCell volunteers={data?.volunteers} />
                  }
                  </TableCell>

                  <TableCell className="py-2" >
                    <div className="flex gap-3">
                      <LuEye className="text-[#2ecc71] cursor-pointer"
                        onClick={() => {
                          setSelectedProject(data);
                          openModal();
                        }} />
                      <Link to={`/projects/edit/${data.documentId}`}>
                        <LuSquarePen className="text-gray-600 cursor-pointer" />
                      </Link>

                      <LuTrash2 className="text-[#e74c3c] cursor-pointer"
                        onClick={() => handleDelete(data.documentId)}
                      />
                    </div>
                  </TableCell>

                </TableRow>

              ))

            }

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