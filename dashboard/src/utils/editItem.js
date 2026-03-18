// editItem.js
import Swal from "sweetalert2";
import { apiService } from "../services/api";

// 'refresh' acts as the onSuccess callback here
export const editItem = async (id, data, resource, token, onSuccess) => {
  console.log(id, "id from edit item")

  const result = await Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, edit it!",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      try {
        await apiService(resource).update(id, data, {}, token);
        return true;
      } catch (error) {
        console.error("DEBUG: Edit error detail:", error.response?.data || error);
        const serverError = error.response?.data?.error?.message || error.message || error;
        Swal.showValidationMessage(`Request failed: ${serverError}`);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });

  if (result.isConfirmed) {
    // Wait for user to close the Success modal before proceeding
    await Swal.fire("Success!", "Item updated.", "success");

    if (onSuccess) onSuccess();
  }
};