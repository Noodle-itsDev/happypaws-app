import React from "react";
import { Card, CardContent, TextField, Typography } from "@mui/material";

const ProtectoraPawsCard: React.FC = () => {
  return (
    <Card
      className="max-w-md shadow-none" 
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        alignContent: "center",
      }}
    >
      <CardContent
        sx={{
          color: "white",
          padding: "16px", 
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h5" className="font-bold">
            Protectora Paws
          </Typography>
          <div className="bg-yellow-300 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-black font-bold"></span>
          </div>
        </div>
        <Typography variant="h6" className="mb-2">
          Ubicación
        </Typography>
        <div className="space-y-2">
          <TextField
            fullWidth
            variant="outlined"
            label="Calle"
            defaultValue=""
            InputProps={{
              sx: {
                bgcolor: "green.300",
                borderRadius: 1, 
              },
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Ciudad"
            defaultValue=""
            InputProps={{
              sx: {
                bgcolor: "green.300",
                borderRadius: 1,
              },
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Municipio"
            defaultValue=""
            InputProps={{
              sx: {
                bgcolor: "green.300",
                borderRadius: 1,
              },
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            defaultValue=""
            label="Comunidad Autónoma"
            InputProps={{
              sx: {
                bgcolor: "green.300",
                borderRadius: 1,
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProtectoraPawsCard;
