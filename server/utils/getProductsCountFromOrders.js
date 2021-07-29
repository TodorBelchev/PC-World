module.exports = (orders) => {
    let processors = 0;
    let notebooks = 0;
    let cases = 0;
    let coolers = 0;
    let HDDs = 0;
    let memories = 0;
    let monitors = 0;
    let motherboards = 0;
    let PSUs = 0;
    let SSDs = 0;
    let VGAs = 0;
    orders.forEach(x => {
        x.products.forEach(y => {
            if (y.onModel === 'Processor') {
                processors += y.purchaseQuantity;
            } else if (y.onModel === 'Notebook') {
                notebooks += y.purchaseQuantity;
            } else if (y.onModel === 'Case') {
                cases += y.purchaseQuantity;
            } else if (y.onModel === 'Cooler') {
                coolers += y.purchaseQuantity;
            } else if (y.onModel === 'Hdd') {
                HDDs += y.purchaseQuantity;
            } else if (y.onModel === 'Memory') {
                memories += y.purchaseQuantity;
            } else if (y.onModel === 'Monitor') {
                monitors += y.purchaseQuantity;
            } else if (y.onModel === 'Motherboard') {
                motherboards += y.purchaseQuantity;
            } else if (y.onModel === 'Psu') {
                PSUs += y.purchaseQuantity;
            } else if (y.onModel === 'Ssd') {
                SSDs += y.purchaseQuantity;
            } else if (y.onModel === 'Vga') {
                VGAs += y.purchaseQuantity;
            }
        })
    });
    return {
        processors, notebooks, cases, coolers, HDDs, memories,
        monitors, motherboards, PSUs, SSDs, VGAs
    }
}