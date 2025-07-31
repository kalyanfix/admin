import { Helmet } from 'react-helmet-async';

import { ForbiddenView } from 'src/sections/permission';

// ----------------------------------------------------------------------

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title> 403 Forbidden </title>
      </Helmet>

      <ForbiddenView />
    </>
  );
}
