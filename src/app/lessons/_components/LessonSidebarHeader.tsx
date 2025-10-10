import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SidebarHeader() {
  return (
    <header className="bg-background flex justify-between sticky top-0 h-16 shrink-0 items-center gap-2 border-b px-4 z-50">
      <SidebarTrigger className="-ml-1 flex sticky md:hidden bg-background" />
      <Search className="md:hidden" size={20} />
      <Input
        className="hidden w-full md:flex xl:w-1/3"
        type="search"
        placeholder="Find something"
      />
      <div className="hidden xl:flex items-center gap-6">
        {NAVIGATION_ITEMS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </header>
  );
}