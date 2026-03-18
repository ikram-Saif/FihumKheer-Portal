import React, { useEffect, useState } from 'react';
import TextEditor from "../components/TextEditor";
import { Button, Checkbox, Label, Dropdown } from "flowbite-react";
import { Form, Field, Formik, ErrorMessage } from 'formik';

import { useVolunteersStore } from '../store/volunteersStor';
import { useDomainStore } from '../store/domainStore';
import { projectSchema, mapToStrapi, mapFromStrapi } from '../schemas/projectSchema';
import UploadMedia from './UploadMedia';
import { useNavigate } from 'react-router-dom';

export default function ProjectForm({ project, action }) {

  console.log("Rendering ProjectForm with project:", project); // Debugging log to see what data is being passed to ProjectForm
  const { volunteers, fetchAllVolunteers } = useVolunteersStore();
  const { domains, fetchAllDomains } = useDomainStore();
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (volunteers.length === 0) fetchAllVolunteers();
    if (domains.length === 0) fetchAllDomains();
  }, []);

  const projectVol = project?.volunteers?.map((vol) => String(vol.id)) || []
  
  if (volunteers.length === 0) {
      console.log("DEBUG: Volunteers list empty, attempting to fetch...");
  }


  const handleCancel = () => {
    // This mimics the browser "Back" button
    navigate(-1);
  };

  const handleAction = (values) => {
    const formData = new FormData();

    // Find Domain ID from the Name string (because the Select uses names)
    if (values.domain && domains.length > 0) {
      const selectedDomain = domains.find(d => 
        d.domain_name === values.domain || d.name === values.domain
      );
      if (selectedDomain) {
        values.domain = selectedDomain.id;
      }
    }

    // 1. Use your mapper! (This removes newMedia and cleans the names)
    const strapiData = mapToStrapi(values);

    // 2. Append to "data" key as a STRING
    // This is where the 400 error usually happens if skipped
    formData.append("data", JSON.stringify(strapiData));

    // 3. Handle the files separately (since they can't be stringified)
    if (values.newMedia && values.newMedia.length > 0) {
      values.newMedia.forEach((item) => {
        const fileBlob = item.file || item;
        if (fileBlob instanceof File || fileBlob instanceof Blob) {
          formData.append("files.media", fileBlob);
        }
      });
    }

    action(formData);
  };
  return (
    <>
      <Formik
        initialValues={mapFromStrapi(project)}
        enableReinitialize={true}
        // Use Zod for validation instead of Yup
        validate={(values) => {
          try {
            projectSchema.parse(values);
          } catch (error) {
            // Formik expects an object where keys are field names and values are error messages
            return error.flatten().fieldErrors;
          }
        }}
        onSubmit={handleAction}>
        {({ setFieldValue }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project Name */}
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-700">Project Name</Label>
              <Field
                name="name"
                type="text"
                placeholder="Project name..."
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Project Type */}
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-700">Project Type</Label>
              <Field
                name="type"
                type="text"
                placeholder="e.g. Web, Mobile, Charity..."
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Domain */}
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-700">Project Domain</Label>
              <Field
                name="domain"
                as="select"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                {domains.map((d, index) => (
                  <option key={index}>{d.domain_name || d.name}</option>
                ))}

              </Field >
            </div>

            {/* Status */}
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-700">Project Status</Label>
              <Field
                as="select"
                name="status"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >

                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="InProgress">In Progress</option>
              </Field >
            </div>

            {/* Goals + Raised Combined */}
            <div className="md:col-span-1 grid grid-cols-2 gap-4">
              <div>
                <Label className="block mb-2 text-sm font-medium text-gray-700">Project Goals</Label>
                <Field
                  name="goals"
                  type="number"
                  placeholder="Target amount..."
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div>
                <Label className="block mb-2 text-sm font-medium text-gray-700">Raised Amount</Label>
                <Field
                  name="raised"
                  type="number"
                  placeholder="Raised so far..."
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Progress */}
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-700">Project Progress (%)</Label>
              <Field
                name="progress"
                type="number"
                placeholder="0 - 100"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Media */}
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-700">Project Media</Label>

              <UploadMedia
                // We "inject" the helpers manually here
                form={{ setFieldValue }}
                mediaObjects={project?.media}
              />

            </div>

            {/* Volunteers */}
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-700">Assign Volunteers</Label>
              <Dropdown
                label={
                  projectVol.length > 0
                    ? `Selected (${projectVol.length}) Volunteers`
                    : "Choose volunteers"
                }
                dismissOnClick={false}
                className="w-fit rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition hover:bg-white"
              >
                <div className="p-2">
                  {volunteers.map((vol, index) => {
                    const imageUrl = vol.image?.[0]?.url
                      ? `http://localhost:1337${vol.image[0].url}`
                      : "/placeholder.png";
                    return (
                      <label
                        key={index}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
                      >
                        <Field
                          type="checkbox"
                          name="volunteers"
                          value={String(vol.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <img
                          src={imageUrl}
                          alt={vol.name}
                          className="w-8 h-8 rounded-full border object-cover shadow-sm"
                        />
                        <span className="text-sm font-medium text-gray-700">{vol.name}</span>
                      </label>
                    );
                  })}
                </div>
              </Dropdown>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <Label className="block mb-2 text-sm font-medium text-gray-700">Project Description</Label>

              <TextEditor content={project?.description} form={{ setFieldValue }} />
            </div>

            {/* Actions */}
            <div className="md:col-span-2 flex justify-center gap-4 pt-6">
              <Button
                onClick={handleCancel}
                type="button"
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Save Changes
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
