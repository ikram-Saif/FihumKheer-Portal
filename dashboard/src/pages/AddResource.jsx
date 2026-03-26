import { useMemo, useState, useEffect } from 'react';
import { Card } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStor';
import { useVolunteersStore } from '../store/volunteersStor';
import { useDomainStore } from '../store/domainStore';
import DynamicForm from '../components/DynamicForm';
import { addItem } from '../utils/addItem';
import { getResourceFields } from '../constants/formConfigs';
import { getResourceConfig } from '../schemas/resourceRegistry';
import { projectsService } from '../services/resources';

function AddResource({ resource = "projects" }) {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const { volunteers, fetchAllVolunteers } = useVolunteersStore();
  const { domains, fetchAllDomains } = useDomainStore();
  const [projectsList, setProjectsList] = useState([]);

  const { schema, mapperFrom, mapperTo, title, mediaField } = useMemo(() => getResourceConfig(resource), [resource]);

  useEffect(() => {
    if (volunteers.length === 0) fetchAllVolunteers();
    if (domains.length === 0) fetchAllDomains();
    if (resource === 'volunteers') {
      projectsService.getAll({ "fields[0]": "name" }, token).then(res => setProjectsList(res.data));
    }
  }, [resource, token, fetchAllVolunteers, fetchAllDomains]);

  const fields = useMemo(() => getResourceFields(resource, { domains, volunteers, projects: projectsList }),
    [resource, domains, volunteers, projectsList]);

  const handleAdd = async (values) => {
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

    addItem(formData, resource, token, () => navigate(`/${resource}`));
  };

  return (
    <Card className="max-w-6xl mx-auto shadow-2xl rounded-[2.5rem] border border-gray-100 dark:border-gray-800 px-8 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 tracking-tight italic">Add New {title}</h2>
        <p className="text-sm font-bold text-blue-500 uppercase tracking-widest mt-2 ml-1">Unified {resource} Protocol</p>
      </div>
      <DynamicForm 
        initialValues={mapperFrom({})} 
        schema={schema} 
        fields={fields} 
        onSubmit={handleAdd} 
        submitLabel={`Assemble ${title}`}
      />
    </Card>
  );
}

export default AddResource;