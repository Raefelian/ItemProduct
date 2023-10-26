app.component('product-details', {
    /*html*/
    template: 
    `<ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>`,
    data() {
        return {
            details: ['60% Vinyl', '25% Resin', '15% Polypropylene'],
        }
    }
}) 