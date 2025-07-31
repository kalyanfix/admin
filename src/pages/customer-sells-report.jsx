import { Helmet } from 'react-helmet-async';

import { CustomerSellsReportView } from 'src/sections/customer-sells-report/view';

// ----------------------------------------------------------------------

export default function CustomerSellsReportPage() {
  return (
    <>
      <Helmet>
        <title> Customer Sells Report | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <CustomerSellsReportView />
    </>
  );
}
