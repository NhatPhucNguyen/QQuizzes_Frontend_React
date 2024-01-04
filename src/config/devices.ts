//media queries to target landscape phones (576px), tablets (768px), laptops (992px) and extra large desktop screens (1200px).
const breakpoints = {
    s: "576px",
    m:"768px",
    lg:"1024px",
    xl:"1200px"
};
export const devices = {
    phones:`max-width: ${breakpoints.s}`,
    tablets:`max-width: ${breakpoints.m}`,
    laptops:`max-width: ${breakpoints.lg}`,
    desktops:`max-width: ${breakpoints.xl}`,
}