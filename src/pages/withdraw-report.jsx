import { Helmet } from 'react-helmet-async';

import { WithdrawReportView } from 'src/sections/withdraw-report/view';

// ----------------------------------------------------------------------

export default function WithdrawReportPage() {
  return (
    <>
      <Helmet>
        <title> Withdraw Report | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <WithdrawReportView />
    </>
  );
}
