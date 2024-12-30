/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from './components/Form';
import { Label } from './components/Label';
import { Input } from './components/Input';
import { Button } from './components/Button';

export const Login: FC = () => {
  const form = useForm({ defaultValues: { username: '', password: '' } });

  return (
    <Form
      className="mx-auto mt-8 max-w-md"
      onSubmit={form.handleSubmit((values) => {
        console.log(values);
      })}
    >
      <Label text="Username">
        <Input type="text" {...form.register('username')} />
      </Label>
      <Label text="Password">
        <Input type="password" {...form.register('password')} />
      </Label>
      <Button>Login</Button>
    </Form>
  );
};
