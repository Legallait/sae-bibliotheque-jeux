require('dotenv').config();
const DataRetriever = require('./services/DataRetriever');

const dataRetriever = new DataRetriever(process.env.CLIENT_ID, process.env.ACCESS_TOKEN)

async function example() {

    // R�cup�ration des 50 premiers jeux tri�s par popularit�
    // games : listes des jeux avec leur nom, les genres, la cover, la date de sortie
    // et la note moyenne (temporaire en attendant d'avoir les notes des utilisateurs)
    let data = await dataRetriever.getCatalogByPopularity(50, 0);

    // R�cup�ration des des jeux 50 � 100 tri�s par sorties r�centes
    data = await dataRetriever.getCatalogByDate(50, 50);

    // R�cup�re toutes les informations d'un jeu sp�cifique
    const game = await dataRetriever.getGameInfo('1942')
}

example()