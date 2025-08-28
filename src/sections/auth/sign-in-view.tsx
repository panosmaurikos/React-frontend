import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

// Simple email validation function
function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export function SignInView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isFormValid =
    emailOrUsername.length > 0 &&
    password.length >= 6 &&
    (isValidEmail(emailOrUsername) || emailOrUsername.length > 2);

  // Fake login simulates backend API
  const handleSignIn = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      setError(null);

      // Simple validation
      if (!isFormValid) {
        setError('Please enter valid credentials.');
        return;
      }

      setLoading(true);

      // Fake async call
      setTimeout(() => {
        // Accept any credentials (for demo)
        setLoading(false);
        router.push('/dashboard');
      }, 900);
    },
    [emailOrUsername, password, router, isFormValid]
  );

  const handleGetStarted = useCallback(() => {
    router.push('/register');
  }, [router]);

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Don’t have an account?
          <Button
            variant="outlined"
            size="small"
            sx={{ ml: 1, textTransform: 'none', minWidth: 0, px: 1.5, py: 0.5 }}
            onClick={handleGetStarted}
          >
            Get started
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
        onSubmit={handleSignIn}
      >
        <TextField
          fullWidth
          name="emailOrUsername"
          label="Username or Email address"
          value={emailOrUsername}
          onChange={e => setEmailOrUsername(e.target.value)}
          sx={{ mb: 3 }}
          slotProps={{
            inputLabel: { shrink: true },
          }}
          autoFocus
          required
        />

        <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
          Forgot password?
        </Link>

        <TextField
          fullWidth
          name="password"
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
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
          required
        />

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          disabled={!isFormValid || loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          Sign in
        </Button>
      </Box>

      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>
      <Box
        sx={{
          gap: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:google" />
        </IconButton>
      </Box>
    </>
  );
}