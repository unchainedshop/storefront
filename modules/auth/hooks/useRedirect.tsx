import { useEffect } from 'react';
import { useRouter } from 'next/router';

import useUser from './useUser';

const useRedirect = ({ to, whenSignedIn = false }) => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!user && !whenSignedIn) {
      // when signed out
      router.push({ pathname: to });
    } else if (user && whenSignedIn) {
      // when signed in
      router.push({ pathname: to });
    }
  }, [user]);

  return null;
};

export default useRedirect;
