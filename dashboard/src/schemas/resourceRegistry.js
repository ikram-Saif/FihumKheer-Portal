import { projectSchema, mapFromStrapi as mapProjectFromStrapi, mapToStrapi as mapProjectToStrapi } from './projectSchema';
import { volunteerSchema, mapFromStrapi as mapVolunteerFromStrapi, mapToStrapi as mapVolunteerToStrapi } from './volunteerSchema';
import { projectsService, volunteerService, eventService, domainsServise, userService } from '../services/resources';
import * as z from 'zod';

// Basic fallbacks for resources without dedicated schemas yet
const genericSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
const genericMapperFrom = (data) => ({ name: data?.name || "", ...data });
const genericMapperTo = (values) => values;

export const resourceRegistry = {
  projects: {
    schema: projectSchema,
    mapperFrom: mapProjectFromStrapi,
    mapperTo: mapProjectToStrapi,
    service: projectsService,
    title: "Project",
    mediaField: "files.media",
    populate: {
      "populate[0]": "volunteers.image",
      "populate[1]": "project_domain",
      "populate[2]": "media"
    }
  },
  volunteers: {
    schema: volunteerSchema,
    mapperFrom: mapVolunteerFromStrapi,
    mapperTo: mapVolunteerToStrapi,
    service: volunteerService,
    title: "Volunteer",
    mediaField: "files.image",
    populate: { "populate": "*" }
  },
  events: {
    schema: genericSchema,
    mapperFrom: genericMapperFrom,
    mapperTo: genericMapperTo,
    service: eventService,
    title: "Event",
    mediaField: "files.media",
    populate: { "populate": "*" }
  },
  domains: {
    schema: genericSchema,
    mapperFrom: genericMapperFrom,
    mapperTo: genericMapperTo,
    service: domainsServise,
    title: "Domain",
    mediaField: "files.media",
    populate: { "populate": "*" }
  },
  users: {
    schema: genericSchema,
    mapperFrom: genericMapperFrom,
    mapperTo: genericMapperTo,
    service: userService,
    title: "User",
    mediaField: "files.media",
    populate: { "populate": "*" }
  }
};

export const getResourceConfig = (resource) => {
  return resourceRegistry[resource] || {
    schema: genericSchema,
    mapperFrom: genericMapperFrom,
    mapperTo: genericMapperTo,
    service: null,
    title: resource,
    mediaField: "files.media",
    populate: { "populate": "*" }
  };
};
