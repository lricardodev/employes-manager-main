import {
  POST_AREA,
  POST_EMPLOYEE,
  POST_USER,
  PUT_EMPLOYEE,
  PUT_USER,
  SET_AREA,
  SET_EMPLOYEES,
  SET_USER,
  DELETE_EMPLOYEE,
} from "./types";

export const reductor = (state, action) => {
  switch (action.type) {
    case POST_EMPLOYEE:
      return {
        ...state,
        employee: action.payload,
        employees: [...state.employees, action.payload],
      };

    case POST_USER:
      return { ...state, user: action.payload };

    case POST_AREA:
      return { ...state, area: action.payload };

    case SET_EMPLOYEES:
      return { ...state, employees: action.payload };

    case SET_USER:
      return {
        ...state,
        userGet: action.payload,
      };

    case SET_AREA:
      return { ...state, areaGet: action.payload };

    case PUT_EMPLOYEE:
      const employeesCopy = [...state.employees];
      const index = employeesCopy.findIndex(
        (employee) => employee.id === action.payload.id
      );
      if (index !== -1) {
        employeesCopy[index] = action.payload;
      }
      // console.log("indexEmployee", index);
      // console.log(...state.employees);
      return { ...state, employees: employeesCopy };

    case PUT_USER:
      const userCopy = Array.isArray(state.userGet) ? [...state.userGet] : [];
      const indexUser = userCopy.findIndex(
        (user) => user.id === action.payload.id
      );
      if (indexUser !== -1) {
        userCopy[indexUser] = action.payload;
      }
      // console.log("user", indexUser);
      // console.log(...userCopy);
      return { ...state, userGet: userCopy };

    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: Array.isArray(state.employees)
          ? state.employees.filter(
              (employee) => employee.id !== action.payload
            )
          : [],
      };

    default:
      return state;
  }
};