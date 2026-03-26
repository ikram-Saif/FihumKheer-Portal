import { z } from "zod";

export const volunteerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  whatsapp: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  age: z.coerce.number().min(1, "Age is required"),
  gender: z.enum(["Male", "Female"]),
  current_job: z.string().optional(),
  office: z.string().optional(),
  skills: z.string().optional(),
  volunteer_type: z.enum(["Permanent Volunteer", "Per-Project"]),
  available_days: z.array(z.string()).default([]),
  working_type: z.enum(["online", "onsite", "both"]),
  working_field: z.string().optional(),
  // Relations: Strapi expects an array of IDs
  projects: z.array(z.string().or(z.number())).default([]),
  existingMediaIds: z.array(z.number()).default([]),
  newMedia: z.array(z.any()).default([]),
});

export const mapToStrapi = (values) => {
  const cleanData = volunteerSchema.parse(values);

  return {
    name: cleanData.name,
    phone: cleanData.phone,
    whatsapp: cleanData.whatsapp,
    email: cleanData.email,
    country: cleanData.country,
    city: cleanData.city,
    age: cleanData.age,
    gender: cleanData.gender,
    current_job: cleanData.current_job,
    office: cleanData.office,
    skills: cleanData.skills,
    volunteer_type: cleanData.volunteer_type,
    available_days: cleanData.available_days.join(","),
    working_type: cleanData.working_type,
    working_field: cleanData.working_field,
    image: cleanData.existingMediaIds || [],
    projects: values.projects ? values.projects.map(Number) : [],
  };
};

export const mapFromStrapi = (strapiData) => {
  const item = strapiData;

  return {
    name: item?.name || "",
    phone: item?.phone || "",
    whatsapp: item?.whatsapp || "",
    email: item?.email || "",
    country: item?.country || "",
    city: item?.city || "",
    age: item?.age || "",
    gender: item?.gender || "Male",
    current_job: item?.current_job || "",
    office: item?.office || "",
    skills: item?.skills || "",
    volunteer_type: item?.volunteer_type || "Permanent Volunteer",
    available_days: item?.available_days ? item.available_days.split(",") : [],
    working_type: item?.working_type || "onsite",
    working_field: item?.working_field || "",
    existingMediaIds: item?.image ? item.image.map((m) => m.id) : [],
    newMedia: [],
    mediaObjects: item?.image || [],
    projects: item?.projects ? item.projects.map((p) => String(p.id)) : [],
  };
};
