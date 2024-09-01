"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { 
    Sheet, 
    SheetContent, 
    SheetTrigger 
} from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";

const MobileSidebar = () => {
    return (
        <Sheet >
            <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-none outline-none">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
