import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, FormControl, FormControlLabel, Checkbox, RadioGroup, Radio, FormGroup, FormLabel, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FilterAccordionProps {
    filters: {
        especie: string;
        edad: number;
        soloVoluntarios: boolean;
        soloAdopciones: boolean;
        estado: string;
        genero: string;
    };
    setFilters: React.Dispatch<React.SetStateAction<{
        especie: string;
        edad: number;
        soloVoluntarios: boolean;
        soloAdopciones: boolean;
        estado: string;
        genero: string;
    }>>;
}

const FilterAccordionShelter: React.FC<FilterAccordionProps> = ({ filters, setFilters }) => {
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = event.target;

        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: name === 'soloVoluntarios' || name === 'soloAdopciones' ? checked : name === 'edad' ? parseInt(value) : value,
        }));
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom style={{fontFamily: "system-ui", fontWeight: "bold", color: "#104b4b"}}>
                Filtrar
            </Typography>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Mascota</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl component="fieldset">
                        <RadioGroup
                            name="especie"
                            value={filters.especie}
                            onChange={handleFilterChange}
                        >
                            <FormControlLabel value="" control={<Radio />} label="Todos" />
                            <FormControlLabel value="Felino" control={<Radio />} label="Felino" />
                            <FormControlLabel value="Canino" control={<Radio />} label="Canino" />
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Edad</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Filtrar por edad</FormLabel>
                        <RadioGroup
                            name="edad"
                            value={filters.edad.toString()}
                            onChange={handleFilterChange}
                        >
                            <FormControlLabel value="0" control={<Radio />} label="Todos" />
                            <FormControlLabel value="5" control={<Radio />} label="Mayores de 5 años" />
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Estado</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl component="fieldset">
                        <RadioGroup
                            name="estado"
                            value={filters.estado}
                            onChange={handleFilterChange}
                        >
                            <FormControlLabel value="" control={<Radio />} label="Todos" />
                            <FormControlLabel value="Sano" control={<Radio />} label="Sano" />
                            <FormControlLabel value="Enfermo" control={<Radio />} label="Enfermo" />
                            <FormControlLabel value="Fallecido" control={<Radio />} label="Fallecido" />
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Género</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl component="fieldset">
                        <RadioGroup
                            name="genero"
                            value={filters.genero}
                            onChange={handleFilterChange}
                        >
                            <FormControlLabel value="" control={<Radio />} label="Todos" />
                            <FormControlLabel value="Macho" control={<Radio />} label="Macho" />
                            <FormControlLabel value="Hembra" control={<Radio />} label="Hembra" />
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            {/* 
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Opciones Adicionales</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={filters.soloVoluntarios} name="soloVoluntarios" onChange={handleFilterChange} />}
                            label="Solo Voluntarios"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={filters.soloAdopciones} name="soloAdopciones" onChange={handleFilterChange} />}
                            label="Solo Adopciones"
                        />
                    </FormGroup>
                </AccordionDetails>
            </Accordion> */}
        </Box>
    );
};

export default FilterAccordionShelter;
