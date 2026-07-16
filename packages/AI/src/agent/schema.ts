import { prisma } from "@repo/db";

export async function schemaAgent() {
  const schema = await prisma.$queryRawUnsafe(`
SELECT
table_name,
column_name,
data_type
FROM information_schema.columns
WHERE table_schema='public'
ORDER BY table_name, ordinal_position
`);
  const relations = await prisma.$queryRawUnsafe(`
  SELECT
    tc.table_name AS from_table,
    kcu.column_name AS from_column,
    ccu.table_name AS to_table,
    ccu.column_name AS to_column
  FROM information_schema.table_constraints tc
  JOIN information_schema.key_column_usage kcu
    ON tc.constraint_name = kcu.constraint_name
  JOIN information_schema.constraint_column_usage ccu
    ON ccu.constraint_name = tc.constraint_name
  WHERE tc.constraint_type = 'FOREIGN KEY';
`);
  return {
    schema,
    relations,
  };
}
