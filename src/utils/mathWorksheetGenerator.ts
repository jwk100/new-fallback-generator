// src/utils/mathWorksheetGenerator.ts - Integration layer for 32-level math plugin

interface Child {
  id: number;
  name: string;
  slug: string;
  age: number;
  gradeLevel: string;
  mathScore: number;
  readingScore: number;
  focusScore: number;
}

interface WorksheetRequest {
  child: Child;
  prompt: string;
  skillType?: string;
  difficulty?: number;
}

interface GeneratedProblem {
  id: string;
  question: string;
  answer: string;
  type: 'fill-in' | 'multiple-choice';
  skill: string;
  options?: string[];
}

interface WorksheetResult {
  title: string;
  subject: string;
  topic: string;
  problems: GeneratedProblem[];
  level: number;
  skillId: string;
  generationTime: number;
}

// Declare global functions from math plugin
declare global {
  interface Window {
    generateFallbackProblems: (skillId: string, count: number) => {
      problems: string[];
      answers: string[];
    };
    getSkillIdFromLevel: (level: number) => string;
  }
}

/**
 * Maps child's math score and grade to appropriate skill level (1-32)
 */
function getSkillLevelForChild(child: Child): number {
  // Base levels for each grade
  const gradeBaseLevels = {
    'PreK': 1,           // Levels 1-4
    'Kindergarten': 5,    // Levels 5-8
    '1st Grade': 9,       // Levels 9-16
    '2nd Grade': 17,      // Levels 17-24
    '3rd Grade': 25       // Levels 25-32
  };
  
  const gradeLevelSpans = {
    'PreK': 4,           // 4 levels
    'Kindergarten': 4,    // 4 levels
    '1st Grade': 8,       // 8 levels
    '2nd Grade': 8,       // 8 levels
    '3rd Grade': 8        // 8 levels
  };
  
  const baseLevel = gradeBaseLevels[child.gradeLevel as keyof typeof gradeBaseLevels] || 9;
  const gradeSpan = gradeLevelSpans[child.gradeLevel as keyof typeof gradeLevelSpans] || 8;
  
  // Math score (1-10) determines position within grade
  const scoreAdjustment = Math.floor((child.mathScore - 1) * (gradeSpan - 1) / 9);
  
  const finalLevel = baseLevel + scoreAdjustment;
  return Math.max(1, Math.min(32, finalLevel));
}

/**
 * Analyzes user prompt for skill type and count
 */
function analyzePrompt(prompt: string, child: Child): { skillType: string; count: number } {
  const lowerPrompt = prompt.toLowerCase();
  
  // Extract number of problems
  const numberMatch = prompt.match(/(\d+)\s*(problems?|questions?)/);
  const count = numberMatch ? parseInt(numberMatch[1]) : getDefaultProblemCount(child);
  
  // Analyze skill type
  let skillType = '';
  
  if (lowerPrompt.includes('add') || lowerPrompt.includes('plus') || lowerPrompt.includes('addition')) {
    skillType = 'addition';
  } else if (lowerPrompt.includes('subtract') || lowerPrompt.includes('minus') || lowerPrompt.includes('subtraction')) {
    skillType = 'subtraction';
  } else if (lowerPrompt.includes('multiply') || lowerPrompt.includes('times') || lowerPrompt.includes('multiplication')) {
    skillType = 'multiplication';
  } else if (lowerPrompt.includes('divide') || lowerPrompt.includes('division')) {
    skillType = 'division';
  } else if (lowerPrompt.includes('counting') || lowerPrompt.includes('count')) {
    skillType = 'counting';
  } else if (lowerPrompt.includes('number recognition') || lowerPrompt.includes('recognize number')) {
    skillType = 'number-recognition';
  } else if (lowerPrompt.includes('place value')) {
    skillType = 'place-value';
  } else if (lowerPrompt.includes('time') || lowerPrompt.includes('clock')) {
    skillType = 'time';
  } else if (lowerPrompt.includes('money') || lowerPrompt.includes('coin')) {
    skillType = 'money';
  } else if (lowerPrompt.includes('fraction')) {
    skillType = 'fractions';
  }
  
  return { skillType, count };
}

function getDefaultProblemCount(child: Child): number {
  if (child.age <= 4) return 4;      // PreK: 4 problems
  if (child.age <= 6) return 6;      // Kindergarten: 6 problems  
  if (child.age <= 7) return 10;     // 1st Grade: 10 problems
  return 15;                         // 2nd-3rd Grade: 15 problems
}

/**
 * Main function using proper curriculum levels
 */
export async function generateMathWorksheet(request: WorksheetRequest): Promise<WorksheetResult> {
  const startTime = Date.now();
  
  try {
    if (!window.generateFallbackProblems || !window.getSkillIdFromLevel) {
      throw new Error('Math worksheet plugin not loaded. Add fallback-generator.js to public/math-plugin/');
    }
    
    // Get appropriate skill level for child
    const level = getSkillLevelForChild(request.child);
    const { skillType, count } = analyzePrompt(request.prompt, request.child);
    
    // Get base skill ID for the level
    let skillId = window.getSkillIdFromLevel(level);
    
    // Override with specific skill if detected in prompt
    if (skillType) {
      const skillOverrides = getSkillOverrides(level, skillType);
      skillId = skillOverrides || skillId;
    }
    
    // Generate problems using corrected plugin
    const result = window.generateFallbackProblems(skillId, count);
    
    // Convert to our format
    const problems: GeneratedProblem[] = result.problems.map((problem, index) => {
      const isMultipleChoice = problem.includes('Circle') || problem.includes('Which') || 
                              problem.includes('bigger') || problem.includes('larger');
      
      return {
        id: `prob_${index + 1}`,
        question: problem,
        answer: result.answers[index],
        type: isMultipleChoice ? 'multiple-choice' : 'fill-in',
        skill: getSkillName(skillId),
        options: isMultipleChoice ? generateChoices(result.answers[index]) : undefined
      };
    });
    
    const generationTime = Date.now() - startTime;
    
    return {
      title: `${getSkillName(skillId)} - Level ${level}`,
      subject: 'Mathematics',
      topic: getSkillName(skillId),
      problems,
      level,
      skillId,
      generationTime
    };
    
  } catch (error) {
    console.error('Math worksheet generation error:', error);
    throw error;
  }
}

function getSkillOverrides(level: number, skillType: string): string | null {
  // Override logic based on level and skill type
  if (level <= 4) {
    if (skillType === 'number-recognition') return level <= 2 ? 'number-recognition-1-3' : 'number-recognition-6-10';
    if (skillType === 'counting') return 'counting-objects-1-5';
  }
  
  if (level <= 8) {
    if (skillType === 'counting') return 'counting-objects-6-10';
    if (skillType === 'addition') return 'simple-addition-within-5';
  }
  
  if (level <= 16) {
    if (skillType === 'addition') return level <= 12 ? 'addition-within-10' : 'addition-within-20';
    if (skillType === 'subtraction') return level <= 11 ? 'subtraction-within-10' : 'subtraction-within-20';
    if (skillType === 'place-value') return 'place-value-to-100';
    if (skillType === 'time') return 'time-to-hour';
  }
  
  if (level <= 24) {
    if (skillType === 'addition') return level <= 18 ? 'addition-within-100-no-regroup' : 'addition-with-regrouping';
    if (skillType === 'subtraction') return level <= 18 ? 'subtraction-within-100-no-regroup' : 'subtraction-with-regrouping';
    if (skillType === 'multiplication') return level <= 21 ? 'introduction-to-multiplication' : 'multiplication-facts-2s-5s';
    if (skillType === 'division') return 'introduction-to-division';
    if (skillType === 'money') return 'money-coins-bills';
  }
  
  if (level <= 32) {
    if (skillType === 'multiplication') {
      if (level <= 25) return 'multiplication-facts-3s-4s';
      if (level <= 26) return 'multiplication-facts-6s-7s';
      return 'multiplication-facts-8s-9s';
    }
    if (skillType === 'division') return 'division-facts';
    if (skillType === 'fractions') return level <= 29 ? 'fractions-parts-whole' : 'fractions-addition-subtraction';
  }
  
  return null;
}

function getSkillName(skillId: string): string {
  const skillNames: Record<string, string> = {
    'number-recognition-1-3': 'Number Recognition 1-3',
    'number-recognition-4-5': 'Number Recognition 4-5',
    'counting-objects-1-5': 'Counting Objects 1-5',
    'number-recognition-6-10': 'Number Recognition 6-10',
    'counting-objects-6-10': 'Counting Objects 6-10',
    'number-writing-1-10': 'Number Writing 1-10',
    'number-sequence-1-20': 'Number Sequence 1-20',
    'simple-addition-within-5': 'Simple Addition Within 5',
    'simple-subtraction-within-5': 'Simple Subtraction Within 5',
    'addition-within-10': 'Addition Within 10',
    'subtraction-within-10': 'Subtraction Within 10',
    'addition-within-20': 'Addition Within 20',
    'subtraction-within-20': 'Subtraction Within 20',
    'place-value-to-100': 'Place Value to 100',
    'skip-counting-2s-5s-10s': 'Skip Counting by 2s, 5s, 10s',
    'time-to-hour': 'Time to the Hour',
    'addition-within-100-no-regroup': 'Addition Within 100 (No Regrouping)',
    'subtraction-within-100-no-regroup': 'Subtraction Within 100 (No Regrouping)',
    'addition-with-regrouping': 'Addition With Regrouping',
    'subtraction-with-regrouping': 'Subtraction With Regrouping',
    'introduction-to-multiplication': 'Introduction to Multiplication',
    'multiplication-facts-2s-5s': 'Multiplication Facts 2s and 5s',
    'introduction-to-division': 'Introduction to Division',
    'money-coins-bills': 'Money (Coins and Bills)',
    'multiplication-facts-3s-4s': 'Multiplication Facts 3s and 4s',
    'multiplication-facts-6s-7s': 'Multiplication Facts 6s and 7s',
    'multiplication-facts-8s-9s': 'Multiplication Facts 8s and 9s',
    'division-facts': 'Division Facts',
    'fractions-parts-whole': 'Fractions - Parts of a Whole',
    'fractions-addition-subtraction': 'Fractions - Addition and Subtraction',
    'measurement-geometry': 'Measurement and Geometry',
    'advanced-problem-solving': 'Advanced Problem Solving'
  };
  
  return skillNames[skillId] || `Math Practice (${skillId})`;
}

function generateChoices(correctAnswer: string): string[] {
  const num = parseInt(correctAnswer);
  if (isNaN(num)) return [correctAnswer, 'A', 'B', 'C'];
  
  const choices = [correctAnswer];
  const variants = [num - 2, num - 1, num + 1, num + 2].filter(n => n > 0 && n !== num);
  
  while (choices.length < 4 && variants.length > 0) {
    const randomIndex = Math.floor(Math.random() * variants.length);
    choices.push(variants.splice(randomIndex, 1)[0].toString());
  }
  
  return choices.sort(() => Math.random() - 0.5);
}

/**
 * Load the math plugin
 */
export function loadMathPlugin(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.generateFallbackProblems) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = '/math-plugin/fallback-generator.js';
    script.onload = () => {
      if (window.generateFallbackProblems) {
        console.log('✅ 32-level math plugin loaded successfully');
        resolve();
      } else {
        reject(new Error('Math plugin failed to load properly'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load math plugin script'));
    document.head.appendChild(script);
  });
}
