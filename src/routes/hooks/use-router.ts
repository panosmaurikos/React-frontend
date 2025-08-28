import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

// ----------------------------------------------------------------------

export function useRouter() {
  const history = useHistory();

  const router = useMemo(
    () => ({
      back: () => history.goBack(),
      forward: () => history.goForward(),
      refresh: () => history.push(history.location.pathname),
      push: (href: string) => history.push(href),
      replace: (href: string) => history.replace(href),
    }),
    [history]
  );

  return router;
}