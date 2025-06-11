/**
 * CORRECTED PrintAcademy AI - Fallback Problem Generator
 * WITH PROPER FORMATTING - No unnecessary "?" and proper alignment
 */

function generateFallbackProblems(skillId, count) {
  console.log('Fallback generation called for skillId:', skillId, 'count:', count);
  
  const problems = [];
  const answers = [];

  // Helper function for proper vertical formatting
  function formatVertical(a, b, operator) {
    const maxWidth = Math.max(a.toString().length, b.toString().length + 1, 4);
    const aStr = a.toString().padStart(maxWidth, ' ');
    const bStr = b.toString().padStart(maxWidth - 1, ' '); // -1 for operator space
    const line = '_'.repeat(maxWidth);
    return `${aStr}\n${operator}${bStr}\n${line}`;
  }

  // =============================================================================
  // PREK FOUNDATION (Ages 3-4) - Levels 1-4
  // =============================================================================
  
  if (skillId === 'number-recognition-1-3') {
    // Level 1: Number Recognition 1-3 - CLEAN FORMAT
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * 3) + 1; // 1-3 only
      const formats = [
        `Circle the number: ${num}`,
        `What number is this: ${num}`,
        `Count: ${'●'.repeat(num)} = ___`
      ];
      problems.push(formats[i % formats.length]);
      answers.push(num.toString());
    }
  }
  
  else if (skillId === 'number-recognition-4-5') {
    // Level 2: Number Recognition 4-5 - CLEAN FORMAT
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * 2) + 4; // 4-5 only
      problems.push(`Count the objects: ${'○'.repeat(num)}`);
      answers.push(num.toString());
    }
  }
  
  else if (skillId === 'counting-objects-1-5') {
    // Level 3: Counting Objects 1-5 - CLEAN FORMAT
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * 5) + 1; // 1-5 range
      const objects = ['●', '★', '■', '▲', '♦'];
      const obj = objects[i % objects.length];
      const names = ['dots', 'stars', 'squares', 'triangles', 'diamonds'];
      problems.push(`How many ${names[i % names.length]}? ${obj.repeat(num)}`);
      answers.push(num.toString());
    }
  }
  
  else if (skillId === 'number-recognition-6-10') {
    // Level 4: Number Recognition 6-10 - CLEAN FORMAT
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * 5) + 6; // 6-10 range
      problems.push(`What number comes after ${num - 1}`);
      answers.push(num.toString());
    }
  }

  // =============================================================================
  // KINDERGARTEN BUILDING (Ages 5-6) - Levels 5-8
  // =============================================================================
  
  else if (skillId === 'counting-objects-6-10') {
    // Level 5: Counting Objects 6-10 - CLEAN FORMAT
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * 5) + 6; // 6-10 range
      problems.push(`Count the items: ${'□'.repeat(num)}`);
      answers.push(num.toString());
    }
  }
  
  else if (skillId === 'number-writing-1-10') {
    // Level 6: Number Writing 1-10 - CLEAN FORMAT
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * 10) + 1;
      const words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
      problems.push(`Write the number: ${words[num - 1]}`);
      answers.push(num.toString());
    }
  }
  
  else if (skillId === 'number-sequence-1-20') {
    // Level 7: Number Sequence 1-20 - CLEAN FORMAT
    for (let i = 0; i < count; i++) {
      const missing = Math.floor(Math.random() * 18) + 2; // 2-19 range
      problems.push(`What number is missing: ${missing - 1}, ___, ${missing + 1}`);
      answers.push(missing.toString());
    }
  }
  
  else if (skillId === 'simple-addition-within-5') {
    // Level 8: Simple Addition Within 5 - CLEAN FORMAT (NO ?)
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 3) + 1; // 1-3
      const b = Math.floor(Math.random() * (6 - a)) + 1; // Ensure sum ≤ 5
      problems.push(`${a} + ${b} =`); // ✅ NO QUESTION MARK
      answers.push((a + b).toString());
    }
  }

  // =============================================================================
  // 1ST GRADE FOUNDATION (Ages 6-7) - Levels 9-16
  // =============================================================================
  
  else if (skillId === 'simple-subtraction-within-5') {
    // Level 9: Simple Subtraction Within 5 - CLEAN FORMAT (NO ?)
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 4) + 2; // 2-5
      const b = Math.floor(Math.random() * a) + 1; // 1 to a-1
      problems.push(`${a} - ${b} =`); // ✅ NO QUESTION MARK
      answers.push((a - b).toString());
    }
  }
  
  else if (skillId === 'addition-within-10') {
    // Level 10: Addition Within 10 - CLEAN FORMAT (NO ?)
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 8) + 1; // 1-8
      const b = Math.floor(Math.random() * (11 - a)) + 1; // Ensure sum ≤ 10
      problems.push(`${a} + ${b} =`); // ✅ NO QUESTION MARK
      answers.push((a + b).toString());
    }
  }
  
  else if (skillId === 'subtraction-within-10') {
    // Level 11: Subtraction Within 10 - CLEAN FORMAT (NO ?)
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 9) + 2; // 2-10
      const b = Math.floor(Math.random() * a) + 1; // 1 to a-1
      problems.push(`${a} - ${b} =`); // ✅ NO QUESTION MARK
      answers.push((a - b).toString());
    }
  }
  
  else if (skillId === 'addition-within-20') {
    // Level 12: Addition Within 20 - CLEAN FORMAT (NO ?)
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 15) + 1; // 1-15
      const b = Math.floor(Math.random() * (21 - a)) + 1; // Ensure sum ≤ 20
      problems.push(`${a} + ${b} =`); // ✅ NO QUESTION MARK
      answers.push((a + b).toString());
    }
  }
  
  else if (skillId === 'subtraction-within-20') {
    // Level 13: Subtraction Within 20 - CLEAN FORMAT (NO ?)
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 18) + 3; // 3-20
      const b = Math.floor(Math.random() * a) + 1; // 1 to a-1
      problems.push(`${a} - ${b} =`); // ✅ NO QUESTION MARK
      answers.push((a - b).toString());
    }
  }
  
  else if (skillId === 'place-value-to-100') {
    // Level 14: Place Value to 100 - CLEAN FORMAT
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * 90) + 10; // 10-99
      const tens = Math.floor(num / 10);
      const ones = num % 10;
      problems.push(`${num} = ___ tens + ___ ones`);
      answers.push(`${tens} tens + ${ones} ones`);
    }
  }
  
  else if (skillId === 'skip-counting-2s-5s-10s') {
    // Level 15: Skip Counting by 2s, 5s, 10s - CLEAN FORMAT
    for (let i = 0; i < count; i++) {
      const patterns = [
        { step: 2, start: 2, name: '2s' },
        { step: 5, start: 5, name: '5s' },
        { step: 10, start: 10, name: '10s' }
      ];
      const pattern = patterns[i % patterns.length];
      const sequence = [pattern.start, pattern.start + pattern.step, pattern.start + (2 * pattern.step)];
      problems.push(`Count by ${pattern.name}: ${sequence.join(', ')}, ___`);
      answers.push((pattern.start + (3 * pattern.step)).toString());
    }
  }
  
  else if (skillId === 'time-to-hour') {
    // Level 16: Time to the Hour - CLEAN FORMAT
    for (let i = 0; i < count; i++) {
      const hour = Math.floor(Math.random() * 12) + 1; // 1-12
      problems.push(`What time is shown: Clock shows ${hour} o'clock`);
      answers.push(`${hour}:00`);
    }
  }

  // =============================================================================
  // 2ND GRADE DEVELOPMENT (Ages 7-8) - Levels 17-24
  // =============================================================================
  
  else if (skillId === 'addition-within-100-no-regroup') {
    // Level 17: Addition Within 100 (No Regrouping) - PROPER VERTICAL ALIGNMENT
    for (let i = 0; i < count; i++) {
      const tens1 = Math.floor(Math.random() * 5) + 1; // 1-5 tens
      const ones1 = Math.floor(Math.random() * 5); // 0-4 ones
      const tens2 = Math.floor(Math.random() * (10 - tens1)); // No regrouping
      const ones2 = Math.floor(Math.random() * (10 - ones1)); // No regrouping
      const a = tens1 * 10 + ones1;
      const b = tens2 * 10 + ones2;
      problems.push(formatVertical(a, b, '+')); // ✅ PROPER ALIGNMENT
      answers.push((a + b).toString());
    }
  }
  
  else if (skillId === 'subtraction-within-100-no-regroup') {
    // Level 18: Subtraction Within 100 (No Regrouping) - PROPER VERTICAL ALIGNMENT
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 80) + 20; // 20-99
      const tensA = Math.floor(a / 10);
      const onesA = a % 10;
      const tensB = Math.floor(Math.random() * tensA); // No borrowing
      const onesB = Math.floor(Math.random() * (onesA + 1)); // No borrowing
      const b = tensB * 10 + onesB;
      problems.push(formatVertical(a, b, '-')); // ✅ PROPER ALIGNMENT
      answers.push((a - b).toString());
    }
  }
  
  else if (skillId === 'addition-with-regrouping') {
    // Level 19: Addition With Regrouping - PROPER VERTICAL ALIGNMENT
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 80) + 15; // 15-94
      const b = Math.floor(Math.random() * (100 - a)) + 6; // Force regrouping
      problems.push(formatVertical(a, b, '+')); // ✅ PROPER ALIGNMENT
      answers.push((a + b).toString());
    }
  }
  
  else if (skillId === 'subtraction-with-regrouping') {
    // Level 20: Subtraction With Regrouping - PROPER VERTICAL ALIGNMENT
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 80) + 20; // 20-99
      const b = Math.floor(Math.random() * a) + 1;
      problems.push(formatVertical(a, b, '-')); // ✅ PROPER ALIGNMENT
      answers.push((a - b).toString());
    }
  }
  
  else if (skillId === 'introduction-to-multiplication') {
    // Level 21: Introduction to Multiplication - CLEAN FORMAT
    for (let i = 0; i < count; i++) {
      const groups = Math.floor(Math.random() * 4) + 2; // 2-5 groups
      const itemsPerGroup = Math.floor(Math.random() * 4) + 2; // 2-5 items
      problems.push(`${groups} groups of ${itemsPerGroup} = ${groups} × ${itemsPerGroup} = ___`);
      answers.push((groups * itemsPerGroup).toString());
    }
  }
  
  else if (skillId === 'multiplication-facts-2s-5s') {
    // Level 22: Multiplication Facts 2s and 5s - CLEAN FORMAT (NO ?)
    for (let i = 0; i < count; i++) {
      const base = [2, 5][i % 2];
      const factor = Math.floor(Math.random() * 10) + 1; // 1-10
      problems.push(`${base} × ${factor} =`); // ✅ NO QUESTION MARK
      answers.push((base * factor).toString());
    }
  }
  
  else if (skillId === 'introduction-to-division') {
    // Level 23: Introduction to Division - CLEAN FORMAT
    for (let i = 0; i < count; i++) {
      const divisor = Math.floor(Math.random() * 4) + 2; // 2-5
      const quotient = Math.floor(Math.random() * 6) + 1; // 1-6
      const dividend = divisor * quotient;
      problems.push(`${dividend} ÷ ${divisor} = ___ (${dividend} items shared equally into ${divisor} groups)`);
      answers.push(quotient.toString());
    }
  }
  
  else if (skillId === 'money-coins-bills') {
    // Level 24: Money (Coins and Bills) - CLEAN FORMAT
    for (let i = 0; i < count; i++) {
      const coins = [
        { name: 'penny', value: 1 },
        { name: 'nickel', value: 5 },
        { name: 'dime', value: 10 },
        { name: 'quarter', value: 25 }
      ];
      const coin = coins[i % coins.length];
      const count_coins = Math.floor(Math.random() * 5) + 1;
      problems.push(`How much money: ${count_coins} ${coin.name}${count_coins > 1 ? 's' : ''}`);
      answers.push(`${coin.value * count_coins}¢`);
    }
  }

  // =============================================================================
  // 3RD GRADE MASTERY (Ages 8-9) - Levels 25-32
  // =============================================================================
  
  else if (skillId === 'multiplication-facts-3s-4s') {
    // Level 25: Multiplication Facts 3s and 4s - CLEAN FORMAT (NO ?)
    for (let i = 0; i < count; i++) {
      const base = [3, 4][i % 2];
      const factor = Math.floor(Math.random() * 10) + 1; // 1-10
      problems.push(`${base} × ${factor} =`); // ✅ NO QUESTION MARK
      answers.push((base * factor).toString());
    }
  }
  
  else if (skillId === 'multiplication-facts-6s-7s') {
    // Level 26: Multiplication Facts 6s and 7s - CLEAN FORMAT (NO ?)
    for (let i = 0; i < count; i++) {
      const base = [6, 7][i % 2];
      const factor = Math.floor(Math.random() * 10) + 1; // 1-10
      problems.push(`${base} × ${factor} =`); // ✅ NO QUESTION MARK
      answers.push((base * factor).toString());
    }
  }
  
  else if (skillId === 'multiplication-facts-8s-9s') {
    // Level 27: Multiplication Facts 8s and 9s - CLEAN FORMAT (NO ?)
    for (let i = 0; i < count; i++) {
      const base = [8, 9][i % 2];
      const factor = Math.floor(Math.random() * 10) + 1; // 1-10
      problems.push(`${base} × ${factor} =`); // ✅ NO QUESTION MARK
      answers.push((base * factor).toString());
    }
  }
  
  else if (skillId === 'division-facts') {
    // Level 28: Division Facts - CLEAN FORMAT
    for (let i = 0; i < count; i++) {
      const divisor = Math.floor(Math.random() * 8) + 2; // 2-9
      const quotient = Math.floor(Math.random() * 8) + 1; // 1-8
      const remainder = Math.floor(Math.random() * (divisor - 1)); // 0 to divisor-1
      const dividend = divisor * quotient + remainder;
      if (remainder === 0) {
        problems.push(`${dividend} ÷ ${divisor} =`); // ✅ NO QUESTION MARK
        answers.push(quotient.toString());
      } else {
        problems.push(`${dividend} ÷ ${divisor} = ___ R ___`);
        answers.push(`${quotient} R ${remainder}`);
      }
    }
  }
  
  else if (skillId === 'fractions-parts-whole') {
    // Level 29: Fractions - Parts of a Whole - CLEAN FORMAT
    for (let i = 0; i < count; i++) {
      const fractions = [
        { visual: '■■□□', fraction: '1/2', description: '2 out of 4 shaded' },
        { visual: '■□□□', fraction: '1/4', description: '1 out of 4 shaded' },
        { visual: '■■■□', fraction: '3/4', description: '3 out of 4 shaded' }
      ];
      const frac = fractions[i % fractions.length];
      problems.push(`What fraction is shaded: ${frac.visual}`);
      answers.push(frac.fraction);
    }
  }
  
  else if (skillId === 'fractions-addition-subtraction') {
    // Level 30: Fractions - Addition and Subtraction - CLEAN FORMAT (NO ?)
    for (let i = 0; i < count; i++) {
      const operations = [
        { problem: '1/4 + 1/4 =', answer: '1/2' },
        { problem: '2/3 + 1/3 =', answer: '1' },
        { problem: '3/4 - 1/4 =', answer: '1/2' },
        { problem: '5/6 - 2/6 =', answer: '3/6 or 1/2' }
      ];
      const op = operations[i % operations.length];
      problems.push(op.problem); // ✅ NO QUESTION MARK
      answers.push(op.answer);
    }
  }
  
  else if (skillId === 'measurement-geometry') {
    // Level 31: Measurement and Geometry - CLEAN FORMAT
    for (let i = 0; i < count; i++) {
      const concepts = [
        { problem: 'How many inches in 1 foot', answer: '12' },
        { problem: 'A rectangle is 4cm long and 3cm wide. What is its perimeter', answer: '14cm' },
        { problem: 'How many sides does a triangle have', answer: '3' },
        { problem: 'What is the area of a rectangle 5 units long and 2 units wide', answer: '10 square units' }
      ];
      const concept = concepts[i % concepts.length];
      problems.push(concept.problem); // ✅ NO QUESTION MARK
      answers.push(concept.answer);
    }
  }
  
  else if (skillId === 'advanced-problem-solving') {
    // Level 32: Advanced Problem Solving - CLEAN FORMAT
    for (let i = 0; i < count; i++) {
      const wordProblems = [
        { problem: 'Sarah has 24 stickers. She gives away 8 and buys 15 more. How many stickers does she have now', answer: '31' },
        { problem: 'A store has 3 shelves with 12 books on each shelf. If 7 books are sold, how many books are left', answer: '29' },
        { problem: 'Tom saves $5 each week. How much money will he have after 8 weeks', answer: '$40' },
        { problem: 'There are 48 students. If they form teams of 6, how many teams can be made', answer: '8' }
      ];
      const wp = wordProblems[Math.floor(Math.random() * wordProblems.length)];
      problems.push(wp.problem); // ✅ NO QUESTION MARK
      answers.push(wp.answer);
    }
  }

  // =============================================================================
  // FALLBACK PATTERNS (for unmatched skills) - CLEAN FORMAT
  // =============================================================================
  
  else if (skillId.includes('addition') || skillId.includes('add')) {
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 20) + 1;
      const b = Math.floor(Math.random() * 20) + 1;
      problems.push(`${a} + ${b} =`); // ✅ NO QUESTION MARK
      answers.push((a + b).toString());
    }
  }
  
  else if (skillId.includes('subtraction') || skillId.includes('subtract')) {
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 30) + 10;
      const b = Math.floor(Math.random() * a) + 1;
      problems.push(`${a} - ${b} =`); // ✅ NO QUESTION MARK
      answers.push((a - b).toString());
    }
  }
  
  else {
    console.log('Using default arithmetic for skillId:', skillId);
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 15) + 1;
      const b = Math.floor(Math.random() * 15) + 1;
      problems.push(`${a} + ${b} =`); // ✅ NO QUESTION MARK
      answers.push((a + b).toString());
    }
  }
  
  console.log('Generated problems:', problems);
  console.log('Generated answers:', answers);
  return { problems, answers };
}

/**
 * Maps skill levels (1-32) to proper curriculum skill IDs
 */
function getSkillIdFromLevel(level) {
  const levelToSkillMap = {
    // PreK Foundation (Ages 3-4)
    1: 'number-recognition-1-3',
    2: 'number-recognition-4-5', 
    3: 'counting-objects-1-5',
    4: 'number-recognition-6-10',
    
    // Kindergarten Building (Ages 5-6)
    5: 'counting-objects-6-10',
    6: 'number-writing-1-10',
    7: 'number-sequence-1-20',
    8: 'simple-addition-within-5',
    
    // 1st Grade Foundation (Ages 6-7)
    9: 'simple-subtraction-within-5',
    10: 'addition-within-10',
    11: 'subtraction-within-10',
    12: 'addition-within-20',
    13: 'subtraction-within-20',
    14: 'place-value-to-100',
    15: 'skip-counting-2s-5s-10s',
    16: 'time-to-hour',
    
    // 2nd Grade Development (Ages 7-8)
    17: 'addition-within-100-no-regroup',
    18: 'subtraction-within-100-no-regroup',
    19: 'addition-with-regrouping',
    20: 'subtraction-with-regrouping',
    21: 'introduction-to-multiplication',
    22: 'multiplication-facts-2s-5s',
    23: 'introduction-to-division',
    24: 'money-coins-bills',
    
    // 3rd Grade Mastery (Ages 8-9)
    25: 'multiplication-facts-3s-4s',
    26: 'multiplication-facts-6s-7s',
    27: 'multiplication-facts-8s-9s',
    28: 'division-facts',
    29: 'fractions-parts-whole',
    30: 'fractions-addition-subtraction',
    31: 'measurement-geometry',
    32: 'advanced-problem-solving'
  };
  
  return levelToSkillMap[level] || 'addition-within-10';
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateFallbackProblems, getSkillIdFromLevel };
}

// Export for browser
if (typeof window !== 'undefined') {
  window.generateFallbackProblems = generateFallbackProblems;
  window.getSkillIdFromLevel = getSkillIdFromLevel;
}
