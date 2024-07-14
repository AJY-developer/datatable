"use server"

import { prisma } from "@/lib/prisma"





async function getRecordCount(category: string) {
  "use server"

  let recordcount = 0;

  async function getCount(intial: number, last: number) {
    const recordCount = await prisma.people.count({
      where: {
        age: {
          gte: intial,
          lte: last
        }
      }
    })

    return recordCount
  }



  if (category == 'all')
    recordcount = await getCount(10, 100)
  else if (category == "children")
    recordcount = await getCount(10, 17)
  else if (category == "adult")
    recordcount = await getCount(18, 59)
  else {
    recordcount = await getCount(60, 100)
  }



  return { count: recordcount }
}









export { getRecordCount }

