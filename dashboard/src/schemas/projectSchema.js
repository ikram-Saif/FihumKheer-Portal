import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  status: z.enum(["InProgress", "pending", "completed"]), // Match your GET response
  goals: z.coerce.number(),
  raised: z.coerce.number(),
  progress: z.coerce.number().min(0).max(100),
  quantity: z.coerce.number().min(0).optional(),
  // Description in Strapi Blocks is an array of objects
  description: z.array(z.any()).optional(),
  domain: z.union([z.string(), z.number()]).optional(), // Select value (name or ID)
  volunteers: z.array(z.string()).optional(), // Checkbox values (IDs as strings)
  existingMediaIds: z.array(z.number()).default([]),
  newMedia: z.array(z.any()).default([]),
});

export const mapToStrapi = (values) => {
  const cleanData = projectSchema.parse(values);

  // Return ONLY the fields that exist in Strapi's Content-Type
  return {
    name: cleanData.name,
    type: cleanData.type,
    project_status: cleanData.status,
    project_goals: cleanData.goals,
    project_raised: cleanData.raised,
    progress: cleanData.progress,
    quantity: cleanData.quantity,
    description: cleanData.description,
    media: cleanData.existingMediaIds, // Existing IDs [8, 7...]

    // Domain comes in as a string name from the <select>, we need to send the ID if possible, 
    // BUT since we don't have access to the store here easily, and your form maps names, 
    // you might need to handle this in ProjectForm.jsx before calling mapToStrapi.
    // For now, I'll assume we pass it through, but check your Form submission logic!
    domain: values.domain,
    volunteers: values.volunteers, // Array of IDs
  };
};

/**
 * UPDATED: Map FROM Strapi to Formik
 * Use this to fill your 'initialValues'
 */
export const mapFromStrapi = (strapiData) => {
  // Note: Your GET response shows data directly inside "data", 
  // not "data.attributes" (this happens in Strapi v5)
  const item = strapiData;

  return {
    name: item?.name || "",
    type: item?.type || "",
    status: item?.project_status || "pending",
    goals: item?.project_goals || 0,
    raised: item?.project_raised || 0,
    progress: item?.progress || 0,
    description: item?.description || [],
    existingMediaIds: item?.media ? item.media.map((m) => m.id) : [],
    newMedia: [],
    // We pass the full media objects only for FilePond to show previews
    mediaObjects: item?.media || [],
    domain: item?.domain?.domain_name || "",
  };
};