import { Helmet } from 'react-helmet-async';

import { NoticeView } from 'src/sections/notice/view';

// ----------------------------------------------------------------------

export default function UserQueryPage() {
  return (
    <>
      <Helmet>
        <title> Notice | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <NoticeView />
    </>
  );
}
