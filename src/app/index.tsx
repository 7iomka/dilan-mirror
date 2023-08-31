import { createRoot } from 'react-dom/client';
import { Pages } from '@/pages';
import { Providers } from './providers';
import '@/app/styles/common.css';
import { $$app } from './app.model';

const App = () => {
  return (
    <Providers>
      <Pages />
    </Providers>
  );
};

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

$$app.started();

root.render(<App />);
