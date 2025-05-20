const express = require("express");
const { spawn } = require("child_process");
const app = express();

app.use(express.json());
function formaterPourProlog(texte) {
  const texteEchappe = texte.replace(/"/g, '\\"');
  return `"${texteEchappe}"`;
}

app.post("/analyze", (req, res) => {
  // Note : Échapper les guillemets simples dans texte pour éviter erreurs Prolog
  const texteOriginal = req.body.text; // ex: politique_eau_maroc
  const texteProlog = formaterPourProlog(texteOriginal);

  const prolog = spawn("swipl", [
    "-s",
    "projet.pl",
    "-g",
    `evaluer_info(${texteProlog}, Fiabilite, ScoreSource, ScoreAuteur, ScoreCitations, ScoreLangage, ScoreContradiction, Explication), ` +
      `format("~w~n~w~n~w~n~w~n~w~n~w~n~w~n", [Fiabilite, ScoreSource, ScoreAuteur, ScoreCitations, ScoreLangage, ScoreContradiction, Explication])`,
    "-t",
    "halt",
  ]);

  let sortie = "";
  prolog.stdout.on("data", (data) => {
    sortie += data.toString();
  });

  prolog.stderr.on("data", (data) => {
    console.error(`Prolog stderr: ${data}`);
  });

  prolog.on("close", (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: "Erreur interne Prolog" });
    }
    const lignes = sortie.trim().split("\n");

    if (lignes.length < 7) {
      return res.status(500).json({ error: "Réponse Prolog inattendue" });
    }

    const [
      niveau,
      scoreSource,
      scoreAuteur,
      scoreCitations,
      scoreLangage,
      scoreContradiction,
      ...explicationParts
    ] = lignes;
    const explication = explicationParts.join("\n"); // reconstruire l'explication complète
    const explicationClean = explication
      .replace(/\r\n/g, "\n")
      .replace(/\n/g, " ")
      .trim();

    res.json({
      niveau: niveau.trim(),
      scoreSource: parseFloat(scoreSource),
      scoreAuteur: parseFloat(scoreAuteur),
      scoreCitations: parseFloat(scoreCitations),
      scoreLangage: parseFloat(scoreLangage),
      scoreContradiction: parseFloat(scoreContradiction),
      explication: explicationClean,
    });
  });
});

app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
