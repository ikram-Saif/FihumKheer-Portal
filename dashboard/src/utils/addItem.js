// editItem.js
import Swal from "sweetalert2";
import { apiService } from "../services/api";

// 'onSuccess' callback handles redirection or state refresh
export const addItem = async (data, resource, token, onSuccess) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, add it!",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      try {
        await apiService(resource).create(data, {}, token);
        return true;
      } catch (error) {
        Swal.showValidationMessage(`Request failed: ${error.message || error}`);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });

  if (result.isConfirmed) {
    // Wait for user to close the Success modal before redirecting
    await Swal.fire("Success!", "Item added.", "success");

    if (onSuccess) onSuccess();
  }
};