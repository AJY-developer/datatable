import { TableBody, TableCell, TableRow } from "./ui/table";

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

export default function TableEntry({ data }: TableContentProps) {
  return (
    <>
  
        {data.map((record) => (
          <TableRow key={record.id}>
            <TableCell className="font-medium">{record.id}</TableCell>
            <TableCell>{record.name}</TableCell>
            <TableCell>{record.age}</TableCell>
            <TableCell className="text-right">{record.city}</TableCell>
            <TableCell className="text-right">{record.email}</TableCell>
          </TableRow>
        ))}
     
    </>
  );
}
