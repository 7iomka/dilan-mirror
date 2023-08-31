import { FullPageWrapper } from '@/shared/ui/full-page-wrapper';
import styles from './home.module.css';

export const HomePage = () => {
  return (
    <FullPageWrapper>
      <div className={styles.wrapper}>
        <div className="container">HomePage</div>
      </div>
    </FullPageWrapper>
  );
};
