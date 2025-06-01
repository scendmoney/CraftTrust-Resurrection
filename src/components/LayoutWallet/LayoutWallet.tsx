import type { FC, ReactElement } from 'react';

import WalletWrapper from 'components/Wallet/shared/WalletWrapper/WalletWrapper';

const LayoutWallet: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <WalletWrapper>
      {children}

      {/* <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={2}>
          <BottomNavigation
            showLabels
            value={router.pathname}
            onChange={(event, newValue) => {
              router.push(newValue);
            }}
          >
            <BottomNavigationAction
              label="Strains"
              value="/wallet/strains/my"
              icon={<StyleIcon />}
            />

            <BottomNavigationAction
              label="Streams"
              value="/wallet/streams/feed"
              icon={<DynamicFeedIcon />}
            />

            <BottomNavigationAction
              label="Stoners"
              value="/wallet/stoners/contacts"
              icon={<ChatIcon />}
            />

            <BottomNavigationAction label="Wallet" value="/wallet/balance" icon={<WalletIcon />} />
          </BottomNavigation>
        </Paper> */}
    </WalletWrapper>
  );
};

export default LayoutWallet;
