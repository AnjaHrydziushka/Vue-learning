const app = new Vue({
    el: '#app',
    data: {
        product: "T-shirt",
        image: "./assets/vyshymaika.jpg",
        onSale: true,
        sizes: ["S", "M", "L", "XL"],
        variants: [
            {
                variantId: 1,
                variantColor: "black"
            },
            {
                variantId: 2,
                variantColor: "white"
            }
        ]
    }
})