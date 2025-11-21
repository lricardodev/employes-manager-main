import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { UserTable } from "./UserTable";
import { useContext } from "react";
import { EmployeeContext } from "../../context/EmployeeContext";
import { useEffect } from "react";

export const TableCard = ({employee}) => {
  const {fetchGetId} = useContext(EmployeeContext);
  useEffect(() => {
    fetchGetId(employee.id)
  }, []);
  // console.log(employee)
  return (
    
    <div className="tableCard">
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <h4>Detalle del Empleado</h4>
        <Table>
          <TableBody>
            <TableRow className="rowSeparation">
              <TableCell  id="tcName">Nombre</TableCell>
              <TableCell id="tcEmpName">{employee.empName}</TableCell>
            </TableRow>
            <TableRow className="rowSeparation">
              <TableCell id="tcFirstName">Apellido paterno</TableCell>
              <TableCell id="tcEmpFirstName">{employee.empFirstName}</TableCell>
            </TableRow>
            <TableRow className="rowSeparation">
              <TableCell id="tcLastName">Apellido materno</TableCell>
              <TableCell id="tcEmpLastName">{employee.empLastName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: "15px" }}>¿Acceso al Sistema?</TableCell>
              <TableCell>{employee.empSystemAccess ? "SI" : "NO"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {employee.empSystemAccess && <UserTable employee={employee}/>}
    </div>
      
  );
};
