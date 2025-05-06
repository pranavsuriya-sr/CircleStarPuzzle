// Star configuration
const pointPositions = {
    'A': { x: 240, y: 40 },   // Top outer point
    'B': { x: 180, y: 180 },  // Upper right inner point
    'C': { x: 450, y: 200 },  // Right outer point
    'D': { x: 300, y: 180 },  // Lower right inner point
    'E': { x: 370, y: 470 },  // Bottom outer point
    'F': { x: 330, y: 320 },  // Bottom inner point
    'G': { x: 100, y: 470 },  // Bottom left outer point
    'H': { x: 240, y: 380 },  // Lower left inner point
    'I': { x: 40, y: 190 },   // Left outer point
    'J': { x: 150, y: 300 }   // Upper left inner point
};

// Star connections - lines to draw between points
// const connections = [
//     ['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'E'],
//     ['E', 'F'], ['F', 'G'], ['G', 'H'], ['H', 'I'],
//     ['I', 'J'], ['J', 'A'], ['B', 'J'], ['D', 'F'],
//     ['F', 'H'], ['H', 'J'], ['J', 'B']
// ];

const connections = [
    ['A', 'B'], ['A', 'D'], ['C', 'D'], ['D', 'F'],
    ['E', 'F'], ['F', 'H'], ['G', 'H'], ['H', 'J'],
    ['I', 'J'], ['J', 'B'], ['B', 'D'], ['D', 'F'],
    ['F', 'H'], ['H', 'J'], ['J', 'B'], ['I', 'B'], ['C', 'F'], ['E', 'H'], ['G', 'J']
];

// Create star points and lines
const star = document.getElementById('star');

// Create points
Object.keys(pointPositions).forEach(point => {
    const pointElement = document.createElement('div');
    pointElement.className = 'point';
    pointElement.id = `point-${point}`;
    pointElement.style.left = `${pointPositions[point].x - 15}px`;
    pointElement.style.top = `${pointPositions[point].y - 15}px`;
    pointElement.textContent = point;
    star.appendChild(pointElement);
});

// Create lines between points
connections.forEach(([from, to]) => {
    const fromPos = pointPositions[from];
    const toPos = pointPositions[to];
    
    // Calculate line properties
    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    // Create line element
    const line = document.createElement('div');
    line.className = 'line';
    line.style.width = `${length}px`;
    line.style.left = `${fromPos.x}px`;
    line.style.top = `${fromPos.y}px`;
    line.style.transform = `rotate(${angle}deg)`;
    
    star.appendChild(line);
});

// Angle Star Puzzle solver
class AngleStarPuzzle {
    solveStarPuzzle(startPoint) {
        const solution = [];
        
        // Define solutions based on the puzzle structure
        // These solutions are known to work for the 5-pointed star
        
        // Define the standard cycle for this star
        const sequence = ['A', 'F', 'G', 'B', 'C', 'H', 'I', 'D', 'E', 'J'];
        
        // Find where our desired start point is in the sequence
        let offset = sequence.indexOf(startPoint);
        
        if (offset === -1) {
            return []; // Invalid start point
        }
        
        // Rotate the solution to start from the desired point
        for (let i = 0; i < 10; i++) {
            const idx = (i + offset) % 10;
            const nextIdx = (i + offset + 1) % 10;
            solution.push({
                from: sequence[idx],
                to: sequence[nextIdx]
            });
        }
        
        return solution;
    }
}

// Animation controller
let currentStep = 0;
let animationInterval = null;
const stepsList = document.getElementById('stepsList');
const speedControl = document.getElementById('speed');

// Event listeners
document.getElementById('solveButton').addEventListener('click', solvePuzzle);
document.getElementById('resetButton').addEventListener('click', resetPuzzle);
document.getElementById('playButton').addEventListener('click', playAnimation);
document.getElementById('pauseButton').addEventListener('click', pauseAnimation);
document.getElementById('stepButton').addEventListener('click', nextStep);

// Solve the puzzle
function solvePuzzle() {
    resetPuzzle();
    
    const startPoint = document.getElementById('startPoint').value.toUpperCase();
    if (startPoint < 'A' || startPoint > 'J') {
        alert('Please enter a valid starting point (A-J)');
        return;
    }
    
    const puzzle = new AngleStarPuzzle();
    const solution = puzzle.solveStarPuzzle(startPoint);
    
    if (solution.length === 0) {
        alert('No solution found for the given starting point.');
        return;
    }
    
    // Display steps
    stepsList.innerHTML = '';
    solution.forEach((step, index) => {
        const stepElement = document.createElement('div');
        stepElement.className = 'step';
        stepElement.id = `step-${index}`;
        stepElement.innerHTML = `${index + 1}. Start from <strong>${step.from}</strong>, jump to <strong>${step.to}</strong>, place disc at <strong>${step.to}</strong>`;
        stepsList.appendChild(stepElement);
    });
    
    // Store solution for animation
    window.currentSolution = solution;
    
    // Enable animation controls
    document.getElementById('playButton').disabled = false;
    document.getElementById('stepButton').disabled = false;
    
    // Make first step active
    document.getElementById('step-0').classList.add('active');
}

// Reset the puzzle
function resetPuzzle() {
    // Reset all points to unshaded
    Object.keys(pointPositions).forEach(point => {
        const pointElement = document.getElementById(`point-${point}`);
        pointElement.classList.remove('shaded');
    });
    
    // Clear steps
    stepsList.innerHTML = '';
    
    // Reset animation
    pauseAnimation();
    currentStep = 0;
    window.currentSolution = null;
}

// Animation functions
function playAnimation() {
    if (!window.currentSolution) return;
    
    // Disable play button, enable pause button
    document.getElementById('playButton').disabled = true;
    document.getElementById('pauseButton').disabled = false;
    
    // Calculate animation speed (1-10 scale reversed: 10 = fast, 1 = slow)
    const speed = 11 - speedControl.value;
    const interval = speed * 300; // 300ms to 3000ms
    
    // Start animation
    animationInterval = setInterval(() => {
        if (currentStep < window.currentSolution.length) {
            performStep(currentStep);
            currentStep++;
        } else {
            pauseAnimation();
        }
    }, interval);
}

function pauseAnimation() {
    clearInterval(animationInterval);
    document.getElementById('playButton').disabled = false;
    document.getElementById('pauseButton').disabled = true;
}

function nextStep() {
    if (!window.currentSolution) return;
    
    if (currentStep < window.currentSolution.length) {
        performStep(currentStep);
        currentStep++;
    }
}

function performStep(stepIndex) {
    const step = window.currentSolution[stepIndex];
    
    // Highlight active step
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    const stepElement = document.getElementById(`step-${stepIndex}`);
    if (stepElement) {
        stepElement.classList.add('active');
        stepElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Shade the destination point
    const pointElement = document.getElementById(`point-${step.to}`);
    pointElement.classList.add('shaded');
}

// Initialize with default starting point A
window.onload = function() {
    document.getElementById('solveButton').click();
};