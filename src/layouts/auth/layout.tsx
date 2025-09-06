// src/layouts/auth/layout.tsx
import type { CSSObject, Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Logo } from 'src/components/logo';
import { ProcessBar } from 'src/components/process-bar';
import { ProcessBarProvider, useProcessBarContext } from 'src/components/process-bar/context';

import { AuthContent } from './content';
import { MainSection } from '../core/main-section';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';

import type { AuthContentProps } from './content';
import type { MainSectionProps } from '../core/main-section';
import type { HeaderSectionProps } from '../core/header-section';
import type { LayoutSectionProps } from '../core/layout-section';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type AuthLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    main?: MainSectionProps;
    content?: AuthContentProps;
  };
};

function HeaderProcessBarInner({ sx }: { sx?: any }) {
  // use context for active step + setter, but render ProcessBar directly (no extra wrapper)
  const { steps, activeStep, setActiveStep } = useProcessBarContext();

  return (
    <ProcessBar
      steps={steps}
      activeStep={activeStep}
      onStepClick={setActiveStep}
      // force 'full' variant here so labels remain visible on small screens
      variant="full"
      sx={[
        {
          width: '100%',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}

export function AuthLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'md',
}: AuthLayoutProps) {
  const pathname = usePathname();

  const isRegisterPage = pathname?.startsWith('/register');
  const steps = ['Account Info', 'Personal Details', 'Shipping details', 'Confirmation'];

  // centerArea: only show on register routes — render ProcessBar directly (no extra wrappers)
  const headerSlots: HeaderSectionProps['slots'] = {
    centerArea: isRegisterPage ? <HeaderProcessBarInner /> : null,
  };

  // push the centerArea (process bar) lower and give it more left/right room
  const headerSlotProps: HeaderSectionProps['slotProps'] = {
    container: { maxWidth: false },
    centerArea: {
      sx: {
        // wider and centered with responsive constraints
        width: 'min(980px, 96%)',
        // push lower (more on mobile to avoid overlapping)
        mt: { xs: 4, md: 8 },
        px: { xs: 1, md: 2 },
        display: 'flex',
        justifyContent: 'center',
      },
    },
  };

  // merge with any incoming header.slotProps
  const mergedHeaderSlotProps = {
    ...(slotProps?.header?.slotProps ?? {}),
    ...headerSlotProps,
  };

  // Content: make auth card constrain height and become scrollable internally (better UX on small screens)
  const contentSlotProps: AuthContentProps = {
    sx: [
      (theme) => ({
        // keep card compact, allow overflow inside
        maxHeight: 'calc(100vh - 140px)', // Reduced from 160px to give more space
        overflowY: 'auto',
        py: { xs: 2, md: 4 },
        px: { xs: 1.5, md: 3 },
      }),
      ...(Array.isArray(slotProps?.content?.sx) ? slotProps?.content?.sx ?? [] : [slotProps?.content?.sx]),
    ],
  };

  const getMergedContentSx = () => {
    const baseSx = Array.isArray(contentSlotProps.sx) ? contentSlotProps.sx : [contentSlotProps.sx];
    const slotSx = slotProps?.content?.sx ? 
      (Array.isArray(slotProps.content.sx) ? slotProps.content.sx : [slotProps.content.sx]) : 
      [];
    
    return [...baseSx, ...slotSx].filter(Boolean);
  };

  const mergedSlotProps = {
    ...slotProps,
    header: {
      ...(slotProps?.header ?? {}),
      slotProps: mergedHeaderSlotProps,
    },
    content: {
      ...(slotProps?.content ?? {}),
      sx: getMergedContentSx(),
    },
  };

  const renderMain = () => (
    <MainSection
      {...mergedSlotProps?.main}
      sx={[
        (theme) => ({
          alignItems: 'center',
          p: theme.spacing(1, 1, 6, 1), // Reduced padding
          [theme.breakpoints.up(layoutQuery)]: {
            justifyContent: 'center',
            p: theme.spacing(6, 0, 6, 0), // Reduced padding
          },
        }),
        ...(Array.isArray(mergedSlotProps?.main?.sx)
          ? (mergedSlotProps?.main?.sx ?? [])
          : [mergedSlotProps?.main?.sx]),
      ]}
    >
      <AuthContent {...mergedSlotProps?.content}>{children}</AuthContent>
    </MainSection>
  );

  return (
    <ProcessBarProvider initialSteps={steps}>
      <LayoutSection
        headerSection={
          <HeaderSection
            // boolean attribute must be omitted value per ESLint rule
            disableOffset
            layoutQuery={layoutQuery}
            {...slotProps?.header}
            slots={{ ...headerSlots, ...slotProps?.header?.slots }}
            // merge header slotProps so any incoming props are preserved but our centerArea sx applies
            slotProps={mergedHeaderSlotProps}
            sx={{
              height: isRegisterPage ? { xs: 80, md: 110 } : 'auto', // Reduced height
              background: 'transparent',
              ...slotProps?.header?.sx,
            }}
          />
        }
        /** **************************************
         * @Styles
         *************************************** */
        cssVars={{ '--layout-auth-content-width': '420px', ...cssVars }}
        sx={[
          (theme) => ({
            position: 'relative',
            '&::before': backgroundStyles(),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {renderMain()}
      </LayoutSection>
    </ProcessBarProvider>
  );
}

// ----------------------------------------------------------------------

const backgroundStyles = (): CSSObject => ({
  zIndex: 1,
  opacity: 1,
  width: '100%',
  height: '100%',
  content: "''",
  position: 'absolute',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundImage: `
    linear-gradient(120deg, #ff6d2e 0%, #ffffff 80%, #4a4a4a 100%),
    radial-gradient(circle at 75% 25%, #ff6d2e33 0%, transparent 60%),
    radial-gradient(circle at 50% 80%, #ffffff55 0%, transparent 70%)
  `
});