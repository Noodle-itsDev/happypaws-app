"use client";

import Footer from "@/_components/footerCom/footer";
import PrimarySearchAppBar from "@/_components/header/headerGradient";
import SimpleBottomNavigation from "@/_components/navigation/navigationNavBar";
import { Grid, Paper, Typography } from "@mui/material";
import { Container } from "postcss";

const ShelterProfileView: React.FC = () => {

  return(
      <>
          <header>
          <PrimarySearchAppBar accessHref={""} accessLabel={""}/>
          <SimpleBottomNavigation labels={{
          textoUno: "",
          textoDos: "",
          textoTres: "",
          textoCuatro: "",
          textoCinco: "",
          textoSeis: ""
        }}/>
          </header>
          <main style={{width: "100vw", height: "100vh"}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} style={{ width: '30vw', height: "100vw"}}>
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
                        <Typography variant="h6" gutterBottom>
                            Columna 70vw
                        </Typography>
                        <Typography>
                            Contenido de la columna que ocupa 70vw.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
          </main>
          <footer style={{position: "sticky", bottom: "-100vh"}}>
            <Footer color={"green"}/>
          </footer>
      
      </>
  );
}

export default ShelterProfileView;