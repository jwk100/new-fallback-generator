// ADD THESE IMPORTS at the top
import { generateMathWorksheet, loadMathPlugin } from './utils/mathWorksheetGenerator';

// ADD THIS STATE VARIABLE with your existing state
const [mathPluginLoaded, setMathPluginLoaded] = useState(false);

// ADD THIS useEffect with your existing useEffects
useEffect(() => {
  loadMathPlugin()
    .then(() => {
      setMathPluginLoaded(true);
      console.log('🧮 32-level math plugin ready!');
    })
    .catch((error) => {
      console.error('❌ Math plugin failed to load:', error);
    });
}, []);

// REPLACE your handleSendMessage function with this:
const handleSendMessage = async () => {
  if (!inputValue.trim() || isGenerating) return;

  const userMessage = {
    id: Date.now().toString(),
    role: 'user',
    content: inputValue,
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  const prompt = inputValue;
  setInputValue('');
  setIsGenerating(true);

  try {
    if (!mathPluginLoaded) {
      throw new Error('Math plugin not loaded yet. Please wait and try again.');
    }

    if (!selectedChild) {
      throw new Error('Please select a child first.');
    }

    // Show initial response
    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `I'll create a personalized worksheet for ${selectedChild?.name} based on your request: "${prompt}". Analyzing their skill level...`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, assistantMessage]);

    // Generate real worksheet using 32-level plugin
    const worksheetResult = await generateMathWorksheet({
      child: selectedChild,
      prompt: prompt
    });

    // Convert to your existing format
    const worksheet = {
      title: worksheetResult.title,
      subject: worksheetResult.subject,
      topic: worksheetResult.topic,
      problems: worksheetResult.problems.map(problem => ({
        id: problem.id,
        question: problem.question,
        answer: problem.answer,
        type: problem.type,
        skill: problem.skill,
        options: problem.options
      }))
    };

    // Add success message
    const successMessage = {
      id: (Date.now() + 2).toString(),
      role: 'assistant',
      content: `✅ Generated ${worksheet.problems.length} problems for ${selectedChild.name} (Level ${worksheetResult.level}, ${worksheetResult.topic}). Generation time: ${worksheetResult.generationTime}ms`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, successMessage]);

    setGeneratedWorksheet(worksheet);
    setViewMode('preview');
    
  } catch (error) {
    console.error('Worksheet generation error:', error);
    
    const errorMessage = {
      id: (Date.now() + 3).toString(),
      role: 'assistant',
      content: `❌ Sorry, I encountered an error: ${error.message}. ${mathPluginLoaded ? 'Please try a different request.' : 'The math plugin is still loading, please wait a moment and try again.'}`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsGenerating(false);
  }
};

// UPDATE your selectChild function to show plugin status:
const selectChild = (child) => {
  setSelectedChild(child);
  setCurrentUrl(`/${child.slug}`);
  setCurrentPage('studio');
  setSidebarOpen(false);
  
  const pluginStatus = mathPluginLoaded ? 
    '🧮 32-level math system ready!' : 
    '⏳ Loading math plugin...';
  
  setMessages([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm here to help create personalized worksheets for ${child.name} (${child.gradeLevel}, Math Level ${child.mathScore}/10). ${pluginStatus}\n\nWhat would you like to work on today? Try saying:\n• "Create 10 addition problems"\n• "Generate counting practice"\n• "Make multiplication worksheets"\n• "I need pattern recognition problems"`,
      timestamp: new Date()
    }
  ]);
};
