import { PrismaClient } from '@prisma/client'

export default {
  async fetch(request) {
    const prisma = new PrismaClient()
    let result = await prisma.todo.findMany()
    return new Response(JSON.stringify(result))
  }
}
