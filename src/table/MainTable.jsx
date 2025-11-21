import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ViewButton } from "../button/ViewButton";
import { EditButton } from "../button/EditButton";
import { NewForm } from "../Form/NewForm";
import { DeleteButton } from "../button/DeleteButton";
import { EmployeeContext } from "../context/EmployeeContext";

export const MainTable = () => {
  const { employees } = useContext(EmployeeContext);

  return (
    <div className="tableContainer">
      <h1>Empleados</h1>
      <NewForm />
      <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
        <Table sx={{ minWidth: 650, borderRadius: "10px" }}>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ fontSize: "23px", border: "1px solid #708090" }}
              >
                Nombre
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "23px", border: "1px solid #708090" }}
              >
                Apellido Paterno
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "23px", border: "1px solid #708090" }}
              >
                Apellido Materno
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "23px", border: "1px solid #708090" }}
              >
                Ver
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "23px", border: "1px solid #708090" }}
              >
                Editar
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "23px", border: "1px solid #708090" }}
              >
                Eliminar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees && employees.length > 0 ? (
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontSize: "20px", border: "1px solid #708090" }}
                  >
                    {employee.empName}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "20px", border: "1px solid #708090" }}
                  >
                    {employee.empFirstName}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "20px", border: "1px solid #708090" }}
                  >
                    {employee.empLastName}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "20px", border: "1px solid #708090" }}
                  >
                    <ViewButton employee={employee} />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "20px", border: "1px solid #708090" }}
                  >
                    <EditButton employee={employee} />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "20px", border: "1px solid #708090" }}
                  >
                    <DeleteButton employee={employee} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ fontSize: "20px", padding: "20px" }}>
                  No hay empleados registrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
