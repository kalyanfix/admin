import { Helmet } from 'react-helmet-async';

import { GameNameView } from 'src/sections/game-name/view';

// ----------------------------------------------------------------------

export default function GameNamePage() {
  return (
    <>
      <Helmet>
        <title> Game Name | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <GameNameView />
    </>
  );
}
