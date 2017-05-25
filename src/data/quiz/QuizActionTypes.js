/**
 * These are actions that only affect the quiz.
 * Not all lessons have action types defined here.
 */
const QuizActionTypes = {
    intro:           {ON_I_UNDERSTAND:        'ON_I_UNDERSTAND'},        //  0
    definiteness:    {ON_ISEE_CHANGE_ARTICLE: 'ON_ISEE_CHANGE_ARTICLE'}, //  2
    phrase:          {ON_I_UNDERSTAND:        'ON_I_UNDERSTAND2'},       //  3
    npAdjective:     {ON_I_UNDERSTAND:        'ON_I_UNDERSTAND6'},       //  6
    verbConjugation: {ON_I_UNDERSTAND:        500,},                     //  8
    pastForm:        {ON_I_UNDERSTAND:        'ON_I_UNDERSTAND9'},       //  9
    verbTime:        {ON_I_UNDERSTAND:        501,},                     // 10

    //sentence:        {ON_I_UNDERSTAND:        'ON_I_UNDERSTAND4'},       //
    //pluralization:   {ON_I_UNDERSTAND:        'ON_I_UNDERSTAND5'}        //
}

export default QuizActionTypes
