import * as React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { products, stores } from "@/db/schema"
import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"
import { RocketIcon } from "@radix-ui/react-icons"
import { desc, eq, sql } from "drizzle-orm"

import { getSubscriptionPlan } from "@/lib/fetchers/stripe"
import { getDashboardRedirectPath, getPlanFeatures } from "@/lib/subscription"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import { StoreCard } from "@/components/cards/store-card"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { StoreCardSkeleton } from "@/components/skeletons/store-card-skeleton"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Stores",
  description: "Manage your stores",
}

export default async function StoresPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  const allStores = await db
    .select({
      id: stores.id,
      name: stores.name,
      description: stores.description,
      stripeAccountId: stores.stripeAccountId,
    })
    .from(stores)
    .leftJoin(products, eq(products.storeId, stores.id))
    .groupBy(stores.id)
    .orderBy(desc(stores.stripeAccountId), desc(sql<number>`count(*)`))
    .where(eq(stores.userId, user.id))

  const subscriptionPlan = await getSubscriptionPlan(user.id)

  const { maxStoreCount, maxProductCount } = getPlanFeatures(
    subscriptionPlan?.id
  )

  return (
    <Shell variant="sidebar">
      <PageHeader>
        <div className="flex space-x-4">
          <PageHeaderHeading size="sm" className="flex-1">
            Stores
          </PageHeaderHeading>
          <Link
            aria-label="Create store"
            href={getDashboardRedirectPath({
              storeCount: allStores.length,
              subscriptionPlan: subscriptionPlan,
            })}
            className={cn(
              buttonVariants({
                size: "sm",
              })
            )}
          >
            Create store
          </Link>
        </div>
        <PageHeaderDescription size="sm">
          Manage your stores
        </PageHeaderDescription>
      </PageHeader>
      <Alert>
        <RocketIcon className="h-4 w-4" aria-hidden="true" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You are currently on the{" "}
          <span className="font-semibold">{subscriptionPlan?.name}</span> plan.
          You can create up to{" "}
          <span className="font-semibold">{maxStoreCount}</span> stores and{" "}
          <span className="font-semibold">{maxProductCount}</span> products on
          this plan.
        </AlertDescription>
      </Alert>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <React.Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <StoreCardSkeleton key={i} />
          ))}
        >
          {allStores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              href={`/dashboard/stores/${store.id}`}
            />
          ))}
        </React.Suspense>
      </section>
    </Shell>
  )
}
