import { Helmet } from 'react-helmet-async';

import { GameNumbersView } from 'src/sections/game-numbers';

// ----------------------------------------------------------------------

export default function GameNumbersPage() {
  return (
    <>
      <Helmet>
        <title> Game Numbers | {import.meta.env.VITE_PRODUCT_NAME} Admin </title>
      </Helmet>

      <GameNumbersView />
    </>
  );
}
