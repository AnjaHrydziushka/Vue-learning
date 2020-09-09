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
    </div>

    <product-tabs :reviews="reviews"></product-tabs>

  </div>`,
  data() {
      return {
        brand: "Vyshymaika",
        product: "T-shirt",
        selectedVariant: 0,
        sizes: ["S", "M", "L", "XL"],
        reviews: [],
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
    },
    addReview(productReview) {
        this.reviews.push(productReview)
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

Vue.component('product-review', {
    template:
    `<form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
        <b>Please, correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <p>Would you recommend this product?</p>
        <label>
          Yes
          <input type="radio" value="Yes" v-model="recommend"/>
        </label>
        <label>
          No
          <input type="radio" value="No" v-model="recommend"/>
        </label>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>`,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: [],
            recommend: null
        }
    },
    methods: {
        onSubmit() {
            if(this.name && this.rating && this.review && this.recommend) {
               let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
                recommend: this.recommend
            }
            this.$emit('review-submitted', productReview),
            this.name = null,
            this.review = null,
            this.rating = null,
            this.recommend = null
            } else {
                if(!this.name) this.errors.push("Name required")
                if(!this.review) this.errors.push("Review required")
                if(!this.rating) this.errors.push("Rating required")
                if(!this.recommend) this.errors.push("Please, answer the question")
            }
            
        }
    }
})

Vue.component("product-tabs", {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template:
    `<div>
        <span class="tab"
            :class="{ activeTab: selectedTab === tab }"
            v-for="(tab, index) in tabs" 
            :key="index" 
            @click="selectedTab = tab">
        {{ tab }}
        </span>
        <div v-show="selectedTab === 'Reviews'">
        <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul v-else>
                <li v-for="(review, index) in reviews" :key="index">
                    <p>{{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>
    <product-review v-show="selectedTab === 'Make a review'" @review-submitted="addReview"></product-review>
    </div>
    `,
    data() {
        return {
            tabs: ["Reviews", "Make a review"],
            selectedTab: "Reviews"
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