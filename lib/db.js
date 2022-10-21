import { PrismaClient } from '@prisma/client'

let prisma

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            log: ['query', 'info', 'warn', 'error'],
        })  
    }
    prisma = global.prisma
}

export default prisma

// import { PrismaClient } from "@prisma/client";
// if (process.env.NODE_ENV === 'production') {
//     const prisma = new PrismaClient();
// } else {
//     const prisma = new PrismaClient({
//         log: ['query', 'info', 'warn', 'error']
//     })
// }
// export default prisma;
