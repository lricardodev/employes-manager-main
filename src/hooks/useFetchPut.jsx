import { useEffect, useState } from "react";
import { api, API_BASE_URL, IS_MOCK_MODE } from "../config/api";
import { mockApi } from "../services/mockApi";

export const useFetchPut = (employee) => {
  // * Employee
  const [formData, setFormData] = useState(employee);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitEmployee = () => {
    api
      .put(`/employees/${employee.id}`, formData)
      .then((resp) => resp.data);
  };

  // * User
  const [formUser, setFormUser] = useState({
    usrName: "",
    usrEmail: "",
    usrPassword: "",
  });

  const onChangeUser = (e) => {
    const { name, value } = e.target;
    setFormUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitUser = () => {
    api
      .put(`/users/${employee.id}`, formUser)
      .then((resp) => resp.data);
  };

  //* getUser
  const getUser = async () => {
    try {
      if (IS_MOCK_MODE) {
        // Usar mock API
        const response = await mockApi.get(`/users/${employee.id}`);
        setFormUser(response.data);
      } else {
        // Usar fetch normal
        const response = await fetch(`${API_BASE_URL}/users/${employee.id}`);
        const data = await response.json();
        setFormUser(data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  

  useEffect(() => {
    // console.log(employee)
    if( employee.id !== undefined) {
      getUser();
    }
  }, []);

  // *Checked
  const [checked, setChecked] = useState(employee.empSystemAccess || false);

  const handleCheck = () => {
    const updatedChecked = !checked;
    setChecked(updatedChecked);
    handleChange({
      target: { name: "empSystemAccess", value: updatedChecked },
    });
  };

  return {
    handleChange,
    submitEmployee,
    formData,
    onChangeUser,
    submitUser,
    formUser,
    setFormUser,
    checked,
    handleCheck,
  };
};
