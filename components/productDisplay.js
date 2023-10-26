app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
        /*html*/
        `<div class="product-display">
        <div class="product-container">
            <div class="product-image">
            <!-- Challenge out-of-stock-img -->
            <img :src="image" :class="{'out-of-stock-img': !inStock}">
            </div>
            <div class="product-info">
            <h1>{{ isSale }}</h1>
            <!-- Condition -->
            <p v-if="inStock">In Stock</p>
            <!-- <p v-else-if="inventory <= 10 && inventory > 0">Almost out of stock</p> -->
            <p v-else>Out of Stock</p>
            <!-- Chalengen Description -->
            <p>Shipping: {{ shipping }}</p>
            <p>{{ description }}</p>
            <!-- Challenge link -->
            <product-details></product-details>
            <span v-for="size in sizes">{{ size }}, </span>
            <!-- Challenge Size -->
            <br>
            <a :href="url" target="_blank">More</a>
            
            <!-- Showing Variant -->
            <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)"
            class="color-circle" :style="{ backgroundColor: variant.color}">
            </div>
            <!-- Add to cart -->
            <button class="button" :class="{ disabledButton: !inStock}" :disabled="!inStock" @click="addToCart">Add to cart</button>
            <!-- Challenge Add to cart -->
            <button class="button" @click="removeFromCart" >Remove Item</button>
            <!-- Binding -->
            </div>
            </div>
            <review-list v-if="reviews.length" :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"></review-form>
        </div>`,
    data() {
        return {
            brand: '(Raelf)',
            product: ['Amelia Watson Figure', 'Gawr Gura Figure'],
            description: 'Each figure typically stands around 17-20cm in height and the series features a vast selection of characters from popular anime and game series, with many more to be added soon!',
            url: 'https://kyou.id/items/126348/pop-up-parade-figure-watson-amelia-hololive-production',
            // inventory: 8,
            selectedVariant: 0,
            // inStock: false,
            onSale: true,    
            variants: [
                { id: 2004, model: 'Amelia Watson', color: 'orange', image: './assets/images/watson_amelia_figure.jpg', quantity: 8},
                { id: 2005, model: 'Gawr Gura', color: 'blue', image: './assets/images/gawr_gura_figure.jpg', quantity: 0},
            ],
            sizes: ['17cm', '18cm', '19cm', '20cm'],
            decrement: true,
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review) {
            this.reviews.push(review)
        }
    },
    computed: { 
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        isSale() {
            if(this.variants[this.selectedVariant].quantity >= 1) {
                return this.brand + ' ' + this.product[0] + ' Is on Sale'
            } else {
                return this.brand + ' ' + this.product[1] + ' Not on Sale'
            }
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            } else {
                return 2.99
            }
        }
    }
})