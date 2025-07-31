import { Helmet } from 'react-helmet-async';

import { BlogView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Blog | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <BlogView />
    </>
  );
}
