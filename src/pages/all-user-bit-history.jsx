import { Helmet } from 'react-helmet-async';

import { AllUserBitHistoryView } from 'src/sections/all-user-bit-history/view';

// ----------------------------------------------------------------------

export default function AllUserBitHistoryPage() {
  return (
    <>
      <Helmet>
        <title> User Bid History | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <AllUserBitHistoryView />
    </>
  );
}
