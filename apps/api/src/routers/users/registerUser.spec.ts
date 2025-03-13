describe('registerUser', () => {
  it('should return 201 with correct body', async () => {
    const username = `user${Date.now()}`;
    const password = `pass${Date.now()}`;
    const response = await httpClient.request('/users', {
      method: 'POST',
      body: { email: `${username}@cloudretail.pro`, username, password },
    });
    expect(response).toEqual({
      status: 201,
      body: {
        user: {
          id: expect.any(Number),
          email: `${username}@cloudretail.pro`,
          username,
          is_verified: false,
        },
        registration_valid_until: expect.any(String),
      },
    });
  });
});
