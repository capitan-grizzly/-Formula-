const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getLessons = async (req, res) => {
    try {
        const lessons = await prisma.lesson.findMany();
        res.status(200).json(lessons);
    } catch (error) {
        console.error("Error al obtener lecciones:", error);
        res.status(500).json({ error: 'Error interno del servidor al obtener las lecciones' });
    }
};

const getLessonBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const lesson = await prisma.lesson.findUnique({
            where: { slug: slug },
            include: { challenges: true }
        });

        if (!lesson) {
            return res.status(404).json({ error: 'Lección no encontrada' });
        }

        res.status(200).json(lesson);
    } catch (error) {
        console.error(`Error al obtener la lección con slug ${slug}:`, error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getLessons,
    getLessonBySlug
};