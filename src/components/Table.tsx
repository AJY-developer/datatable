import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import TableEntry from "@/components/TableEntry"


interface Userdata {
  id: string;
  age: number;
  city: string;
  email: string;
  name: string;
}

interface TableContentProps {
  data: Userdata[];
}





export default function ContentTable({ data }: TableContentProps) {
  return (
    <>

        <Table  >
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">User Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead className="text-right">City</TableHead>
          <TableHead className="text-right">Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

        {(data.length == 0) ?   <TableRow><TableCell className="font-medium">Not data found</TableCell> </TableRow>: <TableEntry data={data} />}

        

      </TableBody>


    </Table>

    </>

  )
}
