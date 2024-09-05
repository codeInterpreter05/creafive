"use client";

import axios from "axios";
import * as z from "zod";
import Heading from "@/components/heading";
import { ArrowRight, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmitForm = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage = {
        role: "user",
        content: values.prompt,
      };
  
      setMessages((current) => [...current, userMessage]);
  
      const response = await axios.post("/api/conversation", {
        messages: [userMessage],
      });
  
      setMessages((current) => [
        ...current,
        { role: "assistant", content: response.data.message },
      ]);
  
      form.reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };
  

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversational model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitForm)}
              className="rounded-lg border w-full p-2 px-3 sm:px-5 md:px-3 shadow-md flex items-center gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent sm:pl-2"
                        disabled={isLoading}
                        placeholder="Ask something..."
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-black text-white flex justify-center items-center h-8 w-8 mt-1 sm:mt-0 sm:h-9 sm:w-9 p-2 rounded-full text-2xl cursor-pointer hover:bg-black/70"
              >
                <ArrowRight />
              </button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-2 py-4">
          {isLoading && (
            <div className="pt-5 rounded-lg w-full flex items-center justify-center">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="Start conversation with CreaFive" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.slice().reverse().map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-2 w-full",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <div
                  className={cn(
                    "p-4 max-w-[70%] flex items-start gap-x-8 rounded-lg",
                    message.role === "user" ? "border border-black/10" : "bg-muted"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;



