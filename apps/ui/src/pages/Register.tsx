import { FC } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Button, Form, Input, Label } from '../components/core';
import { api } from '../api';
import { EntryLayout } from '../components';

export const Register: FC = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: { email: '', username: '', password: '' },
  });

  return (
    <EntryLayout>
      <Form
        onSubmit={form.handleSubmit(async (values) => {
          await api.registerUser({ body: values });
          await navigate('/login');
        })}
      >
        <Label text="Email">
          <Input type="email" {...form.register('email')} />
        </Label>
        <Label text="Username">
          <Input type="text" {...form.register('username')} />
        </Label>
        <Label text="Password">
          <Input type="password" {...form.register('password')} />
        </Label>
        <Button>Register</Button>
      </Form>
    </EntryLayout>
  );
};
