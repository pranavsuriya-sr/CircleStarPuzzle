# ⭐ Circle Shade Star Puzzle Game

A web-based interactive version of the **Circle Shade Star Puzzle**, supported by a C++ implementation of the core solving algorithm. This project demonstrates logic, spatial reasoning, and geometric traversal based on specific jumping rules.

## 🧠 Puzzle Objective

- A 10-point star with alternating shaded (yellow) and unshaded points.
- You can start jumps only from a **yellow (non-shaded)** point.
- A move is a straight-line jump over **one** point (i.e., landing on the second point in that line).
- Each valid jump places a disc on the landing point.
- The goal is to place all **10 discs** following the above rules.

## 📁 Repository Structure

- `index.html` – Main web page
- `style.css` – Styling for the puzzle
- `script.js` – Handles interactions and puzzle logic
- `ans.cpp` – C++ algorithm that solves the puzzle
- `README.md` – Project documentation

## 🌐 Web Application

The visual puzzle interface is built using HTML, CSS, and JavaScript.

### Features

- Displays a 10-point star with clickable nodes
- Highlights valid straight-line jump paths
- Lets users place discs based on puzzle rules
- Option to visualize auto-solving with C++ logic

## 🔧 How to Use

1. Open the `index.html` file in any modern browser.
2. Interact with the puzzle by clicking on yellow circles to make valid jumps.
3. Each jump places a disc on the destination point.
4. Repeat until all 10 discs are placed.

## ⚙️ C++ Solver

The `ans.cpp` implements the backend algorithm to find a solution path that satisfies all puzzle rules.

### Algorithm Overview

- The star points are modeled as nodes in a geometric graph.
- All straight-line jump paths (skipping one point) are precomputed.
- A recursive search (DFS/backtracking) finds a valid sequence of 10 disc placements.

## 🚀 Enhancements (Optional)

- Animate jump transitions in JavaScript
- Visualize the solving path step-by-step
- Add UI controls to reset, undo, or auto-solve

## 🤝 Contributions

Contributions are welcome. Open an issue or submit a pull request to suggest improvements.

