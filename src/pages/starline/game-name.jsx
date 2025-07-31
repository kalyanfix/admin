import { Helmet } from 'react-helmet-async';

import { StarLineGameNameView } from 'src/sections/starline/game-name/view';

// ----------------------------------------------------------------------

export default function StarlineGameNamePage() {
  return (
    <>
      <Helmet>
        <title> Starline Game Name | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <StarLineGameNameView />
    </>
  );
}
