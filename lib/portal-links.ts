// Where real keys and the live, working API live. The portal never stores or
// shows a key: keys are issued by the Journey price feed and shown once there.
export const PRICE_SITE = "https://price.journeyfoods.io"
export const TRIAL_KEY_URL = `${PRICE_SITE}/trial`
export const SUBSCRIBE_URL = `${PRICE_SITE}/checkout`
export const CONNECT_URL = `${PRICE_SITE}/connect`
export const SAMPLE_ENDPOINT = `${PRICE_SITE}/api/v1/sample`
export const ACCOUNT_ENDPOINT = `${PRICE_SITE}/api/v1/account`
export const SUPPORT_URL = "https://www.journeyfoods.com/contact"

/** Slug used in #endpoint-… links, e.g. "/v3/ingredients/{id}/nutrients" → "ingredients-nutrients". */
export function endpointSlug(path: string) {
  return path
    .replace(/^\/v\d+\//, "")
    .replace(/\{[^}]+\}\/?/g, "")
    .replace(/\/$/, "")
    .replace(/\//g, "-")
}
