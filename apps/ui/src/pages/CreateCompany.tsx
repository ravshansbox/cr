import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Input, Label } from '../components/core';
import { api } from '../api';

type CreateCompanyProps = {
  onCreate?: () => void | Promise<void>;
};
export const CreateCompany: FC<CreateCompanyProps> = ({ onCreate }) => {
  const form = useForm({ defaultValues: { name: '' } });

  return (
    <Form
      layout="row"
      onSubmit={form.handleSubmit(async (values) => {
        await api.createCompany({ body: values });
        await onCreate?.();
        form.reset();
      })}
    >
      <Label text="Name" layout="row">
        <Input type="text" {...form.register('name')} />
      </Label>
      <Button type="submit">Create</Button>
    </Form>
  );
};
