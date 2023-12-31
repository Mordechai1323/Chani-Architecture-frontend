import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';
import Loading from '../loading';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const veriFyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? veriFyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   console.log("is loading " + isLoading);
  //   console.log("aT " + auth.accessToken);
  // }, [isLoading]);

  return <>{!persist ? <Outlet /> : isLoading ? <Loading /> : <Outlet />}</>;
}

export default PersistLogin;
