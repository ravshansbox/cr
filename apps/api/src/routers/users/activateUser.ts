import { createRoute, HttpResponse } from '../../http.js';
import { activateUserEndpoint } from '../../endpoints.js';
import { wrapIntoTransaction } from '../../pool.js';
import { userRegistrationDao } from '../../daos/userRegistrations/index.js';
import { userDao } from '../../daos/users/index.js';

export const activateUser = createRoute({
  endpoint: activateUserEndpoint,
  process: async ({ params }) => {
    await wrapIntoTransaction(async (client) => {
      const userRegistration = await userRegistrationDao.confirm(client, {
        confirmation_code: params.confirmation_code,
      });
      await userDao.setUserVerified(client, { id: userRegistration.user_id });
    });
    return new HttpResponse(200, 'User activated successfully', 'text');
  },
});
