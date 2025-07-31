import { Helmet } from 'react-helmet-async';

import { AdminFundReportView } from 'src/sections/admin-fund-report/view';

// ----------------------------------------------------------------------

export default function AdminFundReportPage() {
  return (
    <>
      <Helmet>
        <title> Admin Fund Report | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <AdminFundReportView />
    </>
  );
}
