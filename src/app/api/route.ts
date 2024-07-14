import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'


async function getUser(initial: number, last: number, pageNumber: number) {

    const userRecords = await prisma.people.findMany({
        where: {
            age: {
                lte: last,
                gte: initial
            }
        },
        skip: (pageNumber - 1) * 20,
        take: 20,
    })

    return userRecords;

}



export async function GET(req: NextRequest) {


    try {


        let userRecords = {};

        const params = req.nextUrl.searchParams

        const category = params.get('category')

        const pageStr = params.get('page') as string

        const page = parseInt(pageStr)



        if (category == 'all')
            userRecords = await getUser(10, 100, page)
        else if (category == "children")
            userRecords = await getUser(10, 17, page)
        else if (category == "adult")
            userRecords = await getUser(18, 59, page)
        else {
            userRecords = await getUser(60, 100, page)
        }



        return Response.json({ status: 200, message: "data fetched",data:userRecords })

    } catch (error:any) {
        console.log(error)
        return Response.json({ status: 500, message: "internal server error",error:error.message })
    }
}