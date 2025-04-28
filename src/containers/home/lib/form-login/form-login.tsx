"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/providers/firebase";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),

  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),

  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms." }),
  }),
});

export default function FormLogin() {
  const { logIn } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[324px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    try {
      await logIn(data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-4 md:p-6 bg-secondary/80 rounded-xl flex flex-col border gap-4 w-full">
      <span className="text-lg text-primary/60 font-medium">
        <span className="text-lg text-primary/40 font-medium">
          {"\u2022"}&nbsp;&nbsp;
        </span>
        Form Playground
      </span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  I agree to the terms and conditions
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={!form?.formState?.isValid && form?.formState?.isDirty}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
