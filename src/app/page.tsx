"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
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
  nome_completo: z.string().min(5, {
    message: "Nome completo deve ter pelo menos 5 caracteres",
  }),
  usuario_acesso: z.string().min(3, {
    message: "Usuário deve ter pelo menos 3 caracteres",
  }),
  email_aluno: z.string().email({
    message: "Digite um email válido",
  }),
  senha: z
    .string()
    .min(8, {
      message:
        "Senha deve conter 8+ caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 símbolo",
    })
    .refine(
      (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password
        );
      },
      {
        message:
          "Senha deve conter 8+ caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 símbolo",
      }
    ),
  observacao: z.string().optional(),
});

type Schema = z.infer<typeof schema>;

export default function ProfileForm() {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email_aluno: "",
      usuario_acesso: "",
      nome_completo: "",
      senha: "",
      observacao: "",
    },
  });

  async function onSubmit(payload: z.infer<typeof schema>) {
    try {
      const response = await fetch("http://localhost:3005/api/alunos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao cadastrar usuário");
      }

      form.reset();

      toast.success("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Erro no cadastro:", error);

      toast.success("Cadastro realizado com sucesso!");
    }
  }

  function testToast() {
    toast.success("Cadastro realizado com sucesso!");
    console.log("clicado");
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
            name="nome_completo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="Informe seu nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="usuario_acesso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário de acesso</FormLabel>
                <FormControl>
                  <Input placeholder="Informe o nome do usuário" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email_aluno"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Informe seu email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="senha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Crie uma senha segura"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="observacao"
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
          <Button type="submit">Registrar</Button>

          <ToastContainer />
        </form>
      </Form>
    </div>
  );
}
