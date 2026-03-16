import { Card } from 'flowbite-react';
import ProjectForm from '../components/ProjectForm';
import { addItem } from '../utils/addItem';
import { useAuthStore } from '../store/authStor';
import { useNavigate } from 'react-router-dom';

function AddProject() {

  const { token } = useAuthStore();
  const navigate = useNavigate();

  const handleAdd = async (formData) => {
    addItem(
      formData,
      "projects",
      token,
      () => navigate('/projects')
    );
  }
  return (
    <>
      <Card className="max-w-6xl mx-auto shadow-md rounded-2xl border border-gray-100 px-6">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">Add New Project</h2>
        <ProjectForm action={handleAdd} />
      </Card>
    </>
  )
}

export default AddProject