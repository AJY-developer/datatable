

export function middleware(req: Request) {




  // if((req.url=="http://localhost:3000/")||(req.url=="http://localhost:3000/datatable"))
  if ((req.url == "https://datatabel.vercel.app/")
    || (req.url == "https://datatabel.vercel.app/datatable"
      || req.url == "http://localhost:3000/") ||
    (req.url == "http://localhost:3000/datatable"))

    return Response.redirect(new URL('/datatable/all', req.url))
}


export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}