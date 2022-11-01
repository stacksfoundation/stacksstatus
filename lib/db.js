import { PrismaClient } from '@prisma/client'

let prisma

prisma = new PrismaClient()
// if (process.env.NODE_ENV === 'production') {
//     prisma = new PrismaClient()
// } else {
//     if (!global.prisma) {
//         global.prisma = new PrismaClient({
//             log: ['query', 'info', 'warn', 'error'],
//         })  
//     }
//     prisma = global.prisma
// }

export default prisma

