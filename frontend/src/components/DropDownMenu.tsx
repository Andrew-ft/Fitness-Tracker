"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DropdownMenuCheckboxesProps {
  value: string
  onChange: (val: string) => void
}

export function DropdownMenuCheckboxes({ value, onChange }: DropdownMenuCheckboxesProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{value || "Status"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuCheckboxItem
          checked={value === "Active"}
          onCheckedChange={() => onChange("Active")}
        >
          Active
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={value === "Inactive"}
          onCheckedChange={() => onChange("Inactive")}
        >
          Inactive
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={value === "All"}
          onCheckedChange={() => onChange("All")}
        >
          All
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
