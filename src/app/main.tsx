import { createRoot } from 'react-dom/client';
import { allSettled } from 'effector';
import { Pages } from '@/pages';
import { scope } from '@/shared/scope';
import { Providers } from './providers';
import { $$app } from './app.model';
// @ts-ignore-next-line
import 'swiper/css/pagination';
import '@/app/styles/common.css';

allSettled($$app.started, { scope });

const App = () => {
  return (
    <Providers>
      <Pages />
    </Providers>
  );
};

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(<App />);
