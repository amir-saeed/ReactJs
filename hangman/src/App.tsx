import { useEffect, useState } from "react";

const wordList = [
  "python",
  "developer",
  "hangman",
  "keyboard",
  "monitor",
  "laptop",
  "program",
  "terminal",
  "function",
  "variable",
];

const MAX_ATTEMPTS = 6;

const App = () => {
  const [word, setWord] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    setWord(wordList[randomIndex]);
  }, []);

  const handleGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
    let letter = e.target.value.toLowerCase();
    e.target.value = ""; // Clear input after every guess

    if (gameOver || gameWon || letter.length !== 1 || !/^[a-z]$/.test(letter)) {
      return; // Ignore invalid input or if game has ended
    }

    if (guessedLetters.includes(letter)) {
      alert("You already guessed that letter!");
      return;
    }

    setGuessedLetters([...guessedLetters, letter]);

    if (!word.includes(letter)) {
      setIncorrectGuesses((prev) => prev + 1);
    }

    if (incorrectGuesses + 1 >= MAX_ATTEMPTS) {
      setGameOver(true);
    }

    if (
      word
        .split("")
        .every((char) => guessedLetters.includes(char) || char === letter)
    ) {
      setGameWon(true);
    }
  };

  const displayWord = word
    .split("")
    .map((char) => (guessedLetters.includes(char) ? char : "_"))
    .join(" ");

  return (
    <div className="container text-center">
      <h1 className="p-6">Hangman - Coding Task</h1>
      <h2>{displayWord}</h2>
      <p>Incorrect Guesses Left: {MAX_ATTEMPTS - incorrectGuesses}</p>

      {!gameOver && !gameWon && (
        <input
          type="text"
          maxLength={1}
          className="form-control"
          onChange={handleGuess}
          disabled={gameOver || gameWon}
          placeholder="Guess a letter"
        />
      )}

      {gameWon && <h2>🎉 Congratulations! You guessed the word: {word} 🎉</h2>}
      {gameOver && <h2>☠️ Game Over! The word was: {word} ☠️</h2>}
    </div>
  );
};

export default App;
