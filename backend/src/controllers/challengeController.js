const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getChallenges = async (req, res) => {
    try {
        const challenges = await prisma.challenge.findMany();
        res.status(200).json(challenges);
    } catch (error) {
        console.error("Error al obtener desafíos:", error);
        res.status(500).json({ error: 'Error interno del servidor al obtener los desafíos' });
    }
};

const getChallengeBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const challenge = await prisma.challenge.findUnique({
            where: { slug: slug },
            include: { lesson: true }
        });

        if (!challenge) {
            return res.status(404).json({ error: 'Desafío no encontrado' });
        }

        res.status(200).json(challenge);
    } catch (error) {
        console.error(`Error al obtener el desafío con slug ${slug}:`, error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getChallenges,
    getChallengeBySlug
};