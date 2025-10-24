export const formatPriceWithRate = (priceUSD, rate) => {
  const formattedUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(priceUSD);

  const priceSom = priceUSD * (rate || 0);
  const formattedSom = new Intl.NumberFormat("uz-UZ").format(
    Math.round(priceSom)
  );

  return { usd: formattedUSD, som: `${formattedSom} so'm` };
};
