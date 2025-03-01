import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Input, Label } from '../components/core';
import { api } from '../api';

type CreateCompanyProps = {
  onCreate?: () => void;
};
export const CreateCompany: FC<CreateCompanyProps> = ({ onCreate }) => {
  const form = useForm({ defaultValues: { name: '' } });

  return (
    <Form
      className="w-xs"
      onSubmit={form.handleSubmit(async (values) => {
        await api.createCompany({ body: values });
        onCreate?.();
      })}
    >
      <Label text="Name">
        <Input type="text" {...form.register('name')} />
      </Label>
      <Button type="submit">Create</Button>
    </Form>
  );
};
