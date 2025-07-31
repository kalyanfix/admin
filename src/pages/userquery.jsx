import { Helmet } from 'react-helmet-async';

import { UserQueryView } from 'src/sections/userquery/view';

// ----------------------------------------------------------------------

export default function UserQueryPage() {
  return (
    <>
      <Helmet>
        <title> User Query | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <UserQueryView />
    </>
  );
}
