import { type Metadata } from "next"
import { env } from "@/env.mjs"

import { getStores } from "@/lib/fetchers/store"
import { storesSearchParamsSchema } from "@/lib/validations/params"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { Stores } from "@/components/stores"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Stores",
  description: "Buy stores from our stores",
}

interface StoresPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function StoresPage({ searchParams }: StoresPageProps) {
  const { page, per_page, sort, statuses } =
    storesSearchParamsSchema.parse(searchParams)

  // Stores transaction
  const pageAsNumber = Number(page)
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber
  const perPageAsNumber = Number(per_page)
  const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0

  const storesTransaction = await getStores({
    limit,
    offset,
    sort,
    statuses,
  })

  const pageCount = Math.ceil(storesTransaction.count / limit)

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">Stores</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Buy products from our stores
        </PageHeaderDescription>
      </PageHeader>
      <Stores stores={storesTransaction.items} pageCount={pageCount} />
    </Shell>
  )
}
