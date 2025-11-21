import React, { useContext, useState } from "react";
import { Button, Modal, Switch } from "@mui/material";
import { useFetchPost } from "../hooks/useFetchPost";
import { EmployeeContext } from "../context/EmployeeContext";

export const NewForm = () => {
  const { onChangeEmployee, onChangeUser, employee, user } = useFetchPost();
  const { employeeSubmitPost, userSubmitPost, fetchGet } = useContext(EmployeeContext);

  const globalSubmit = async (e) => {
    e.preventDefault();
    await employeeSubmitPost(employee);
    await userSubmitPost(user);
    await fetchGet();
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSwitch = () => {
    setChecked((prev) => !prev);
    onChangeEmployee({ target: { name: "empSystemAccess", value: !checked } });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: "10px",
        }}
      >
        <button className="btn btn-outline-primary" onClick={handleOpen}>
          Agregar
        </button>
      </div>

      <Modal open={open} onClose={handleOpen}>
        <div className="divNewForm">
          <form onSubmit={globalSubmit}>
            <h3 id="modal-title">Agregar Empleado</h3>
            <div>
              <input
                type="text"
                id="empName"
                name="empName"
                value={employee.empName}
                onChange={onChangeEmployee}
                placeholder="Nombre"
              />
              <input
                type="text"
                id="empFirstName"
                name="empFirstName"
                value={employee.empFirstName}
                onChange={onChangeEmployee}
                placeholder="Apellido Paterno"
              />
              <input
                type="text"
                id="empLastName"
                name="empLastName"
                value={employee.empLastName}
                onChange={onChangeEmployee}
                placeholder="Apellido Materno"
              />
            </div>
            <label htmlFor="Switch" className="form-label mb-0">
              ¿Acceso al Sistema?
            </label>
            <span> NO</span>
            <Switch
              id="Switch"
              checked={checked}
              onChange={handleSwitch}
              inputProps={{ "aria-label": "controlled" }}
            />
            <span>SI</span>
            {checked && (
              <div>
                <input
                  type="text"
                  id="usrName"
                  name="usrName"
                  value={user.usrName}
                  onChange={onChangeUser}
                  placeholder="Nombre de Usuario"
                />
                <input
                  type="email"
                  autoComplete="email"
                  id="usrEmail"
                  name="usrEmail"
                  value={user.usrEmail}
                  onChange={onChangeUser}
                  placeholder="Email"
                />
                <input
                  type="password"
                  autoComplete="current-password"
                  id="usrPassword"
                  name="usrPassword"
                  value={user.usrPassword}
                  onChange={onChangeUser}
                  placeholder="Contraseña"
                />
              </div>
            )}

            <div>
              <Button onClick={handleOpen}>Cancelar</Button>
              <Button variant="contained" type="submit">
                Guardar
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
