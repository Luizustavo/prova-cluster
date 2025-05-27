"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
  username: z.string().min(2, {
    message: "Usuário é obrigatório",
  }),
  access: z.string().min(2, {
    message: "O nome do usuário de acesso é obrigatório",
  }),
  email: z.string().email({ message: "Digite um email válido" }),
  password: z.string().min(6, {
    message: "A senha deve ter no mínimo 6 caracteres",
  }),
  observation: z.string().optional(),
});

type Schema = z.infer<typeof schema>;

export default function ProfileForm() {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      access: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(payload: Schema) {
    console.log("submit", payload);
  }

  return (
    <div className="bg-zinc-100 h-screen w-screen flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col w-1/3"
        >
          <h3 className="font-bold text-4xl">Registro de usuário</h3>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="Infome seu nome completo" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="access"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário de acesso</FormLabel>
                <FormControl>
                  <Input placeholder="Infome o nome do usuário de acesso" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Infome seu email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Registre uma senha"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="observation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Input placeholder="Observações do usuário" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
