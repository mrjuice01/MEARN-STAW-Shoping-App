import type { Metadata } from "next"
import { type Product } from "@/db/schema"
import { env } from "@/env.mjs"

import { getProducts } from "@/lib/fetchers/product"
import { getStores } from "@/lib/fetchers/store"
import { toTitleCase, unslugify } from "@/lib/utils"
import { productsSearchParamsSchema } from "@/lib/validations/params"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Products } from "@/components/products"
import { Shell } from "@/components/shells/shell"

interface SubcategoryPageProps {
  params: {
    category: Product["category"]
    subcategory: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export function generateMetadata({ params }: SubcategoryPageProps): Metadata {
  const subcategory = unslugify(params.subcategory)

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: toTitleCase(subcategory),
    description: `Buy the best ${subcategory}`,
  }
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: SubcategoryPageProps) {
  const { category, subcategory } = params
  const { page, per_page, sort, price_range, store_ids, store_page, active } =
    productsSearchParamsSchema.parse(searchParams)

  // Products transaction
  const limit = typeof per_page === "string" ? parseInt(per_page) : 8
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0

  const productsTransaction = await getProducts({
    limit,
    offset,
    sort: typeof sort === "string" ? sort : null,
    categories: category,
    subcategories: subcategory,
    price_range: typeof price_range === "string" ? price_range : null,
    store_ids: typeof store_ids === "string" ? store_ids : null,
    active,
  })

  const pageCount = Math.ceil(productsTransaction.count / limit)

  // Stores transaction
  const storesLimit = 25
  const storesOffset =
    typeof store_page === "string"
      ? (parseInt(store_page) - 1) * storesLimit
      : 0

  const storesTransaction = await getStores({
    limit: storesLimit,
    offset: storesOffset,
    sort: "productCount.desc",
  })

  const storePageCount = Math.ceil(storesTransaction.count / storesLimit)

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">
          {toTitleCase(unslugify(subcategory))}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {`Buy the best ${unslugify(subcategory)}`}
        </PageHeaderDescription>
      </PageHeader>
      <Products
        products={productsTransaction.items}
        pageCount={pageCount}
        stores={storesTransaction.items}
        storePageCount={storePageCount}
      />
    </Shell>
  )
}
