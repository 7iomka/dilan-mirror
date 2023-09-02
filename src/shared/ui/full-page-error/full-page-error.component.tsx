type FullPageErrorProps = {
  error: any;
};

export const FullPageError = (props: FullPageErrorProps) => {
  const { error } = props;

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-y-auto">
      <div className="container">
        Something went wrong:
        <code>{error?.message}</code>
      </div>
    </div>
  );
};
