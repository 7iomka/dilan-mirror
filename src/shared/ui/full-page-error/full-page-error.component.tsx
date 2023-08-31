import { FullPageWrapper } from '../full-page-wrapper';

type FullPageErrorProps = {
  error: any;
};

export const FullPageError = (props: FullPageErrorProps) => {
  const { error } = props;

  return (
    <FullPageWrapper>
      <div className="container">
        Something went wrong:
        <code>{error?.message}</code>
      </div>
    </FullPageWrapper>
  );
};
