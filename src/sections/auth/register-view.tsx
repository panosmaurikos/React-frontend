// src/pages/register/index.tsx
import React, { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

type FormState = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}
function isValidPassword(password: string) {
  return password.length >= 6;
}
function isValidUsername(username: string) {
  return username.length > 2;
}

export function RegisterView() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFormValid =
    isValidUsername(form.username) &&
    isValidEmail(form.email) &&
    isValidPassword(form.password);

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError(null);
  };

  const handleNext = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!isFormValid) {
        setError('Please fill all required fields correctly.');
        return;
      }
      router.push('/register/personal');
    },
    [form, isFormValid, router]
  );

  return (
    <Box 
      component="form"
      autoComplete="off"
      onSubmit={handleNext}
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '400px' // Ελάχιστο ύψος για καλύτερη εμφάνιση
      }}
    >
      {/* Header */}
      <Box sx={{ flexShrink: 0, mb: 2 }}>
        <Box
          sx={{
            gap: 0.5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h5">Register</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
            Already have an account?
            <Button
              variant="outlined"
              size="small"
              sx={{ ml: 1, textTransform: 'none', minWidth: 0, px: 1, py: 0.2, fontSize: '0.8125rem' }}
              onClick={() => router.push('/sign-in')}
            >
              Sign in
            </Button>
          </Typography>
        </Box>
      </Box>

      {/* Form Fields - Πιο συμπαγής διάταξη */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <TextField
          fullWidth
          size="small"
          required
          name="username"
          label="Username"
          value={form.username}
          onChange={handleChange('username')}
          sx={{ mb: 1.5 }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          fullWidth
          size="small"
          required
          name="email"
          label="Email address"
          value={form.email}
          type="email"
          onChange={handleChange('email')}
          sx={{ mb: 1.5 }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          fullWidth
          size="small"
          required
          name="password"
          label="Password"
          value={form.password}
          onChange={handleChange('password')}
          type={showPassword ? 'text' : 'password'}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={() => setShowPassword(!showPassword)} 
                    edge="end"
                    size="small"
                  >
                    <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} width={18} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{ mb: 1.5 }}
        />
        <TextField
          fullWidth
          size="small"
          name="firstName"
          label="First Name"
          value={form.firstName}
          onChange={handleChange('firstName')}
          sx={{ mb: 1.5 }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          fullWidth
          size="small"
          name="lastName"
          label="Last Name"
          value={form.lastName}
          onChange={handleChange('lastName')}
          sx={{ mb: 1.5 }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          fullWidth
          size="small"
          name="phone"
          label="Phone Number"
          value={form.phone}
          onChange={handleChange('phone')}
          type="tel"
          sx={{ mb: 1.5 }}
          slotProps={{ inputLabel: { shrink: true } }}
        />

        {error && (
          <Typography color="error" sx={{ mb: 1, fontSize: '0.75rem' }}>
            {error}
          </Typography>
        )}
      </Box>

      {/* Social Login - Μειωμένος χώρος */}
      <Box sx={{ flexShrink: 0, mt: 'auto' }}>
        <Divider sx={{ my: 1.5, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
          <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium', fontSize: '0.75rem' }}>
            OR
          </Typography>
        </Divider>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          <IconButton color="inherit" size="medium">
            <Iconify width={20} icon="socials:google" />
          </IconButton>
        </Box>
      </Box>

      {/* Fixed Next Button */}
      <Box
        sx={{
          position: 'fixed',
          right: 16,
          bottom: 12,
          zIndex: 1300,
        }}
      >
        <Button
          size="medium"
          color="inherit"
          variant="contained"
          disabled={!isFormValid}
          sx={{
            minWidth: 96,
            px: 2,
            borderRadius: 2,
            boxShadow: 3,
            fontSize: '0.875rem',
            py: 1,
          }}
          type="submit"
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}