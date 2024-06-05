# Wundernuts Vol 13

Hey hey 👋

This is my submission to [wundernuts vol 13](https://github.com/wunderdogsw/wundernut-vol13). Read more about wundernuts [here](https://github.com/wunderdogsw/wundernuts).

## 🚀 TL;DR

Don't read the boring text I wrote and straight go to [my submission](https://wundernut13.urbanisierung.dev) and play around!

## 💡 Approach

To find out which path our hero has to take to avoid being caught by the dragon, I have implemented the following approach:

- The algorithm goes through all possible paths in the maze that lead to the goal. These are stored in a tree (root --> children --> ...).
- All paths can be derived from the tree.
- If there is at least one path to the goal, the game starts with the dragon.
- The same tree is determined from the dragon to the hero. The dragon uses the next step with the shortest path. That's repeated after each step of the hero.
- All paths are played through and the paths on which the hero escapes the dragon are checked.
- At the end, the shortest of the resulting paths is chosen.

## 🤖 AI or not?

Nope.

## 🎁 What's in the box?

This repo is a monorepo that basically contains two assets: the [algorithm](./packages/wundernut13/) and a [frontend](./apps/wundernut13-frontend/) that makes use of the algorithm and can be used as a playground.

## 💻 Some dev/run instructions

### Prerequisites

- You need Node installed, >= v20 --> [Download Node.js](https://nodejs.org/en/download/package-manager)
- Package manager is `pnpm` --> `npm i -g pnpm`

Make sure you've got all you need:

```bash
node -v && pnpm -v

# output should be something like the following
v20.8.1
9.1.4
```

### Install the dependencies

Projects from Node-land tend to use dozens of thousands of dependencies, I try to avoid it. Nevertheless, there are some:

```bash
# from project root:
pnpm i
```

### 🎮 Time to play!

If you prefer the terminal you can execute the following command with a maze in `json` format. Make sure the maze file is available in the [mazes folder](./mazes/).

```bash
# pnpm run wundernut <maze file>
pnpm run wundernut example1.json
```

The more fun way is to use the frontend and paste your `json` into a form, and see the hero run in action!

```bash
pnpm run wundernutui
```

And then navigate to [localhost:4300](http://localhost:4300).

## 🌴 Some (maybe useful, maybe not - who knows) background info

I was on vacation with my family and read about the wundernut on a social channel. Since the ride home by car took several hours (south of Europe to Germany) and my wife is an excellent driver, I could work on the submission on the passenger seat. Win-win - I really enjoyed to implement the approach and the time flew by, and my wife saved some time listening to me when I was in the tunnel, haha xD

## 🗒️ Acknowledgements

The project setup seems a bit overloaded, and you're totally right! But remember: I was in a car with an unstable internet connection. I re-used a monorepo setup I re-use for most of my projects to bootstrap the project.

The general maze solution is just a bit of `typescript`, but the frontend makes use of

- React
- Carbon Design System
- Vite
- Mobx
- and several dev tools

Want to thank for all the great tooling so I can focus on solving wundernuts ^^
