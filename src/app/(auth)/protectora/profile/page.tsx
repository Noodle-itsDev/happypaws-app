"use client";

import Footer from "@/_components/footerCom/footer";
import PrimarySearchAppBar from "@/_components/header/headerGradient";
import SimpleBottomNavigation from "@/_components/navigation/navigationNavBar";
import { Grid, Paper, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ShelterProfileView: React.FC = () => {

  return (
    <>
      <header>
        <PrimarySearchAppBar accessHref={""} accessLabel={""} />
        <SimpleBottomNavigation labels={{
          textoUno: "",
          textoDos: "",
          textoTres: "",
          textoCuatro: "",
          textoCinco: "",
          textoSeis: ""
        }} />
      </header>
      <main style={{ width: "100vw", height: "100vh"}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} style={{ width: '30vw', height: "100vw" }}>
            <Paper style={{ height: '100%', padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Columna 30vw
              </Typography>
              <Typography>
                Contenido de la columna que ocupa 30vw.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} style={{ width: '70vw' }}>
            <Paper style={{ height: '100%', padding: '16px' }}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Acordeón 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Contenido del primer acordeón.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Acordeón 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Contenido del segundo acordeón.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>
        </Grid>
      </main>

    </>
  );
}

export default ShelterProfileView;
