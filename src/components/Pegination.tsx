


import { Pagination } from "@nextui-org/pagination";




interface peginationParam{
  category:string,
    pageNumber:number,
    count:number,
    handlingNumber:(pageNumber: number)=>void
}




export default  function PaginationComp({pageNumber,handlingNumber,count}:peginationParam) {

   

 



    return (
        <Pagination showControls total={count?Math.ceil(count/20):1} initialPage={pageNumber} onChange={handlingNumber} />
    );
}

