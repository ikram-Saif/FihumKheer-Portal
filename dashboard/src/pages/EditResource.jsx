import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from '../store/authStor';
import { useVolunteersStore } from '../store/volunteersStor';
import { useDomainStore } from '../store/domainStore';
import { Card } from "flowbite-react";
import DynamicForm from '../components/DynamicForm';
import { editItem } from '../utils/editItem';
import { getResourceFields } from '../constants/formConfigs';
import { getResourceConfig } from '../schemas/resourceRegistry';
import { projectsService } from '../services/resources';

export default function EditResource({ resource = "projects" }) {
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  
  const { volunteers, fetchAllVolunteers } = useVolunteersStore();
  const { domains, fetchAllDomains } = useDomainStore();
  const [projectsList, setProjectsList] = useState([]);

  const { schema, mapperFrom, mapperTo, service, title, populate, mediaField } = useMemo(() => getResourceConfig(resource), [resource]);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await service.getById(id, populate, token);
        setData(response.data);
      } catch (error) {
        toast.error(`Failed to fetch ${title}`);
      }
    };

    fetchResource();
    if (volunteers.length === 0) fetchAllVolunteers();
    if (domains.length === 0) fetchAllDomains();
    
    if (resource === 'volunteers') {
      projectsService.getAll({ "fields[0]": "name" }, token).then(res => setProjectsList(res.data));
    }
  }, [id, resource, volunteers.length, domains.length, service, token, title, populate, fetchAllVolunteers, fetchAllDomains]);

  const fields = useMemo(() => getResourceFields(resource, { domains, volunteers, projects: projectsList }),
    [resource, domains, volunteers, projectsList]);

  const handleAction = async (values) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(mapperTo(values)));

    if (values.newMedia?.length > 0) {
      values.newMedia.forEach((item) => {
        const file = item.file || item;
        if (file instanceof File || file instanceof Blob) {
          formData.append(mediaField, file);
        }
      });
    }

    editItem(id, formData, resource, token, () => navigate(`/${resource}`));
  };

  const initialValues = useMemo(() => {
    return Object.keys(data).length > 0 ? mapperFrom(data) : {};
  }, [data, mapperFrom]);

  if (!Object.keys(data).length) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <Card className="max-w-6xl mx-auto shadow-2xl rounded-[2.5rem] border border-gray-100 dark:border-gray-800 px-8 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 tracking-tight italic">Edit {title}</h2>
        <p className="text-sm font-bold text-blue-500 uppercase tracking-widest mt-2 ml-1">Precision {resource} Modification</p>
      </div>
      <DynamicForm 
        initialValues={initialValues} 
        schema={schema} 
        fields={fields} 
        onSubmit={handleAction} 
        submitLabel={`Update ${title}`}
        isEdit={true}
      />
    </Card>
  );
}
