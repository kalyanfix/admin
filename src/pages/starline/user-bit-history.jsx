import { Helmet } from 'react-helmet-async';

import { UserBitHistoryView } from 'src/sections/starline/user-bit-history/view';

// ----------------------------------------------------------------------

export default function UserBitHistoryPage() {
  return (
    <>
      <Helmet>
        <title> User Bid History | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <UserBitHistoryView />
    </>
  );
}
