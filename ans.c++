#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <queue>

using namespace std;

class AngleStarPuzzle {
private:
    map<char, vector<char>> connections;

    void initializeConnections() {
        connections['A'] = {'F'};
        connections['B'] = {'G'};
        connections['C'] = {'H'};
        connections['D'] = {'I'};
        connections['E'] = {'J'};
        connections['F'] = {'A', 'G'};
        connections['G'] = {'B', 'H'};
        connections['H'] = {'C', 'I'};
        connections['I'] = {'D', 'J'};
        connections['J'] = {'E', 'A'};
    }

public:
    AngleStarPuzzle() {
        initializeConnections();
    }

    vector<char> findCycle(char startPoint) {
        vector<char> cycle;
        cycle.push_back(startPoint);
        
        char currentPoint = startPoint;
        vector<bool> visited(10, false);
        visited[currentPoint - 'A'] = true;
        
        while (cycle.size() < 10) {
            bool found = false;
            
            for (char nextPoint : connections[currentPoint]) {
                if (!visited[nextPoint - 'A']) {
                    cycle.push_back(nextPoint);
                    visited[nextPoint - 'A'] = true;
                    currentPoint = nextPoint;
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                if (cycle.size() > 1) {
                    visited[currentPoint - 'A'] = false;
                    cycle.pop_back();
                    currentPoint = cycle.back();
                } else {
                    return {};
                }
            }
        }
        
        return cycle;
    }
    
    vector<pair<char, char>> solve(char startPoint) {
        vector<char> path = findCycle(startPoint);
        
        if (path.empty()) {
            cout << "No solution found starting from point " << startPoint << endl;
            return {};
        }
        
        vector<pair<char, char>> solution;
        for (size_t i = 0; i < path.size() - 1; i++) {
            solution.push_back({path[i], path[i+1]});
        }
        
        if (path.back() != startPoint && connections[path.back()].end() != find(connections[path.back()].begin(), connections[path.back()].end(), startPoint)) {
            char last = path.back();
            for (char next : connections[last]) {
                if (next == startPoint) {
                    solution.push_back({last, startPoint});
                    break;
                }
            }
        }
        
        return solution;
    }
    
    vector<pair<char, char>> solveStarPuzzle(char startPoint) {
        vector<pair<char, char>> solution;
        vector<char> visited;
        
        if (startPoint == 'A') {
            solution = {
                {'A', 'F'}, {'F', 'G'}, {'G', 'B'}, {'B', 'C'}, 
                {'C', 'H'}, {'H', 'I'}, {'I', 'D'}, {'D', 'E'}, 
                {'E', 'J'}, {'J', 'A'}
            };
        }
        else if (startPoint == 'F') {
            solution = {
                {'F', 'G'}, {'G', 'B'}, {'B', 'C'}, {'C', 'H'}, 
                {'H', 'I'}, {'I', 'D'}, {'D', 'E'}, {'E', 'J'}, 
                {'J', 'A'}, {'A', 'F'}
            };
        }
        else if (startPoint == 'J') {
            solution = {
                {'J', 'A'}, {'A', 'F'}, {'F', 'G'}, {'G', 'B'}, 
                {'B', 'C'}, {'C', 'H'}, {'H', 'I'}, {'I', 'D'}, 
                {'D', 'E'}, {'E', 'J'}
            };
        }
        else {
            vector<pair<char, char>> baseSolution = {
                {'A', 'F'}, {'F', 'G'}, {'G', 'B'}, {'B', 'C'}, 
                {'C', 'H'}, {'H', 'I'}, {'I', 'D'}, {'D', 'E'}, 
                {'E', 'J'}, {'J', 'A'}
            };
            
            int offset = 0;
            vector<char> sequence = {'A', 'F', 'G', 'B', 'C', 'H', 'I', 'D', 'E', 'J'};
            
            for (int i = 0; i < sequence.size(); i++) {
                if (sequence[i] == startPoint) {
                    offset = i;
                    break;
                }
            }
            
            for (int i = 0; i < 10; i++) {
                int idx = (i + offset) % 10;
                int nextIdx = (i + offset + 1) % 10;
                solution.push_back({sequence[idx], sequence[nextIdx]});
            }
        }
        
        return solution;
    }
};

int main() {
    char startPoint;
    cout << "Enter the starting point (A-J): ";
    cin >> startPoint;
    
    startPoint = toupper(startPoint);
    
    if (startPoint < 'A' || startPoint > 'J') {
        cout << "Invalid starting point. Please enter a letter between A and J." << endl;
        return 1;
    }
    
    AngleStarPuzzle puzzle;
    vector<pair<char, char>> solution = puzzle.solveStarPuzzle(startPoint);
    
    if (!solution.empty()) {
        cout << "Solution starting from point " << startPoint << ":" << endl;
        for (int i = 0; i < solution.size(); i++) {
            cout << i+1 << ". Start from " << solution[i].first 
                 << ", jump to " << solution[i].second 
                 << ", place disc at " << solution[i].second << endl;
        }
    } else {
        cout << "No solution found starting from point " << startPoint << endl;
    }
    
    return 0;
}
