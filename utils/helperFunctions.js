export const getDiscountPErcentage=(originalPrice,discountedPrice)=>{
    const discount=originalPrice-discountedPrice;
    const discointPercent=(discount/originalPrice)*100;
    return discointPercent.toFixed(2);
};