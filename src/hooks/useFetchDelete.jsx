import axios from 'axios';

export const useFetchDelete = (id) => {

  const deleteEmployee = () => {
    axios.delete(`http://localhost:3005/employees/${id}`)
  };

  const deleteUser = () => {
    axios.delete(`http://localhost:3005/users/${id}`)
  };

  const deleteArea = () => {
    axios.delete(`http://localhost:3005/areas/${id}`)
  };

  return { deleteEmployee, deleteUser, deleteArea };
};
