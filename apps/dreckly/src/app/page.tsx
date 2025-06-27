import { UiKit } from '@dreckly/ui-kit';
import { User } from '@dreckly/types';

export default async function Index() {
  // get from api
  const response = await fetch('http://localhost:3000/api/hello');

  const dummyUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  };

  console.log(response);

  return (
    <div>
      <p>{dummyUser.name}</p>
      <UiKit />
    </div>
  );
}
