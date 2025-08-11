
import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import Routes from 'routes';

const EmailSignIn: FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to SMS sign-in page immediately
    router.replace(Routes.SIGN_IN_PHONE);
  }, [router]);

  return null;
};

export default EmailSignIn;
