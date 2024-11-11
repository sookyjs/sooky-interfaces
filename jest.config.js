// jest.config.js
module.exports = {
  testEnvironment: "node", // Utilise l'environnement Node pour exécuter les tests
  collectCoverage: true, // Active la collecte de couverture
  coverageDirectory: "coverage", // Dossier où les rapports de couverture seront générés
  collectCoverageFrom: [
    "src/models/**/*.js", // Inclut tous les fichiers dans src/models pour la couverture
    "src/services/**/*.js", // Inclut tous les fichiers dans src/services pour la couverture
  ],
  coverageReporters: ["html", "text", "lcov"],
};