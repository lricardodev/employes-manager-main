import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { EditButton } from "../../button/EditButton";
import { api } from "../../config/api";
import { NewButtonAreas } from "../../button/NewButtonAreas";
import { EmployeeContext } from "../../context/EmployeeContext";

export const UserTable = ({ employee }) => {
  const { userGet , areaGet } = useContext(EmployeeContext);
  const [areaData, setAreaData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await api.get("/areas");
      setAreaData(data);
    } catch (error) {
      console.error("Error fetching areas data", error);
    }
  };

  const getAreaDetails = (areasId) => {
    if (!Array.isArray(areasId)) return [];
    return areasId.map((id) => areaData.find((area) => area.id === id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableContainer id="UserTable" component={Paper}>
      <Table>
        <TableHead>
          <TableRow className="rowSeparation">
            <TableCell id="tcButtonArea">
              <NewButtonAreas areaData={areaData} employee={employee} />
            </TableCell>
            <TableCell id="tcButtonEdit">
              <EditButton employee={employee} />
            </TableCell>
          </TableRow>
          <TableRow className="rowSeparation">
            <TableCell id="tc4h" colSpan={2}>
              <h4>Usuario</h4>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className="rowSeparation">
            <TableCell id="tcNameUser">Nombre</TableCell>
            <TableCell id="tcUsrName">{userGet.usrName}</TableCell>
          </TableRow>
          <TableRow className="rowSeparation">
            <TableCell id="tcCorreoUser">Correo</TableCell>
            <TableCell id="tcUsrCorreo">{userGet.usrEmail}</TableCell>
          </TableRow>
          <TableRow className="rowSeparation">
            <TableCell id="tcAreas">Áreas</TableCell>
            <TableCell id="tcUsrAreas">
              {getAreaDetails(userGet.usrAreas)
                .map((area) => area && `${area.joaName}`)
                .join(", ")}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
