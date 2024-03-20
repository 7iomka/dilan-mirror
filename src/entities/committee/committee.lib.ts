export const getCommitteeFullName = ({
  name,
  surname,
}: {
  name?: string | null;
  surname?: string | null;
}) => [name, surname].filter(Boolean).join(' ');
