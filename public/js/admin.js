const deleteProduct = async (btn) => {
    const productId = btn.parentNode.querySelector("[name=productId]").value;
    const csrf = btn.parentNode.querySelector("[name=_csrf]").value;

    const productElement = btn.closest("article");

    try {
        const result = await fetch("/admin/product/" + productId, {
            method: "DELETE",
            headers: {
                "csrf-token": csrf,
            },
        });

        const data = await result.json();
        if (result.ok) {
            productElement.remove();
        }

        console.log(data);
    } catch (error) {
        console.log(error);
    }
};
