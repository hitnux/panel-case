const options = { hour: 'numeric', minute: 'numeric', year: 'numeric', month: 'long', day: 'numeric' };

const formatDate = (date) => {
    return new Date(date).toLocaleDateString("tr-TR", options)
}

const formatCurrency = (price) => {
    return `${price.toFixed(2).replace('.', ',')} TL`
}
export { formatDate, formatCurrency };