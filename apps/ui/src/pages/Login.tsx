import { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Alert, Button, Form, Input, Label } from '../components/core';
import { EntryLayout } from '../components';
import { api, httpClient } from '../api';

export const Login: FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const form = useForm({ defaultValues: { username: '', password: '' } });

  return (
    <EntryLayout>
      <Form
        onSubmit={form.handleSubmit(async (values) => {
          try {
            const token = await api.createToken({ body: values });
            httpClient.setHeader('Authorization', `Bearer ${token.token}`);
            localStorage.setItem('token', token.token);
            await navigate('/');
          } catch (error) {
            if (error instanceof Error) {
              form.reset();
              setError(error.message);
            }
          }
        })}
      >
        <Label text="Username" type={error ? 'error' : 'info'}>
          <Input type="text" {...form.register('username')} />
        </Label>
        <Label text="Password" type={error ? 'error' : 'info'}>
          <Input type="password" {...form.register('password')} />
        </Label>
        <Button>Login</Button>
        {error && <Alert type="error">{error}</Alert>}
      </Form>
    </EntryLayout>
  );
};
