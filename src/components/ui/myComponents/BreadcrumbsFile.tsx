import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface Props {
  id?: string;
  name?: string;
}

export function BreadcrumbWithCustomSeparator({id, name}: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-md font-semibold font-body">
          <BreadcrumbLink asChild>
            <Link href="/dashboard/projects">Projects</Link>
          </BreadcrumbLink>
        </BreadcrumbItem >
        <BreadcrumbSeparator className="font-semibold" />
        <BreadcrumbItem className="text-md font-semibold font-body text-foreground">
          <BreadcrumbLink asChild >
            <Link href={`/dashboard/${id}`}>{name}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
