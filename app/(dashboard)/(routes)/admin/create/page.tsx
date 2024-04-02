"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

export default function CreatePage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/admin/courses/${response.data.id}`);
      toast.success("Course created.");
    } catch {
      toast.error("Opps! Something went wrong.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:justify-center md:items-center  h-full p-6">
      <div>
        <h1 className="text-2xl">Course Title</h1>
        <p>you can change name later</p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex. 'Artificial intelligence' "
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/admin/courses">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
