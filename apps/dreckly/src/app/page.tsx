import { getUser } from '@dreckly/data-access';

export default async function Index() {
  const user = await getUser();

  return (
    <div>
      <p>{user.name}</p>
    </div>
  );
}
