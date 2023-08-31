import { ReactNode } from 'react';
import styles from './full-page-wrapper.module.css';

interface FullPageWrapperProps {
  children: ReactNode;
};

const FullPageWrapper = (props: FullPageWrapperProps) => {
  const { children } = props;

  return <div className={styles.root}>{children}</div>;
}

export {FullPageWrapper  }