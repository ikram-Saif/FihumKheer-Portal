import Swal from "sweetalert2";
import { apiService } from "../services/api";


export const deleteItem = async (id, resource, token, refresh) => {
  const result = await Swal.fire({
    title: "Are you sure you want to delete this?",
    text: "You cannot undo this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      try {
        await apiService(resource).delete(id, {}, token);
        return true;
      } catch (error) {
        Swal.showValidationMessage(`Request failed: ${error.message || error}`);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });

  if (result.isConfirmed) {
    Swal.fire("Deleted!", "Item has been deleted.", "success");
    if (refresh) refresh();
  }
};