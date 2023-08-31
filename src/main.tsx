import { createRoot } from 'react-dom/client';
import { App } from '@/app';
import { appStarted } from '@/shared/config/events';
import '@/app/styles/common.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

appStarted();
root.render(<App />);
