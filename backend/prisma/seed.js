const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Iniciando la carga de datos (seed)...');

        // 1. Limpiar las tablas respetando la integridad referencial
        // Primero se borran los desafíos porque dependen de las lecciones
        await prisma.challenge.deleteMany();
        await prisma.lesson.deleteMany();
        console.log('Tablas limpiadas correctamente.');

        // 2. Leer y parsear el archivo JSON
        const jsonPath = path.join(__dirname, '../data/lessons.json');
        const rawData = fs.readFileSync(jsonPath, 'utf8');
        const lessons = JSON.parse(rawData);

        let lessonsCount = 0;
        let challengesCount = 0;

        // 3. Iterar sobre las lecciones del JSON
        for (const lessonData of lessons) {
            // Extraer el array de challenges y dejar el resto de campos en lessonFields
            const { challenges, ...lessonFields } = lessonData;

            // Crear la lección sin el campo challenges
            const createdLesson = await prisma.lesson.create({
                data: lessonFields
            });
            lessonsCount++;

            // Si la lección tiene desafíos anidados, iterar sobre ellos para crearlos
            if (challenges && Array.isArray(challenges)) {
                for (const challengeData of challenges) {
                    await prisma.challenge.create({
                        data: {
                            ...challengeData, // Trae título, slug, categoría, etc. del JSON
                            lessonId: createdLesson.id // Vincula con la lección recién creada
                            // completed y status no se incluyen, Prisma usará los valores por defecto
                        }
                    });
                    challengesCount++;
                }
            }
        }

        // 4. Imprimir el resultado detallado
        console.log(`¡Éxito! Se insertaron ${lessonsCount} lecciones y ${challengesCount} desafíos en la base de datos.`);

    } catch (error) {
        console.error('Ocurrió un error al ejecutar el seed:', error);
        process.exit(1);
    } finally {
        // 5. Desconectar el cliente
        await prisma.$disconnect();
    }
}

main();