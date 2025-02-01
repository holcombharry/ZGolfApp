export const calculateStrokeScore = (playerScorecard, courseScorecard) => {
    let totalStrokes = 0;
    let totalPar = 0;
  
    for (let i = 0; i < playerScorecard.length; i++) {
      const playerScore = playerScorecard[i];
      const par = courseScorecard[i];
  
      if (playerScore !== null && playerScore !== undefined) {
        totalStrokes += playerScore;
        totalPar += par;
      }
    }
  
    return totalStrokes - totalPar;
  };

  export const calculateMatchScore = (...playerScorecards) => {
    if (playerScorecards.length < 2) {
      throw new Error("At least two player scorecards are required.");
    }
  
    const length = playerScorecards[0].length;
  
    for (const scorecard of playerScorecards) {
      if (!Array.isArray(scorecard) || scorecard.length !== length) {
        throw new Error("All scorecards must be arrays of the same length.");
      }
    }
  
    const points = Array(playerScorecards.length).fill(0);
  
    for (let i = 0; i < length; i++) {
      const scores = playerScorecards.map(scorecard => scorecard[i]);
      const validScores = scores
        .map((score, index) => ({ score, index }))
        .filter(({ score }) => score !== null && score !== undefined);
  
      if (validScores.length > 0) {
        const minScore = Math.min(...validScores.map(({ score }) => score));
        const winners = validScores.filter(({ score }) => score === minScore);
  
        if (winners.length === 1) {
          points[winners[0].index]++;
        }
      }
    }
  
    return points;
  };