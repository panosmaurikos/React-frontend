import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Iconify } from 'src/components/iconify';

export function ProcessBar({
  steps,
  activeStep,
  onStepClick,
  variant,
  sx,
}: {
  steps: string[];
  activeStep: number;
  onStepClick?: (index: number) => void;
  variant?: 'full' | 'compact';
  sx?: any;
}) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const compact = variant === 'compact' || isSmall;

  // unified responsive circle size (desktop larger)
  const circleSize = compact ? 44 : 56; // px
  const circleRadius = `${circleSize / 2}px`;

  // progress % (0..100) relative to track
  const progressPercent =
    steps.length > 1 ? Math.max(0, Math.min(100, (activeStep / (steps.length - 1)) * 100)) : 0;

  return (
    <Box
      sx={[
        {
          width: '100%',
          position: 'relative',
          // expose vars so overrides are easy
          '--circle-size': `${circleSize}px`,
          '--circle-radius': circleRadius,
          py: compact ? 1 : 2,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* Track: left/right inset equals circle radius so track is centered to circle centers */}
      <Box
        sx={{
          position: 'absolute',
          left: 'calc(var(--circle-size) / 2)',
          right: 'calc(var(--circle-size) / 2)',
          // align track center with circle centers taking container padding (py) into account
          top: `calc(${theme.spacing(compact ? 1 : 2)} + (var(--circle-size) / 2))`,
          transform: 'translateY(-50%)',
          height: 4,
          bgcolor: theme.vars.palette.divider,
          borderRadius: 2,
          zIndex: 1,
        }}
      >
        {/* Progress overlay (width relative to track) */}
        <Box
          sx={{
            height: '100%',
            width: `${progressPercent}%`,
            bgcolor: 'primary.main',
            borderRadius: 2,
            transition: 'width 260ms ease',
          }}
        />
      </Box>

      {/* Items (circles + labels) */}
      <Stack
        direction="row"
        spacing={0}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          position: 'relative',
          zIndex: 3,
          px: 0,
        }}
      >
        {steps.map((label, idx) => {
          const done = idx < activeStep;
          const active = idx === activeStep;

          return (
            <Box
              key={label}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 0,
                px: compact ? { xs: 0.5 } : 0,
              }}
            >
              <Tooltip title={label} arrow>
                <ButtonBase
                  onClick={() => onStepClick?.(idx)}
                  sx={{
                    width: 'var(--circle-size)',
                    height: 'var(--circle-size)',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: done || active ? 'primary.main' : 'background.paper',
                    color: done || active ? 'primary.contrastText' : 'text.secondary',
                    boxShadow: active ? 6 : 0,
                    border: `2px solid ${done || active ? theme.palette.primary.main : (theme as any).vars.palette.divider}`,
                    fontSize: { xs: 14, sm: 16 },
                    transition: 'box-shadow 0.18s, transform 0.18s, background-color 0.18s',
                    transform: active ? 'scale(1.05)' : 'none',
                  }}
                  aria-current={active ? 'step' : undefined}
                  aria-label={label}
                >
                  {done ? (
                    <Iconify icon="eva:checkmark-fill" width={18} />
                  ) : (
                    <Typography
                      variant="subtitle2"
                      sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                    >
                      {idx + 1}
                    </Typography>
                  )}
                </ButtonBase>
              </Tooltip>

              <Typography
                variant={compact ? 'caption' : 'subtitle2'}
                sx={{
                  mt: 0.5,
                  textAlign: 'center',
                  color: idx <= activeStep ? 'text.primary' : 'text.secondary',
                  fontWeight: idx === activeStep ? 700 : 500,
                  maxWidth: { xs: 64, sm: 120 },
                  fontSize: { xs: '0.62rem', sm: '0.82rem' },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}