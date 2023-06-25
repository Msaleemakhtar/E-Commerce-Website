



import {sql} from "@vercel/postgres"
import {drizzle}  from "drizzle-orm/vercel-postgres"
import { InferModel } from 'drizzle-orm';
import {integer, pgTable,  varchar} from 'drizzle-orm/pg-core';


export const cartTable = pgTable("cart", {
    product_id: varchar("product_id",{length: 255}).notNull(),
    user_id: varchar("user_id",{length: 255}).notNull(),
    quantity: integer("quantity"),
    price : integer("price"),
})



export type cartType = InferModel<typeof cartTable>

export const db = drizzle(sql)