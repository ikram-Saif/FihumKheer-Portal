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
  urgent_need: z.array(z.string()).default([])
});

export const mapToStrapi = (values) => {
  const cleanData = projectSchema.parse(values);

  // Return ONLY the fields that exist in Strapi's Content-Type
  return {
    name: cleanData.name,
    type: cleanData.type,
    // Handle the specific backend typo for "pending "
    project_status: cleanData.status,
    project_goals: cleanData.goals,
    project_raised: cleanData.raised,
    progress: cleanData.progress,
    quantity: cleanData.quantity,
    description: cleanData.description,
    media: cleanData.existingMediaIds || [],
    // Domain comes in as a string name from the <select>, we need to send the ID if possible, 
    // BUT since we don't have access to the store here easily, and your form maps names, 
    // you might need to handle this in ProjectForm.jsx before calling mapToStrapi.
    // For now, I'll assume we pass it through, but check your Form submission logic!
    project_domain: values.domain ? Number(values.domain) : null,
    volunteers: values.volunteers ? values.volunteers.map(Number) : [], // Array of IDs as numbers
    urgent_need: cleanData.urgent_need.join(","), // Save as comma-separated if Strapi field is string, or just cleanData.urgent_need if JSON
  };
};

/**
 * UPDATED: Map FROM Strapi to Formik
 * Use this to fill your 'initialValues'
 */
export const mapFromStrapi = (strapiData) => {
  const item = strapiData;

  // Handle urgent_need which might come as a string ("donors,volunteers") or an array
  let urgentNeedArray = [];
  if (item?.urgent_need) {
    if (Array.isArray(item.urgent_need)) {
      urgentNeedArray = item.urgent_need;
    } else if (typeof item.urgent_need === 'string') {
      urgentNeedArray = item.urgent_need.split(',').filter(Boolean);
    }
  }

  return {
    name: item?.name || "",
    type: item?.type || "",
    status: item?.project_status?.trim() || "pending",
    goals: item?.project_goals || 0,
    raised: item?.project_raised || 0,
    progress: item?.progress || 0,
    description: item?.description || [],
    existingMediaIds: item?.media ? item.media.map((m) => m.id) : [],
    newMedia: [],
    mediaObjects: item?.media || [],
    domain: item?.project_domain?.domain_name || item?.project_domain?.name || "",
    volunteers: item?.volunteers ? item.volunteers.map((v) => String(v.id)) : [],
    urgent_need: urgentNeedArray
  };
};