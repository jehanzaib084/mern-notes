import ratelimit from "../config/upstash.js"


const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit")

    if (!success) {
      return res.status(429).json({ message: "damn too many requests chill man" })
    }

    next()
  } catch (error) {
    console.error("rate limit failed", error)
    next(error)
  }
}

export default rateLimiter
