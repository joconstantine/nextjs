import { useRouter } from 'next/router';

const SelectedClientProjectsPage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>
        The Selected Client Project {router.query.clientprojectid} for{' '}
        {router.query.id}
      </h1>
    </div>
  );
};

export default SelectedClientProjectsPage;
