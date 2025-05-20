const express = require("express");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
// Chemin absolu vers le fichier projet.pl
const prologFilePath = path.resolve(__dirname, "projet.pl");

// Echappement plus robuste pour Prolog (guillemets doubles)
function formaterPourProlog(texte) {
  if (texte === undefined || texte === null) return '""';
  // Convertir en chaîne
  texte = String(texte);
  // Échapper les guillemets doubles
  const texteEchappe = texte.replace(/"/g, '\\"');
  return `"${texteEchappe}"`;
}

// Route pour ajouter une nouvelle info dynamique
app.post("/add-info", (req, res) => {
  const {
    source,
    fiabilite,
    auteur,
    reputation,
    references, // boolean true/false
    style,
    info,
    citations, // nombre
    emotion, // nombre 0-10
    description, // description de l'information
  } = req.body;

  // Vérification basique
  if (
    !source ||
    !fiabilite ||
    !auteur ||
    !reputation ||
    references === undefined ||
    !style ||
    !info ||
    citations === undefined ||
    emotion === undefined
  ) {
    return res.status(400).json({
      error:
        "Tous les champs sont requis (source, fiabilite, auteur, reputation, references, style, info, citations, emotion).",
    });
  }

  // Valeurs autorisées pour les enums
  const fiabiliteValeurs = ["fiable", "moyenne", "non_fiable"];
  const reputationValeurs = ["reconnu", "anonyme", "inconnu"];
  const styleValeurs = [
    "neutre",
    "emotionnel",
    "technique",
    "familier",
    "darija",
  ];

  // Validation des valeurs d'énumération
  if (!fiabiliteValeurs.includes(fiabilite)) {
    return res.status(400).json({
      error: `La valeur de fiabilité doit être l'une des suivantes: ${fiabiliteValeurs.join(
        ", "
      )}`,
    });
  }

  if (!reputationValeurs.includes(reputation)) {
    return res.status(400).json({
      error: `La valeur de réputation doit être l'une des suivantes: ${reputationValeurs.join(
        ", "
      )}`,
    });
  }

  if (!styleValeurs.includes(style)) {
    return res.status(400).json({
      error: `La valeur de style doit être l'une des suivantes: ${styleValeurs.join(
        ", "
      )}`,
    });
  }

  // Validation des valeurs numériques
  if (isNaN(parseInt(citations)) || citations < 0) {
    return res.status(400).json({
      error: "Le nombre de citations doit être un nombre entier positif",
    });
  }

  if (isNaN(parseInt(emotion)) || emotion < 0 || emotion > 10) {
    return res.status(400).json({
      error: "Le niveau d'émotion doit être un nombre entre 0 et 10",
    });
  }

  // Vérifier que le fichier Prolog existe
  if (!fs.existsSync(prologFilePath)) {
    return res.status(500).json({
      error: `Fichier Prolog non trouvé : ${prologFilePath}`,
    });
  }

  // Construction de la requête Prolog pour l'ajout
  const ajoutDateObj = new Date();
  const ajoutDate = `${ajoutDateObj.getFullYear()}-${String(
    ajoutDateObj.getMonth() + 1
  ).padStart(2, "0")}-${String(ajoutDateObj.getDate()).padStart(2, "0")}`;

  // Ajout direct des valeurs dans le fichier Prolog pour la persistance
  const ajoutDirect = () => {
    try {
      let contenuFichier = fs.readFileSync(prologFilePath, "utf8");

      // Ajouter les faits nécessaires
      let nouveauxFaits = [];

      // Vérifier si la source existe déjà
      if (!contenuFichier.includes(`source(${formaterPourProlog(source)},`)) {
        nouveauxFaits.push(
          `source(${formaterPourProlog(source)}, ${fiabilite}).`
        );
      }

      // Vérifier si l'auteur existe déjà
      if (!contenuFichier.includes(`auteur(${formaterPourProlog(auteur)},`)) {
        nouveauxFaits.push(
          `auteur(${formaterPourProlog(auteur)}, ${reputation}).`
        );
      }

      // Ajouter les relations
      nouveauxFaits.push(
        `source_fournit(${formaterPourProlog(source)}, ${formaterPourProlog(
          auteur
        )}, ${formaterPourProlog(info)}).`
      );

      if (
        references &&
        !contenuFichier.includes(
          `a_des_references(${formaterPourProlog(auteur)})`
        )
      ) {
        nouveauxFaits.push(`a_des_references(${formaterPourProlog(auteur)}).`);
      }

      nouveauxFaits.push(
        `utilise_style(${formaterPourProlog(auteur)}, ${style}).`
      );
      nouveauxFaits.push(
        `a_citations(${formaterPourProlog(info)}, ${citations}).`
      );
      nouveauxFaits.push(
        `langage_emotionnel(${formaterPourProlog(info)}, ${emotion}).`
      );
      nouveauxFaits.push(
        `date_publication(${formaterPourProlog(info)}, ${formaterPourProlog(
          ajoutDate
        )}).`
      );

      // Ajouter l'information avec sa description
      const infoDescription =
        description || "Information ajoutée dynamiquement";
      nouveauxFaits.push(
        `information(${formaterPourProlog(info)}, ${formaterPourProlog(
          infoDescription
        )}).`
      );

      // Ajouter les faits au fichier
      fs.appendFileSync(
        prologFilePath,
        "\n\n% Faits ajoutés dynamiquement le " +
          ajoutDate +
          "\n" +
          nouveauxFaits.join("\n")
      );

      return true;
    } catch (err) {
      console.error("Erreur lors de l'ajout direct au fichier:", err);
      return false;
    }
  };

  // Effectuer l'ajout direct
  if (!ajoutDirect()) {
    return res
      .status(500)
      .json({ error: "Échec de l'ajout direct au fichier Prolog" });
  }

  // Maintenant, évaluer l'information avec le prédicat Prolog
  const prologEval = spawn("swipl", [
    "-s",
    prologFilePath,
    "-g",
    `evaluer_info(${formaterPourProlog(
      info
    )}, Fiabilite, ScoreSource, ScoreAuteur, ScoreCitations, ScoreLangage, ScoreContradiction, Explication), 
           format("~w~n~w~n~w~n~w~n~w~n~w~n~w~n", [Fiabilite, ScoreSource, ScoreAuteur, ScoreCitations, ScoreLangage, ScoreContradiction, Explication]), halt`,
  ]);

  let sortieEval = "";
  let erreurEval = "";

  prologEval.stdout.on("data", (data) => {
    sortieEval += data.toString();
  });

  prologEval.stderr.on("data", (data) => {
    erreurEval += data.toString();
  });

  prologEval.on("close", (codeEval) => {
    if (codeEval !== 0) {
      console.error("Erreur Prolog évaluation:", erreurEval);
      return res.status(500).json({
        error: "Erreur évaluation fait Prolog",
        details: erreurEval,
      });
    }

    const lignes = sortieEval.trim().split("\n");
    if (lignes.length < 7) {
      return res.status(500).json({
        error: "Réponse Prolog inattendue",
        details: sortieEval,
        lignes: lignes.length,
      });
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

    // Joindre toutes les lignes restantes pour l'explication
    const explicationRaw = explicationParts.join("\n").trim();
    const explicationClean = explicationRaw
      .replace(/\r/g, "")
      .replace(/\n/g, " ");

    res.json({
      success: true,
      message: "Information ajoutée et évaluée avec succès",
      resultat: {
        niveau: niveau.trim(),
        scoreSource: parseFloat(scoreSource),
        scoreAuteur: parseFloat(scoreAuteur),
        scoreCitations: parseFloat(scoreCitations),
        scoreLangage: parseFloat(scoreLangage),
        scoreContradiction: parseFloat(scoreContradiction),
        explication: explicationClean,
      },
    });
  });
});

// Route pour analyser une info existante (évaluation uniquement)
app.post("/analyze", (req, res) => {
  const texteOriginal = req.body.text;
  if (!texteOriginal)
    return res.status(400).json({ error: "Champ 'text' requis." });
  const texteProlog = formaterPourProlog(texteOriginal);

  const prolog = spawn("swipl", [
    "-s",
    prologFilePath,
    "-g",
    `evaluer_info(${texteProlog}, Fiabilite, ScoreSource, ScoreAuteur, ScoreCitations, ScoreLangage, ScoreContradiction, Explication),
           format("~w~n~w~n~w~n~w~n~w~n~w~n~w~n", [Fiabilite, ScoreSource, ScoreAuteur, ScoreCitations, ScoreLangage, ScoreContradiction, Explication]), halt`,
  ]);

  let sortie = "";
  let erreur = "";

  prolog.stdout.on("data", (data) => {
    sortie += data.toString();
  });

  prolog.stderr.on("data", (data) => {
    erreur += data.toString();
  });

  prolog.on("close", (code) => {
    if (code !== 0) {
      console.error("Erreur Prolog évaluation:", erreur);
      return res
        .status(500)
        .json({ error: "Erreur interne Prolog", details: erreur });
    }

    const lignes = sortie.trim().split("\n");
    if (lignes.length < 7) {
      return res.status(500).json({
        error: "Réponse Prolog inattendue",
        details: sortie,
      });
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

    // Joindre toutes les lignes restantes pour l'explication
    const explicationRaw = explicationParts.join("\n").trim();
    const explicationClean = explicationRaw
      .replace(/\r/g, "")
      .replace(/\n/g, " ");

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

// Nouvelle route pour lister toutes les informations disponibles

// Ajout d'une route pour tester que le serveur est en marche

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
  console.log(`Fichier Prolog: ${prologFilePath}`);
});
