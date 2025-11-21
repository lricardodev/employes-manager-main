import { api } from '../config/api';

export const useFetchDelete = (id) => {

  const deleteEmployee = async () => {
    try {
      await api.delete(`/employees/${id}`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting employee:', error);
      return { success: false, error };
    }
  };

  const deleteUser = async () => {
    try {
      await api.delete(`/users/${id}`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { success: false, error };
    }
  };

  const deleteArea = async () => {
    try {
      await api.delete(`/areas/${id}`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting area:', error);
      return { success: false, error };
    }
  };

  return { deleteEmployee, deleteUser, deleteArea };
};
