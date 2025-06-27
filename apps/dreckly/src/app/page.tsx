import { getUser } from '@dreckly/data-access';
import { Hero } from '@dreckly/home';

export default async function Index() {
  const user = await getUser();

  return (
    <div>
      <Hero />
      <p>{user.name}</p>
    </div>
  );
}
