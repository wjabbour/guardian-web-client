export function calculate_item_count(cart) {
    let count = 0;

    Object.keys(cart).forEach((k) => {
        count += cart[k].quantity
    })

    return count
}

export function calculate_item_price(cart) {
    let price = 0;

    Object.keys(cart).forEach((k) => {
        price += cart[k].price * cart[k].quantity
    })

    return price.toFixed(2)
}