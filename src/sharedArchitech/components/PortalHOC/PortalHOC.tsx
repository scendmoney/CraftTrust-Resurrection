import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children?: ReactNode;
  id?: 'portal-1' | 'portal-2';
}

const PortalHOC = ({ children, id = 'portal-1' }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const doc = typeof window !== 'undefined' && document.querySelector(`#${id}`);

  return mounted && doc ? createPortal(children, doc) : null;
};

export default PortalHOC;
