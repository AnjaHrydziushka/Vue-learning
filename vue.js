Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `      <div class="product">
    <div class="product-image">
      <img :src="image" />
    </div>

    <div class="product-info">
      <h1>{{ title }}</h1>
      <p v-if="inStock">In Stock</p>
      <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>

      <p v-if="onSale">ON SALE!</p>
      <p v-else> </p>

      <p> Shipping: {{ shipping }} </p>

      <ul>
        <li v-for="size in sizes">{{ size }}</li>
      </ul>

      <div
        v-for="(variant, index) in variants"
        :key="variant.variantId"
        class="color-box"
        :style="{ backgroundColor: variant.variantColor }"
        @mouseover="updateProduct(index)"
      ></div>

      <button
        v-on:click="addToCart"
        :disabled="!inStock"
        :class="{ disabledButton: !inStock }"
      >
        Add to Cart
      </button>
      <p>
        <button
          v-on:click="removeFromCart"
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }"
        >
          Remove from Cart
        </button>
      </p>
      <div class="cart">
        <p>Cart ({{ cart }})</p>
      </div>
    </div>
  </div>`,
  data() {
      return {
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
      }
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
    },
    shipping() {
        if(this.premium) {
            return "Free"
        } return 2.99
    }
}
})

const app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})