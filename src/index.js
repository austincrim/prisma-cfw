import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  await prisma.log.create({
    data: {
      level: "Info",
      message: `${request.method} ${request.url}`,
      meta: {
        headers: JSON.stringify(request.headers)
      }
    }
  })
  return new Response(`request method: ${request.method}!`)
}
