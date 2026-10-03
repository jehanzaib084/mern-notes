import { ZapIcon } from "lucide-react"

function RateLimitedUI() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-primary/10 border border-primary/30 rounded-lg flex flex-col md:flex-row items-center gap-6 p-6">
        <div className="bg-primary/20 p-4 rounded-full">
          <ZapIcon className="size-10 text-primary" />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-2">Rate Limit Reached</h3>
          <p>You made too many requests. Wait a few seconds and try again.</p>
        </div>
      </div>
    </div>
  )
}

export default RateLimitedUI
