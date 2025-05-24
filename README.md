# Tic-Tac-Toe Game

A modern, responsive Tic-Tac-Toe game built with Angular, featuring an unbeatable AI opponent and a beautiful user interface.

[Click here to play](https://pharshil1910.github.io/Tic-Tac-Toe/)
## 🎮 Features

- **Two Game Modes**:
  - Human vs Human: Play against a friend
  - Human vs Computer: Challenge an unbeatable AI opponent

- **Smart AI**:
  - Implements perfect play strategy
  - Uses advanced algorithms to prevent player wins
  - Creates strategic forks and winning opportunities
  - Adapts to player moves in real-time

- **Modern UI/UX**:
  - Clean, responsive design
  - Beautiful animations and transitions
  - Glass-morphism effects
  - Intuitive game board
  - Real-time game status updates
  - Score tracking
  - Winning cell highlighting

- **Technical Features**:
  - Built with Angular 17
  - Standalone components
  - Responsive design
  - Optimized performance
  - Clean, maintainable code

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI (v17 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tic-tac-toe.git
   cd tic-tac-toe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`

## 🎯 How to Play

1. **Choose Game Mode**:
   - Select "Human vs Human" to play against a friend
   - Select "Human vs Computer" to play against the AI

2. **Game Rules**:
   - Players take turns placing X and O on the board
   - First player to get three in a row (horizontally, vertically, or diagonally) wins
   - If all cells are filled with no winner, the game is a draw

3. **Controls**:
   - Click on any empty cell to make a move
   - Use the "Reset Game" button to start a new game
   - The scoreboard keeps track of wins for both players

## 💻 Development

This project was developed with the assistance of AI using Cursor IDE. The development process included:

- Initial project setup with Angular CLI
- Implementation of game logic and AI strategy
- UI/UX design and implementation
- Code optimization and cleanup
- Testing and bug fixes

### Project Structure

```
tic-tac-toe/
├── src/
│   ├── app/
│   │   ├── game/
│   │   │   ├── game.component.ts    # Game logic and AI
│   │   │   ├── game.component.html  # Game template
│   │   │   └── game.component.css   # Game styles
│   │   └── app.component.ts         # Main app component
│   └── ...
├── README.md
└── ...
```

## 🤖 AI Strategy

The computer opponent uses a combination of strategies to ensure optimal play:

1. **Perfect Play Algorithm**:
   - Minimax algorithm with alpha-beta pruning
   - Position evaluation and scoring
   - Threat detection and prevention
   - Fork creation and blocking

2. **Strategic Moves**:
   - Prioritizes center and corner positions
   - Creates winning opportunities
   - Blocks player's winning moves
   - Forces optimal play

## 🎨 UI/UX Design

The game features a modern, responsive design with:

- Gradient backgrounds and glass-morphism effects
- Smooth animations and transitions
- Interactive hover states
- Clear visual feedback
- Mobile-friendly layout
- Accessible color scheme

## 📱 Responsive Design

The game is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Different screen sizes and orientations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Angular
- Developed with the assistance of AI using Cursor IDE
- Inspired by classic Tic-Tac-Toe games
