import { Helmet } from 'react-helmet-async';

import { WithdrawRequestView } from 'src/sections/wallet/withdraw-request/view';

// ----------------------------------------------------------------------

export default function WinningPage() {
  return (
    <>
      <Helmet>
        <title> Fund Request | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <WithdrawRequestView />
    </>
  );
}