import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Label, Dropdown, Badge } from "flowbite-react";
import TextEditor from "../components/TextEditor";
import UploadMedia from "./UploadMedia";
import { useNavigate } from 'react-router-dom';

/**
 * Generic Dynamic Form Component
 * @param {Object} initialValues - Starting values for the form
 * @param {Object} schema - Zod schema for validation
 * @param {Array} fields - Array of field configurations
 * @param {Function} onSubmit - Callback for form submission
 * @param {String} submitLabel - Text for the submit button
 */
export default function DynamicForm({ 
  initialValues, 
  schema, 
  fields, 
  onSubmit, 
  submitLabel = "Save Changes",
  isEditing = false
}) {
  const navigate = useNavigate();

  const handleCancel = () => navigate(-1);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validate={(values) => {
        if (!schema) return {};
        try {
          schema.parse(values);
          return {};
        } catch (error) {
          return error.flatten().fieldErrors;
        }
      }}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fields.map((field, idx) => {
            const isFullWidth = field.fullWidth || field.type === 'rich-text' || field.type === 'media';
            const error = touched[field.name] && errors[field.name];

            return (
              <div key={idx} className={`${isFullWidth ? 'md:col-span-2' : ''} space-y-2`}>
                <Label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </Label>

                {/* Text / Number / Email */}
                {(field.type === 'text' || field.type === 'number' || field.type === 'email' || field.type === 'tel') && (
                  <Field
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    className={`w-full rounded-xl border ${error ? 'border-red-500' : 'border-gray-200'} bg-white dark:bg-gray-900/50 px-4 py-3 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-900 transition shadow-sm font-medium`}
                  />
                )}

                {/* Select */}
                {field.type === 'select' && (
                  <Field
                    name={field.name}
                    as="select"
                    className={`w-full rounded-xl border ${error ? 'border-red-500' : 'border-gray-200'} bg-white dark:bg-gray-900/50 px-4 py-3 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm font-medium`}
                  >
                    {field.options.map((opt, oIdx) => (
                      <option key={oIdx} value={opt.value || opt}>{opt.label || opt}</option>
                    ))}
                  </Field>
                )}

                {/* Multi-Select Dropdown (for Relations) */}
                {field.type === 'multi-select' && (
                  <div className="p-4 bg-gray-50/50 dark:bg-gray-950/20 border border-gray-100 dark:border-gray-800 rounded-3xl transition-all hover:bg-white dark:hover:bg-gray-900 shadow-sm">
                    <Dropdown
                      label={
                        <span className="font-bold flex items-center gap-2">
                          {values[field.name]?.length > 0 
                            ? `Selected (${values[field.name].length}) ${field.label}` 
                            : `Choose ${field.label}`}
                        </span>
                      }
                      dismissOnClick={false}
                      className="rounded-2xl border-0 shadow-xl dark:bg-gray-900"
                      inline
                    >
                      <div className="p-3 max-h-64 overflow-y-auto w-72 space-y-1">
                        {field.options.map((opt, oIdx) => (
                          <label key={oIdx} className="flex items-center gap-3 px-3 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl cursor-pointer transition-colors group">
                            <Field
                              type="checkbox"
                              name={field.name}
                              value={String(opt.value)}
                              className="w-5 h-5 text-blue-600 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500"
                            />
                            {opt.image && (
                              <img src={opt.image} alt={opt.label} className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm" />
                            )}
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </Dropdown>
                  </div>
                )}

                {/* Checkbox Group (Inline) */}
                {field.type === 'checkbox-group' && (
                  <div className="flex flex-wrap gap-4 py-2">
                    {field.options.map((opt, oIdx) => (
                      <label key={oIdx} className="flex items-center gap-2 cursor-pointer group">
                        <Field
                          type="checkbox"
                          name={field.name}
                          value={opt.value || opt}
                          className="w-5 h-5 text-blue-600 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 shadow-sm"
                        />
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors">
                          {opt.label || opt}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Rich Text Editor */}
                {field.type === 'rich-text' && (
                  <div className="rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                    <TextEditor content={values[field.name]} form={{ setFieldValue }} />
                  </div>
                )}

                {/* Media Upload */}
                {field.type === 'media' && (
                  <div className="bg-gray-50/50 dark:bg-gray-800/20 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 transition-all hover:shadow-lg group">
                    <div className="mb-6">
                      <h4 className="text-lg font-black text-gray-900 dark:text-gray-100 italic tracking-tight">{field.label} Assets</h4>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Unified visual story management</p>
                    </div>
                    <UploadMedia form={{ setFieldValue }} mediaObjects={initialValues.mediaObjects} />
                  </div>
                )}

                {error && <p className="text-[11px] font-black text-red-500 uppercase tracking-widest mt-1 ml-2">{error}</p>}
              </div>
            );
          })}

          {/* Form Actions */}
          <div className="md:col-span-2 flex flex-col md:flex-row justify-center gap-4 pt-10 border-t border-gray-50 dark:border-gray-800 mt-6">
            <Button
              onClick={handleCancel}
              type="button"
              className="px-8 py-2.5 rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 font-bold hover:bg-gray-50 transition-all shadow-sm order-2 md:order-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-10 py-2.5 rounded-2xl bg-blue-600 text-white font-black hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-500/20 order-1 md:order-2"
            >
              {submitLabel}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
