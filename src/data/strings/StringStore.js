// @flow
import {fromJS} from 'immutable'
import {ReduceStore} from 'flux/utils'

import StringActionTypes from './StringActionTypes'
import AppActionTypes    from '../app/AppActionTypes'
import AppDispatcher     from '../AppDispatcher'
import {langCode}        from '../I18NConstants'

import {localStorageAvailable} from '../../LocalStorage'
const localStorageKey = 'StringStore'

class StringStore extends ReduceStore {

    constructor() {
        super(AppDispatcher);
    }

    getInitialState():Object {
        if (localStorageAvailable) {
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState)
                return JSON.parse(localStorageState) // not immutable
        }
        return StringStore.initialState
    }

    reduce(state:Object, action:Object):Object {

        let newState:Object = state

        switch (action.type) {

            case AppActionTypes.ON_APP_RESET:
                newState = StringStore.initialState
                break
            
            case StringActionTypes.ON_LANG_EN:
                newState = StringStore.en
                break

            case StringActionTypes.ON_LANG_ZH:
                newState = StringStore.zh
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        // We don't really need to save all these strings to localStorage.  But presently
        // we need to do this in order to save the language selection. Find a more elegant way
        // to do this.
        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState))

        return newState
    }
}

StringStore.en = {
    lang: langCode.en,
    add_new: 'Add New',
    adjectivs: 'Adjectives',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    i_understand: 'I understand',
    noun: 'Noun',
    nouns: 'Nouns',
    noun_phrase: 'Noun Phrase',
    quiz: 'Quiz',
    save: 'Save',
    verb: 'Verb',
    verbs: 'Verbs',

    intro: {
        help1: 'This program will help you build an English composition.',
        help2: 'In order to do that you must first learn how to build smaller pieces of English.',
        help3: 'You can then assemble the small pieces of English into larger components.',
        help4: 'You will learn how to do this by following these lessons.',
        help5: 'You are presently on Level 0. In order to proceed to the next level you will need to pass the quiz.'
    },

    nound: {
        help10: 'The things around us are called <strong>nouns</strong>.',
        help11: 'In order to write English you will use many nouns.',
        help12: 'This is the dictionary of nouns that you can use.',
        help13: 'At this time there are very few nouns but you can add more nouns whenever you like.',
        quiz1: 'Can you add a new noun?',
        quiz2: 'Can you delete a noun from this list?',
        quiz3: 'Can you change the spelling of a noun?'
    },

    verbd: {
        help10: 'The actions we can take are called <strong>verbs</strong>',
        help11: 'In order to write English you will use many verbs.',
        help12: 'This is the dictionary of verbs that you can use.',
        help13: 'At this time there are very few verbs but you can add more verbs whenever you like.',
        quiz1: 'Can you add a new verb?',
        quiz2: 'Can you delete a verb from this list?',
        quiz3: 'Can you change the spelling of a verb?'
    },

    adjectivd: {
        help10: 'We modify the meaning of nouns by using adjectives.',
        help11: 'In order to write English you will use many adjectives.',
        help12: 'This is the dictionary of adjectives that you can use.',
        help13: 'At this time there are very few adjectives but you can add more adjectives whenever you like.',
        quiz1: 'Can you add a new adjective?',
        quiz2: 'Can you delete a adjective from this list?',
        quiz3: 'Can you change the spelling of a adjective?'
    },
    
    // Definite or Indefinite noun
    definiteness: {
        help10: 'Definite or Indefinite.',
        help11: 'Nouns are usually preceded by the word \'a\', \'an\', or \'the\'.',
        help12: 'If we have a group of similar items and we are talking about any one of them, then which particular item we are talking about is said to be \'indefinite\' and we use \'a\' or \'an\'.',
        help13: 'In this case we use \'a\' when the noun starts with a consonant and \'an\' when the noun starts with a vowel. We use this rule in order to make pronunciation better.',
        help14: 'For example: Buy a car. Which car to buy is indefinite.',
        help15: 'For example: Buy an apple. Which apple to buy is also indefinite.',

        help16: 'If we only have a single item, then the identity of that items is definite, so we can use \'the.\'.',
        help17: 'For example: Buy the car. Which particular car is already known and is definite.',
        quiz1: 'Select a noun',
        quiz2: 'Select \'definite\' or \'indefinite\'.',
        quiz3: 'Can you see that the article changes?'
    },
    phrase: {
        help10: 'A group of words that work together is called a \'phrase\'.',
        help11: 'Building phrases is just the beginning. Later will we assemble phrases together into larger components.',
    },
    np: {
        help10: 'The first type of phrase to learn to build is called a \'noun phrase\'.',
        help11: 'In a noun phrase we start with a single noun and then add other words to enhance the meaning.',
        help12: 'You have already seen your first noun phrase in the \'definite\' or \'indefinite\' lesson.  By selecting definite or indefinite, and a noun, you produced a two-word noun phrase.',
        help13: 'Here we repackage that into an explicit noun phrase format.',
        // although a noun phrase is usually more than one word, it could be just a single noun.
        quiz1: 'Can you add a new noun phrase?',
        quiz2: 'Can you delete a noun phrase from this list?',
        quiz3: 'Can you change the spelling of a noun phrase?'
    },
    verbConjugation: [
        'Every verb has a \'base\' form and four other variations.',
        'Given the \'base\' form of a verb we can make the other variations according to various rules.',
        'We use the different variations according to the rules of grammar.',
        'The process of making these variations is called \'conjugation\'.'
    ],
    pastForm: {
        help10:'The first verb conjugation that we will examine is the \'past\' form.',
        help11:'When an action happens in the past then we use the \'past\' form of the verb.',
        help12:'The base form of the verb is changed into the past-tense form according to certain rules.'
    },
    ingForm: {
        help10:'Another variation of the verb is called the \'-ing\' form.',
        help11:'We usually use this when something is happening in the present.'
    },
    vp: {
        help10: 'The next type of phrase to learn to build is called a \'verb phrase\'.',
        help11: 'In a verb phrase we start with a single verb and then add other words to enhance the meaning.',
        help12: 'You have already seen your first verb phrase in the \'past tense\' lesson.  By selecting \'future tense\' and a verb, you produced a two-word verb phrase.',
        help13: 'Here we repackage that into an explicit verb phrase format.',
        // although a verb phrase is usually more than one word, it could be just a single verb.
        quiz1: 'Can you add a new verb phrase?',
        quiz2: 'Can you delete a verb phrase from this list?',
        quiz3: 'Can you change the spelling of a verb phrase?'
    },
    clause: {
        help10: 'A clause has a noun phrase and a verb phrase.'
    },
    sentence: {
        help10: 'A sentence can have many clauses, or it may just have a single clause.'
    },
    pluralization: {
        help10: 'When we write a noun we must specifiy how many of something we are writing about.',
        help11: 'For example are we writing about one cat or more than one cat?',
        help12: 'If we are writing about only one of something, then we use the base form of the noun.',
        help13: 'If we are writing about more than one, then we use the plural form of the noun.'
    },
    npWithAdjectives: {
        help10: 'A Noun Phrase can have any number of adjectives.'
    },
    /**
     * workbench
     */

    // Plural or Singular
    //Level06: {

        //quiz:
    //},

    // Pluralization rules.
    // How do we convert the base form of a noun into its plural form?  There are a few rules for doing this.
    // We will often simply append the letter 's'.  For example, one cat or two cats.
    // Sometimes we will append the letters 'es'.  For example, one box or two boxes.
    // Sometimes the base and plural form are the same.  For example, one fish or two fish.
    // Sometimes the plural form cannot be made using a simple rule, it's just different.
    // For example, one man, two men.  Another example: one person, two people.
    // quiz: enter into the noun dictionary:

    // Past Tense
    //Level07: {
        //help10:'We start with a \'base\' form of the verb and then we make changes to it according to the rules of grammar.',
        //help11:'For example: If we performed the verb in the past we use the \'past tense\' form of the verb.',
        //help12:'The base form of the verb is changed into the past-tense form according to certain rules.'
    //},


    // Adjectives as part of noun phrases

    // Adverbs

    // Adverbs as part of verb phrases



    // Sentence. A sentence can have many clauses, or it may just have a single clause.
    // If you can put all these pieces together and the indicator turns green, then you have built a complete, grammatically correct sentence.
    // Until now, all of your writing has used the lower-case letters and no punctuation.  The first rule of capitalization is that the first letter of a sentence should be capitalized.
    // The first rule of punctuation is that a sentence should be terminated with a period.
    // You now have a dictionary of nound, verbd, adjectives, and adverbs.
    // You can create noun phrases and verb phrases.

    lessonNavigator: {
        level: 'Level',
        nextLevel: 'Next Level',
        previousLevel: 'Previous Level',
        reset: 'Reset'
    }
}

StringStore.zh = {
    lang: langCode.zh,
    add_new: '添加新',
    adjectivs: 'Adjectives',
    cancel: '取消',
    delete: '删除',
    edit: '编辑',
    i_understand: '我明白',
    noun: 'Noun',
    nouns: '名词 Nouns',
    noun_phrase: 'Noun Phrase',
    quiz: '测试',
    save: '保存',
    verb: 'Verb',
    verbs: '动词 Verbs',

    intro: {
        help1: '这个程序将帮助您建立一个英语文章。',
        help2: '为了做到这一点你必须首先学习如何构建英语的小块（句子和段落）。',
        help3: '然后,您可以将英语的小块组装成更大的组件。',
        help4: '通过以下课程您将知道如何学习英语。',
        help5: '你目前是0级，为了继续下一个阶段需要通过测验。'
    },
    nound: {
        help10: '我们周围的人、事物、地点或抽象概念的名称叫做名词',
        quiz1: '你可以添加一个新的名词吗?',
        quiz2: '你可以从这个列表中删除一个名词吗?',
        quiz3: '你能改变一个名词的拼写吗?'
    },
    verbd: {
        help10: '陈述人或事物动作、情况、变化的词叫做动词',
        quiz1: '你可以添加一个新的动词吗?',
        quiz2: '你可以从这个列表中删除一个动词吗?',
        quiz3: '你能改变一个动词的拼写吗?'
    },
    adjectivd: {
        help10: 'We modify the meaning of nouns by using adjectives.',
        help11: 'In order to write English you will use many adjectives.',
        help12: 'This is the dictionary of adjectives that you can use.',
        help13: 'At this time there are very few adjectives but you can add more adjectives whenever you like.',
        quiz1: 'Can you add a new adjective?',
        quiz2: 'Can you delete a adjective from this list?',
        quiz3: 'Can you change the spelling of a adjective?'
    },
    // Definite or Indefinite noun
    definiteness: {
        help10: '确定（Definite）或不确定（Indefinite）',
        help11: '名词通常这个词之前\'a\', \'an\',或\'the\'.',
        help12: '如果我们有一组类似的项目和我们谈论任何其中之一, 哪些特定的项目我们正在讨论 \'indefinite\' 我们使用 \'a\' 或 \'an\'.',
        help13: '在本例中，如果名词以元音开头则使用\'an\'，如果名词以辅音开头则使用\'a\'. 我们使用这个规则是为了使发音更好.',
        help14: '例如:买一辆车（a car). 去买哪一辆车？（indefinite）',
        help15: '例如: 买一个苹果（an apple). 买哪个苹果？（indefinite）.',

        help16: '如果我们有一个项目, 物品的身份不明确, 所以我们可以使用\'the.\'.',
        help17: '例如: 买那辆车`. 已经明确知道哪辆车.',
        quiz1: '选择一个名词的',
        quiz2: '选择 确定（\'definite\'） 或 不确定（\'indefinite\'）.',
        quiz3: '你能看到名词的变化吗?'
    },
    phrase: {
        help10: 'A group of words that work together is called a \'phrase\'.',
        help11: 'Building phrases is just the beginning. Later will we assemble phrases together into larger components.',
    },
    np: {
        help10: 'The first type of phrase to learn to build is called a \'noun phrase\'.',
        help11: 'In a noun phrase we start with a single noun and then add other words to enhance the meaning.',
        help12: 'You have already seen your first noun phrase in the \'definite\' or \'indefinite\' lesson.  By selecting definite or indefinite, and a noun, you produced a two-word noun phrase.',
        help13: 'Here we repackage that into an explicit noun phrase format.',
        // although a noun phrase is usually more than one word, it could be just a single noun.
        quiz1: 'Can you add a new noun phrase?',
        quiz2: 'Can you delete a noun phrase from this list?',
        quiz3: 'Can you change the spelling of a noun phrase?'
    },
    verbConjugation: [
        'Every verb has a \'base\' form and four other variations.',
        'Given the \'base\' form of a verb we can make the other variations according to various rules.',
        'We use the different variations according to the rules of grammar.',
        'The process of making these variations is called \'conjugation\'.'
    ],
    pastForm: {
        help10:'The first verb conjugation that we will examine is the \'past\' form.',
        help11:'When an action happens in the past then we use the \'past\' form of the verb.',
        help12:'The base form of the verb is changed into the past-tense form according to certain rules.'
    },
    ingForm: {
        help10:'Another variation of the verb is called the \'-ing\' form.',
        help11:'We usually use this when something is happening in the present.'
    },
    vp: {
        help10: 'The next type of phrase to learn to build is called a \'verb phrase\'.',
        help11: 'In a verb phrase we start with a single verb and then add other words to enhance the meaning.',
        help12: 'You have already seen your first verb phrase in the \'future tense\' lesson.  By selecting \'future tense\' and a verb, you produced a two-word verb phrase.',
        help13: 'Here we repackage that into an explicit verb phrase format.',
        // although a verb phrase is usually more than one word, it could be just a single verb.
        quiz1: 'Can you add a new verb phrase?',
        quiz2: 'Can you delete a verb phrase from this list?',
        quiz3: 'Can you change the spelling of a verb phrase?'
    },
    clause: {
        help10: 'A clause has a noun phrase and a verb phrase.'
    },
    sentence: {
        help10: 'A sentence can have many clauses, or it may just have a single clause.'
    },
    pluralization: {
        help10: '当我们写名词时必须知道名词的形式。.',
        help11: '例如我们写关于一只猫或多只猫吗?',
        help12: '如果我们只写一个东西,我们用名词的基本形式。',
        help13: '如果我们写不止一个,那么我们使用名词的复数形式。'
    },
    npWithAdjectives: {
        help10: 'A Noun Phrase can have any number of adjectives.'
    },
    lessonNavigator: {
        level: '级',
        nextLevel: '下一級',
        previousLevel: '上一級',
        reset: '返回'
    }
}

StringStore.initialState = StringStore.zh

export default new StringStore()
