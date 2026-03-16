import axios from "axios";

const API_BASE = "http://localhost:1337/api";

const axiosInstance = axios.create({
  baseURL: API_BASE,
});

// --- Helpers ---

/**
 * Returns Authorization headers if token exists.
 */
const getHeaders = (token) => ({
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

/**
 * Uploads multiple files to /api/upload.
 * Returns an array of uploaded file objects.
 */
const uploadFiles = async (files, token) => {
  if (!files?.length) return [];

  const uploadForm = new FormData();
  files.forEach((file) => uploadForm.append("files", file));

  try {
    const { data } = await axiosInstance.post("/upload", uploadForm, {
      headers: {
        ...getHeaders(token),
        "Content-Type": undefined, // Let browser handle boundary
      },
    });

    return data;
  } catch (err) {
    console.error("Batch upload failed:", err);
    throw err;
  }
};

/**
 * Processes FormData input.
 * 1. Extracts "data" JSON.
 * 2. Extracts Files.
 * 3. Uploads files to Strapi.
 * 4. Merges new file IDs into the JSON data.
 */
const handleFormData = async (payload, token) => {
  if (!(payload instanceof FormData)) return payload;

  const jsonStr = payload.get("data");
  if (!jsonStr) throw new Error("FormData is missing 'data' JSON string");

  const parsedData = JSON.parse(jsonStr);

  // Extract files from FormData
  const filesToUpload = [];
  for (const value of payload.values()) {
    if (value instanceof File) {
      filesToUpload.push(value);
    }
  }

  // Upload and merge IDs
  if (filesToUpload.length > 0) {
    const uploadedFiles = await uploadFiles(filesToUpload, token);

    // Safety check: ensure we have an array before mapping
    const fileList = Array.isArray(uploadedFiles) ? uploadedFiles : [];
    const newIds = fileList.map((f) => f.id);

    // Ensure media array exists and append new IDs
    parsedData.media = [...(parsedData.media || []), ...newIds];
  }

  return parsedData;
};

// --- Main Service ---

export const apiService = (resource) => ({
  getAll: async (params = {}, token) => {
    const { data } = await axiosInstance.get(`/${resource}`, {
      params,
      headers: getHeaders(token),
    });
    return data; // Strapi standard: { data: [...], meta: ... }
  },

  getById: async (id, params = {}, token) => {
    const { data } = await axiosInstance.get(`/${resource}/${id}`, {
      params,
      headers: getHeaders(token),
    });
    return data;
  },

  create: async (payload, params = {}, token) => {
    const finalData = await handleFormData(payload, token);
    const { data } = await axiosInstance.post(`/${resource}`, { data: finalData }, {
      params,
      headers: {
        ...getHeaders(token),
        "Content-Type": "application/json",
      },
    });
    return data;
  },

  update: async (id, payload, params = {}, token) => {
    const finalData = await handleFormData(payload, token);
    const { data } = await axiosInstance.put(`/${resource}/${id}`, { data: finalData }, {
      params,
      headers: {
        ...getHeaders(token),
        "Content-Type": "application/json",
      },
    });
    return data;
  },

  delete: async (id, params = {}, token) => {
    const { data } = await axiosInstance.delete(`/${resource}/${id}`, {
      params,
      headers: getHeaders(token),
    });
    return data;
  },
});
