const app = new Vue({
    el: '#app',
    data: {
        brand: "Vyshymaika",
        product: "T-shirt",
        selectedVariant: 0,
        sizes: ["S", "M", "L", "XL"],
        variants: [
            {
                variantId: 1,
                variantColor: "black",
                variantImage: "./assets/vyshymaika-black.jpg",
                variantQuantity: 10,
                variantOnSale: true
            },
            {
                variantId: 2,
                variantColor: "white",
                variantImage: "./assets/vyshymaika-white.jpg",
                variantQuantity: 0,
                variantOnSale: false
            }
        ],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
        removeFromCart() {
            this.cart -= 1
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        onSale() {
            return this.variants[this.selectedVariant].variantOnSale
        }
    }
})