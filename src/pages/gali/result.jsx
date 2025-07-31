import { Helmet } from 'react-helmet-async';

import { ResultView } from 'src/sections/gali/result/view';

// ----------------------------------------------------------------------

export default function ResultPage() {
  return (
    <>
      <Helmet>
        <title> Result Declare | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <ResultView />
    </>
  );
}
