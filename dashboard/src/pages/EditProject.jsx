import { useState, useEffect } from 'react';
import { projectsService } from "../services/resources";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from '../store/authStor';
import { Card } from "flowbite-react";

import ProjectForm from '../components/ProjectForm';
import { editItem } from '../utils/editItem';


export default function EditProject() {
  const [project, setProject] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthStore();

  const params = {
    // "populate[domain][fields][0]": "domain_name",
    // "populate[volunteers][populate]": "image",
    // "populate": "media",
    populate: "*"
  };

  const fetchProject = async () => {
    try {
      const response = await projectsService.getById(id, params, token);
      setProject(response.data);
    } catch (error) {
      toast.error(error.message || "Failed to fetch project");
      console.log("DEBUG: Fetch project error:", error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleEdit = async (formData) => {
    editItem(
      id,
      formData,
      "projects",
      token,
      () => navigate('/projects')
    );
  }



  return (

    <Card className="max-w-6xl mx-auto shadow-md rounded-2xl border border-gray-100 px-6">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Edit Project</h2>
      <ProjectForm project={project} action={handleEdit} />
    </Card>
  );
}
