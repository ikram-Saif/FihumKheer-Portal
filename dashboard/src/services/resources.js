import { apiService } from "./api";

// Each resource can now be used with CRUD functions
export const projectsService = apiService("projects");
export const eventService = apiService("events");
export const volunteerService = apiService("volunteers");
export const domainsServise = apiService("domains");
export const userService = apiService("users");
