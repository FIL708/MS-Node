const handler = async (req: Request) => {
    console.log("Method:", req.method);

    const url = new URL(req.url);
    console.log("Path:", url.pathname);
    console.log("Query parameters:", url.searchParams);

    console.log("Headers:", req.headers);

    if (req.body) {
        const body = await req.text();
        console.log("Body:", body);
    }

    return new Response("Hello, World!");
};

Deno.serve({ port: 3000 }, handler);
