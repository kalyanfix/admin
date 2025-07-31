import { Helmet } from 'react-helmet-async';

import { FundRequestView } from 'src/sections/wallet/fund-request/view';

// ----------------------------------------------------------------------

export default function WinningPage() {
  return (
    <>
      <Helmet>
        <title> Fund Request | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <FundRequestView />
    </>
  );
}