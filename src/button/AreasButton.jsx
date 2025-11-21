import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import {IconButton,Modal,Table,TableBody,TableCell,TableContainer,TableRow,Paper,Button} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { api } from "../config/api";
import { EmployeeContext } from "../context/EmployeeContext";

export const AreasButton = ({ employee }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const tableData = [
    { id: "1", joaName: "Area 1", joaAbbreviation: "A1" },
    { id: "2", joaName: "Area 2", joaAbbreviation: "A2" },
    { id: "3", joaName: "Area 3", joaAbbreviation: "A3" },
    { id: "4", joaName: "Area 4", joaAbbreviation: "A4" },
  ];
  
  console.log(tableData);

  const handleRowSelect = (rowId) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const isRowSelected = (rowId) => {
    return selectedRows.includes(rowId);
  };

  const { fetchGet } = useContext(EmployeeContext);

  const editArea = async () => {
    const selectedAreas = selectedRows.map((rowId) => {
      const area = tableData.find((row) => row.id === rowId);
      console.log(area);
      return { ...area };
    });
    await api.put(`/areas/${employee.id}`, selectedAreas);
    await fetchGet();
    setToggle(false);
  };

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <IconButton onClick={handleToggle}>
        <AccountTreeOutlinedIcon
          style={{ fontSize: "1.7rem", color: "black" }}
        />
      </IconButton>
      <Modal open={toggle} onClose={handleToggle}>
        <div className="AreasButton">
          <h2>Areas Asociadas</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.joaName}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleRowSelect(row.id)}>
                        {isRowSelected(row.id) ? (
                          <CheckBoxIcon />
                        ) : (
                          <CheckBoxOutlineBlankIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            <Button onClick={handleToggle}>Cancelar</Button>
            <Button variant="contained" type="button" onClick={editArea}>
              Guardar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
