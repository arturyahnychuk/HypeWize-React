interface pricingOffers {
    text: string,
    main?: string
}
export interface PricingCardsProps {
  title: string;
  planTitle: string;
  offers: pricingOffers[];
}
