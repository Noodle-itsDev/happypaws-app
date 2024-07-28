import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
  Typography,
  TablePagination,
} from "@mui/material";

// Definición de la interfaz para una notificación
interface Notificacion {
  fecha: string;
  descripcion: string;
  categoria: "adopciones" | "donaciones" | "voluntarios";
}

const queryResults: Notificacion[] = [
  {
    fecha: "2024-07-24",
    descripcion: "Nuevo perro disponible para adopción",
    categoria: "adopciones",
  },
  {
    fecha: "2024-07-23",
    descripcion: "Se necesita donación de alimentos",
    categoria: "donaciones",
  },
  {
    fecha: "2024-07-22",
    descripcion: "Voluntarios requeridos para evento de adopción",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-21",
    descripcion: "Adopción exitosa de tres gatos",
    categoria: "adopciones",
  },
  {
    fecha: "2024-07-20",
    descripcion: "Donación de suministros médicos recibida",
    categoria: "donaciones",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
  {
    fecha: "2024-07-19",
    descripcion: "Capacitación para nuevos voluntarios",
    categoria: "voluntarios",
  },
];

// Componente que renderiza la tabla con filtros
const NotificacionesTable: React.FC = () => {
  const [filtros, setFiltros] = useState({
    adopciones: true,
    donaciones: false,
    voluntarios: true,
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleCheckboxChange = (
    categoria: "adopciones" | "donaciones" | "voluntarios"
  ) => {
    setFiltros((prevState) => ({
      ...prevState,
      [categoria]: !prevState[categoria],
    }));
  };

  const filteredResults = queryResults.filter(
    (notificacion) => filtros[notificacion.categoria]
  );

  // Pagination logic
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedResults = filteredResults.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "90%", fontFamily: "Roboto", position: "relative" }}>
      <TableContainer
        component={Paper}
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "calc(90vh - 56px)",
          overflow: "auto",
          boxShadow: 5,
          borderRadius: 1,
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{
            backgroundColor: "#0499af",
            color: "white",
            position: "sticky",
            top: 0,
            height: "56px",
          }}>
            <TableRow>
              <TableCell sx={{ borderRight: "1px solid white" }}>
                Filtros
              </TableCell>
              <TableCell>Panel de notificaciones / Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  width: "30%",
                  backgroundColor: "#a0a0a045",
                  borderRight: "1px solid white",
                  padding: 2,
                  verticalAlign: "top",
                }}
              >
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filtros.adopciones}
                        onChange={() => handleCheckboxChange("adopciones")}
                      />
                    }
                    label="Adopciones"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filtros.donaciones}
                        onChange={() => handleCheckboxChange("donaciones")}
                      />
                    }
                    label="Donaciones"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filtros.voluntarios}
                        onChange={() => handleCheckboxChange("voluntarios")}
                      />
                    }
                    label="Voluntarios"
                  />
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  width: "70%",
                  backgroundColor: "#a0a0a045",
                }}
              >
                <Box>
                  {paginatedResults.map((notificacion, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {notificacion.fecha}
                      </Typography>
                      <Typography variant="body2">
                        {notificacion.descripcion}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter
            sx={{
              backgroundColor: "#0499af",
              color: "white",
              position: "sticky",
              bottom: 0,
              height: "56px",
            }}
          >
            <TableRow>
              <TableCell colSpan={2}>
                <TablePagination
                  component="div"
                  count={filteredResults.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NotificacionesTable;
