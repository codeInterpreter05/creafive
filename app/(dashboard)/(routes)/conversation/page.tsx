"use client"

import * as z from "zod";
import Heading from "@/components/heading";
import { ArrowRight, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";

import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ConversationPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmitForm = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
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
                                            placeholder="Ask CreaFive..."
                                            {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="bg-black text-white flex justify-center items-center h-8 w-8 mt-1 sm:mt-0 sm:h-10 sm:w-10 p-2 rounded-full text-2xl cursor-pointer hover:bg-black/70"
                            >
                                <ArrowRight />
                            </button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    Message Content
                </div>
            </div>
        </div>
    );
};

export default ConversationPage;
