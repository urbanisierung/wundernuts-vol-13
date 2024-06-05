# The shortest way out of a maze inhabited by a dragon

_Spring / Early Summer 2024_

(Find our other Wundernuts [here](https://github.com/wunderdogsw/wundernuts))

A hero is lost in a maze inhabited by an angry dragon. Can you help the hero find the shortest way out of the maze without confronting the dragon.

## Instructions & requirements

Create a solution that outputs an answer to how long is the shortest path for the hero to get to the end of the maze while avoiding the dragon moving toward the hero. The maze is represented as a matrix of emojis. The maze is given as an input and can have different layouts, sizes, and starting positions. Consider also error handling for scenarios where the maze doesn't have any path to the end or the maze doesn't have any path to the end where the hero would avoid the dragon.

### Maze cells:

- 🏃 is the hero starting position
- ❎ is the goal / end of the maze the hero should reach
- 🟩 are valid cells where the hero and the dragon can move
- 🟫 are walls where the hero and the dragon can not move
- 🐉 is the dragon starting position and also a valid cell where the hero and the dragon can move

### Hero movement

- Allowed directions of movement are up, left, down, and right
- Diagonal movement is not allowed
- The hero cannot move through walls
- The hero needs to avoid the dragon
  - The hero cannot move to the same cell where the dragon is at the moment
  - The hero cannot take a step to a cell that is right next vertically or horizontally to the dragon (because otherwise, the dragon will reach the hero when it is the dragon's turn to take a step)

### Dragon movement

- The dragon movement is part of the solution you implement
- The dragon should take a step towards the hero every time after the hero has taken a step
- Allowed directions of movement are up, left, down, and right
- Diagonal movement is not allowed
- The dragon cannot move through walls
- The step should be towards the shortest path to reach the hero taking into account the hero's current position

### Example maze 1 (the shortest path is 16):

```
🟫🏃🟫🟫🟫🟫🟫
🟫🟩🟩🟩🟩🟩🟫
🟫🟩🟫🟫🟫🟩🟫
🟫🟩🟩🟩🟫🟩🟫
🟫🐉🟫🟩🟫🟩🟫
🟫🟩🟩🟩🟫🟩🟫
🟫🟩🟫🟫🟫🟩🟫
🟫🟩🟩🟩🟩🟩🟫
🟫❎🟫🟫🟫🟫🟫
```

```
[
    ['🟫','🏃','🟫','🟫','🟫','🟫','🟫'],
    ['🟫','🟩','🟩','🟩','🟩','🟩','🟫'],
    ['🟫','🟩','🟫','🟫','🟫','🟩','🟫'],
    ['🟫','🟩','🟩','🟩','🟫','🟩','🟫'],
    ['🟫','🐉','🟫','🟩','🟫','🟩','🟫'],
    ['🟫','🟩','🟩','🟩','🟫','🟩','🟫'],
    ['🟫','🟩','🟫','🟫','🟫','🟩','🟫'],
    ['🟫','🟩','🟩','🟩','🟩','🟩','🟫'],
    ['🟫','❎','🟫','🟫','🟫','🟫','🟫']
]
```

Example output:

```
The shortest path is 16 steps.
```

Another example output (Feel free to make fancier outputs):

```
Steps: Down, Right, Right, Right, Right, Down, Down, Down, Down, Down, Down, Left, Left, Left, Left, Down
Total: 16 steps
```

### Example maze 2:

```
🟫🟫🟫🟫🟩🟩🏃🟫🟫🟩🟩🟩
🟩🟩🟩🟫🟩🟫🟫🟫🟫🟩🟫🟩
🟩🟫🟩🟫🟩🟩🟩🟩🟩🟩🟫🟩
🟩🟫🟩🟫🟫🟫🟫🟫🟫🟩🟫🟩
🟩🟫🟩🟩🟩🟩🟩🟩🟫🟩🟫🟩
🟩🟫🟫🟫🟫🟫🟫🟩🟫🟩🟫🟩
🟩🟩🟩🟩🟩🟩🟩🟩🟫🟩🟫🟩
🟩🟫🟩🟫🟫🟫🟫🟫🟫🟩🟫🟩
🟩🟫🟩🐉🟩🟩🟩🟩🟩🟩🟫🟩
🟩🟫🟫🟫🟫🟫🟫🟫🟫🟩🟫🟩
🟩🟩🟫🟫🟫🟩❎🟫🟩🟩🟩🟩
🟫🟩🟩🟩🟩🟩🟫🟩🟩🟫🟫🟩
```

```
[
    ['🟫','🟫','🟫','🟫','🟩','🟩','🏃','🟫','🟫','🟩','🟩','🟩'],
    ['🟩','🟩','🟩','🟫','🟩','🟫','🟫','🟫','🟫','🟩','🟫','🟩'],
    ['🟩','🟫','🟩','🟫','🟩','🟩','🟩','🟩','🟩','🟩','🟫','🟩'],
    ['🟩','🟫','🟩','🟫','🟫','🟫','🟫','🟫','🟫','🟩','🟫','🟩'],
    ['🟩','🟫','🟩','🟩','🟩','🟩','🟩','🟩','🟫','🟩','🟫','🟩'],
    ['🟩','🟫','🟫','🟫','🟫','🟫','🟫','🟩','🟫','🟩','🟫','🟩'],
    ['🟩','🟩','🟩','🟩','🟩','🟩','🟩','🟩','🟫','🟩','🟫','🟩'],
    ['🟩','🟫','🟩','🟫','🟫','🟫','🟫','🟫','🟫','🟩','🟫','🟩'],
    ['🟩','🟫','🟩','🐉','🟩','🟩','🟩','🟩','🟩','🟩','🟫','🟩'],
    ['🟩','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟫','🟩','🟫','🟩'],
    ['🟩','🟩','🟫','🟫','🟫','🟩','❎','🟫','🟩','🟩','🟩','🟩'],
    ['🟫','🟩','🟩','🟩','🟩','🟩','🟫','🟩','🟩','🟫','🟫','🟩']
]
```

## Rules

- Use [submission form](https://www.wunderdog.fi/wundernut) to submit your contribution.
- You can either submit a traditional solution or a solution where AI prompts have been used
- The submission must include full source code and instructions to compile and run the program.
- If you have used AI prompts, include the prompts in the submission. Please also let us know which chatbot or AI pair programmer you used and describe how you used it. Where did the AI help you the most, and which part of the solution still required the handprint of a human developer?
- All submissions will be reviewed by a jury consisting of Wunderdog developers.
- Criterios to be selected as winners:
  - Code quality metrics (https://blog.cloudboost.io/code-quality-metrics-67dc861ac139)
  - The most efficient use of AI prompts if an AI pair programming was used
  - “Fun factor” - for example a cool way to print out the progress and the answer
