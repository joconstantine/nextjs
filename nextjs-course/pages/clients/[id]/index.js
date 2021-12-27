import { useRouter } from 'next/router';

const ClientProjectsPage = () => {
  const router = useRouter();
  const clientid = router.query.id;

  const loadProjectHandler = () => {
    //load data...
    router.push('/clients/max/projecta');
  };

  return (
    <div>
      <h1>The Client Projects Page {clientid}</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
};

export default ClientProjectsPage;
