import { Helmet } from 'react-helmet-async';

import { NotificationView } from 'src/sections/notification/view';

// ----------------------------------------------------------------------

export default function UserQueryPage() {
  return (
    <>
      <Helmet>
        <title> Notification | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <NotificationView />
    </>
  );
}
