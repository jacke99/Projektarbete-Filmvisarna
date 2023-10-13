

export default function calcTotalPrice(adult, child, senior) {
    const totalPrice = (adult * 140) + (child * 120) + (senior * 80)
    return totalPrice
}