Vue.component('product-review', {
    template:
    `<input v-model="name">`,
    data() {
        return {
            name: null
        }
    }
})

Vue.component('product-sizes', {
    props: {
        sizes: {
            type: Array,
            required: true
        }
    },
    template:
    `<ul>
        <li v-for="size in sizes"> {{ size }} </li>
     </ul>`
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: 
    `<div class="product">
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

      <product-sizes :sizes="sizes"></product-sizes>

      <div
        v-for="(variant, index) in variants"
        :key="variant.variantId"
        class="color-box"
        :style="{ backgroundColor: variant.variantColor }"
        @mouseover="updateProduct(index)"
      >
      </div>
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

      <product-review></product-review>
      
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
        ]
      }
},
methods: {
    addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    updateProduct(index) {
        this.selectedVariant = index
    },
    removeFromCart() {
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
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
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeCart(id) {
            for(const i = this.cart.length - 1; i>=0; i--) {
                if(this.cart[i] === id) {
                    this.cart.splice(i, 1)
                }
            }
        }
    } 
})