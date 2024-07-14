"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableContent from '@/components/Table'
import { Input } from "@/components/ui/input";
import Link from "next/link";
import PaginationComp from "@/components/Pegination";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getRecordCount } from "@/action/tabledata";



// import { useRouter } from "next/navigation";


interface userdata {
    id: string;
    age: number,
    city: string,
    email: string,
    name: string
}



export default function Page({ params }: { params: { slug: string[] } }) {

    const page = useRef<number>(1)

    const [data, setdata] = useState<userdata[]>([])
    const [count, setCount] = useState<number>(1)


    const [isloading, setloading] = useState(false)

    const router = useRouter()
    const pathname = usePathname()









    // event: KeyboardEvent<HTMLInputElement>



    function sortTable(e: React.ChangeEvent<HTMLInputElement>) {

        const searchValue = e.target.value;
        const allTableRow = document.querySelectorAll('tbody tr')


        allTableRow.forEach(e => {


            const eachRowData = Array.from(e.querySelectorAll('td'));


            // console.log('this row data', e)

            let found = false;


            found = eachRowData.some(cell => {
                if (cell.innerText.toLowerCase().includes(searchValue.toLowerCase())) {
                    console.log("this row matched", e);
                    return true; // Stops the loop when the condition is met
                }
                return false;
            });


            if (found) {
                e.classList.remove('hidden')
                e.classList.add('visible')
            } else {
                e.classList.remove('visible')
                e.classList.add('hidden')
            }

        })

    }



    async function getData(category: string, pageNumber: number) {

        setloading(true)
        const req = await fetch(`/api?category=${category}&page=${pageNumber}`)
        const res = await req.json()

        setdata(res.data)

        setloading(false)

    }





    function handlingNumber(pageNumber: number) {


        page.current = pageNumber
        router.push(`${pathname}?page=${pageNumber}`)

        getData(params.slug[0], pageNumber)


    }




    const fetchCountData = async () => {
        try {
            // Call the async function to get the count
            const countResult = await getRecordCount(params.slug[0]);

            setCount(Math.ceil(countResult.count));

            //   console.log(countResult);

        } catch (error) {
            console.error('Error fetching count:', error);
        }
    };

  



    useEffect(() => {

        getData(params.slug[0], 1)
        fetchCountData()

    }, [])


    return (
        <div className="container flex flex-col justify-center   items-center h-dvh overflow-scroll">

            <Input type="text" className="w-[300px] m-2 self-end" placeholder="search..." onChange={sortTable} />
            <Tabs defaultValue={`${params.slug[0]}`} className="w-full overflow-hidden h-3/4">


                <TabsList className="w-full flex justify-around">
                    <Link href="/datatable/all">
                        <TabsTrigger value="all">All</TabsTrigger>
                    </Link>

                    <Link href="/datatable/children">
                        <TabsTrigger value="children">Children</TabsTrigger>
                    </Link>

                    <Link href="/datatable/adult">
                        <TabsTrigger value="adult">Adult</TabsTrigger>
                    </Link>


                    <Link href="/datatable/elder">
                        <TabsTrigger value="elder">
                            Elder
                        </TabsTrigger>
                    </Link>

                </TabsList>

                <TabsContent value={`${params.slug[0]}`} className=" overflow-scroll h-[90%]">


                    {isloading ? "Loading Data...." : <TableContent data={data} />}


                </TabsContent>


            </Tabs>
            <div className="text-right text-slate-400 m-2">{`${(page.current - 1) * 20 + 1}-${page.current * 20} of ${count}`}</div>
            <PaginationComp pageNumber={page.current} handlingNumber={handlingNumber} category={params.slug[0]} count={count} />
        </div>
    );
}