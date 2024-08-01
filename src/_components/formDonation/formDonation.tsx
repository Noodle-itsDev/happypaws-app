import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Link } from '@mui/material';

interface DonationFormProps {
  onSubmit: (amount: number) => void;
  customFields?: React.ReactNode;
}

const DonationForm: React.FC<DonationFormProps> = ({ onSubmit, customFields }) => {
  const [amount, setAmount] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(parseFloat(amount));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Cantidad a donar (€)"
            variant="outlined"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Grid>
        {customFields}
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Donar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" align="center">
            Al realizar la donación, aceptas la{' '}
            <Link href="https://stripe.com/es/privacy" target="_blank" rel="noopener noreferrer">
              política de privacidad de Stripe
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default DonationForm;