const text = "This is a test - and it should be stored in a file!";

const encoder = new TextEncoder();

const data = encoder.encode(text);

Deno.writeFile("message.txt", data)
    .then(() => {
        console.log("Stored!");
    })
    .catch((error) => console.log(error));
