import { lazy, Suspense } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { Route, Switch } from 'react-router-dom';
import { IonRouterOutlet, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// Lazy-loaded components
export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const RegisterView = lazy(() => import('src/pages/register'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

const DashboardPageWrapper = () => (
  <IonPage>
    <IonContent>
      <DashboardLayout>
        <DashboardPage />
      </DashboardLayout>
    </IonContent>
  </IonPage>
);

const UserPageWrapper = () => (
  <IonPage>
    <IonContent>
      <DashboardLayout>
        <UserPage />
      </DashboardLayout>
    </IonContent>
  </IonPage>
);

const ProductsPageWrapper = () => (
  <IonPage>
    <IonContent>
      <DashboardLayout>
        <ProductsPage />
      </DashboardLayout>
    </IonContent>
  </IonPage>
);

const BlogPageWrapper = () => (
  <IonPage>
    <IonContent>
      <DashboardLayout>
        <BlogPage />
      </DashboardLayout>
    </IonContent>
  </IonPage>
);

const SignInPageWrapper = () => (
  <IonPage>
    <IonContent>
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    </IonContent>
  </IonPage>
);

const Page404Wrapper = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>404 Not Found</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <Page404 />
    </IonContent>
  </IonPage>
);

const RegisterPageWrapper = () => (
  <IonPage>
    <IonContent>
      <AuthLayout>
        <RegisterView />
      </AuthLayout>
    </IonContent>
  </IonPage>
);

export const routesSection = (
  <IonRouterOutlet>
    <Suspense fallback={renderFallback()}>
      <Switch>
        <Route path="/" exact component={SignInPageWrapper} />
        <Route path="/dashboard" component={DashboardPageWrapper} />
        <Route path="/user" component={UserPageWrapper} />
        <Route path="/products" component={ProductsPageWrapper} />
        <Route path="/blog" component={BlogPageWrapper} />
        <Route path="/sign-in" component={SignInPageWrapper} />
        <Route path="/register" component={RegisterPageWrapper} />
        <Route path="/404" component={Page404Wrapper} />
        <Route path="*" component={Page404Wrapper} />
      </Switch>
    </Suspense>
  </IonRouterOutlet>
);