import { useEffect, useReducer, useState } from "react";
import { api } from "../config/api";
import { EmployeeContext } from "./EmployeeContext";
import { POST_AREA, POST_EMPLOYEE, POST_USER, PUT_EMPLOYEE, PUT_USER, SET_AREA, SET_EMPLOYEES, SET_USER, DELETE_EMPLOYEE } from "./types";
import { useRandomId } from "../hooks/useRandomId";
import { reductor } from "./reducer";
import { initialState } from "./initialState";

export const EmployeeProvider = ({ children }) => {
  const { randomId } = useRandomId();
  const [state, dispatch] = useReducer(reductor, initialState(randomId));
  const [id, setId] = useState(null);

  const fetchGet = async () => {
    try {
      const employeesResponse = await api.get("/employees");
      const employeesData = employeesResponse.data;
      dispatch({ type: SET_EMPLOYEES, payload: employeesData });
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchGetId = async (id) => {
    try {
      const usersResponse = await api.get(`/users/${id}`);
      const usersData = usersResponse.data;
      dispatch({ type: SET_USER, payload: usersData });
    } catch (error) {
      console.error(`Error fetching user or area with id ${id}:`, error);
    }
  };

  const employeeSubmitPost = async (employee) => {
    try {
      const { data } = await api.post("/employees", employee);
      dispatch({ type: POST_EMPLOYEE, payload: data });
    } catch (error) {
      console.error("Error posting employee:", error);
    }
  };

  const userSubmitPost = async (user) => {
    try {
      const { data } = await api.post("/users", user);
      dispatch({ type: POST_USER, payload: data });
    } catch (error) {
      console.error("Error posting user:", error);
    }
  };

  const areaSubmitPost = async (area) => {
    try {
      const { data } = await api.post("/areas", area);
      dispatch({ type: POST_AREA, payload: data });
    } catch (error) {
      console.error("Error posting area:", error);
    }
  };

  const submitEmployee = async (id, formData) => {
    try {
      const { data } = await api.put(`/employees/${id}`, formData);
      dispatch({ type: PUT_EMPLOYEE, payload: data });
    } catch (error) {
      console.error(`Error updating employee with id ${id}:`, error);
    }
  };

  const submitUser = async (id, formUser) => {
    try {
      const { data } = await api.put(`/users/${id}`, formUser);
      dispatch({ type: PUT_USER, payload: data });
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
    }
  };

  const deleteEmployeeFromState = (id) => {
    dispatch({ type: DELETE_EMPLOYEE, payload: id });
  };

  useEffect(() => {
    fetchGet();
    if (id !== null) {
      fetchGetId(id);
    }
  }, [id]);

  const value = {
    ...state,
    fetchGetId,
    fetchGet,
    submitEmployee,
    submitUser,
    employeeSubmitPost,
    userSubmitPost,
    areaSubmitPost,
    deleteEmployeeFromState,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};
