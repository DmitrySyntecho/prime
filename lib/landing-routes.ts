/** Ad landings under /lp/* bring their own light header/footer, so the site chrome
 *  (header, footer, mobile bottom nav, floating quote bubble) stays out of the way. */
export const isLandingPath = (pathname?: string | null) => !!pathname?.startsWith("/lp/")
