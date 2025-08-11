import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Routes from 'routes';

const AuthIndexPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to SMS sign-in page
    router.replace(Routes.SIGN_IN_PHONE);
  }, [router]);

  return null;
};

export default AuthIndexPage;
