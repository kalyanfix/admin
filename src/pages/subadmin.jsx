import { Helmet } from 'react-helmet-async';

import { SubAdminView } from 'src/sections/subadmin/view';

// ----------------------------------------------------------------------

export default function SubAdminPage() {
  return (
    <>
      <Helmet>
        <title> Sub Admin | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <SubAdminView />
    </>
  );
}
