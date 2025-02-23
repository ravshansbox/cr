describe('registerUser', () => {
  it('should return 201 with correct body', async () => {
    const response = await httpClient.request('/users', {
      method: 'POST',
      body: { username: 'user1', password: 'pass1' },
    });
    expect(response).toEqual({
      status: 201,
      body: {
        user: { id: expect.any(Number), username: 'user1', is_verified: false },
        registration_valid_until: expect.any(String),
      },
    });
  });
});
