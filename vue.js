const app = new Vue({
    el: '#app',
    data: {
        product: "T-shirt",
        image: "./assets/vyshymaika-white.jpg",
        onSale: true,
        sizes: ["S", "M", "L", "XL"],
        variants: [
            {
                variantId: 1,
                variantColor: "black",
                variantImage: "./assets/vyshymaika-black.jpg"
            },
            {
                variantId: 2,
                variantColor: "white",
                variantImage: "./assets/vyshymaika-white.jpg"
            }
        ],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(variantImage) {
            this.image = variantImage
        },
        removeFromCart() {
            this.cart -= 1
        }
    }
})