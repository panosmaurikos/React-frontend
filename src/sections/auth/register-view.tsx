import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { ProcessBar } from 'src/components/process-bar/process-bar';

const steps = [
  'Account Info',
  'Personal Details',
  'Shipping details',
  'Confirmation',
];

// Validators
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

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeStep = 0;

  const isFormValid =
    isValidUsername(form.username) &&
    isValidEmail(form.email) &&
    isValidPassword(form.password);

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
    setError(null);
  };

  const handleNext = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!isFormValid) {
        setError('Please fill all required fields correctly.');
        return;
      }
      router.push('/dashboard');
    },
    [form, isFormValid, router]
  );

  // Padding for header/footer offsets
  const HEADER_HEIGHT = 72;
  const FOOTER_HEIGHT = 84;

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          bgcolor: 'background.default',
          zIndex: 1200,
          px: 2,
          pt: 2,
          pb: 1,
        }}
      >
        <ProcessBar steps={steps} activeStep={activeStep} />
      </Box>

      {/* Main Registration Form */}
      <Box sx={{ pt: `${HEADER_HEIGHT + 8}px`, pb: `${FOOTER_HEIGHT + 8}px` }}>
        <Box
          sx={{
            gap: 1.5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 5,
          }}
        >
          <Typography variant="h5">Register</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Already have an account?
            <Button
              variant="outlined"
              size="small"
              sx={{ ml: 1, textTransform: 'none', minWidth: 0, px: 1.5, py: 0.5 }}
              onClick={() => router.push('/sign-in')}
            >
              Sign in
            </Button>
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
          }}
          component="form"
          autoComplete="off"
          onSubmit={handleNext}
        >
          <TextField
            fullWidth
            required
            name="username"
            label="Username"
            value={form.username}
            onChange={handleChange('username')}
            sx={{ mb: 3 }}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            fullWidth
            required
            name="email"
            label="Email address"
            value={form.email}
            type="email"
            onChange={handleChange('email')}
            sx={{ mb: 3 }}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            fullWidth
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
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            name="firstName"
            label="First Name"
            value={form.firstName}
            onChange={handleChange('firstName')}
            sx={{ mb: 3 }}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            fullWidth
            name="lastName"
            label="Last Name"
            value={form.lastName}
            onChange={handleChange('lastName')}
            sx={{ mb: 3 }}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            fullWidth
            name="phone"
            label="Phone Number"
            value={form.phone}
            onChange={handleChange('phone')}
            type="tel"
            sx={{ mb: 3 }}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
          <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}>
            OR
          </Typography>
        </Divider>
        <Box sx={{ gap: 1, display: 'flex', justifyContent: 'center' }}>
          <IconButton color="inherit">
            <Iconify width={22} icon="socials:google" />
          </IconButton>
        </Box>
      </Box>

      {/* Fixed Next Button Bottom-Right */}
      <Box
        sx={{
          position: 'fixed',
          right: 32,
          bottom: 24,
          zIndex: 1300,
        }}
      >
        <Button
          size="large"
          color="inherit"
          variant="contained"
          disabled={!isFormValid}
          sx={{
            minWidth: 120,
            px: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </>
  );
}