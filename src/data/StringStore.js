import {ReduceStore} from 'flux/utils'

import AppDispatcher from './AppDispatcher'
import StringActionTypes from './StringActionTypes'

class StringStore extends ReduceStore {

    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return StringStore.en
    }

    reduce(state, action) {
        switch (action.type) {

            case StringActionTypes.LANG_EN:
                return StringStore.en

            case StringActionTypes.LANG_ZH:
                return StringStore.zh

            default:
                return state
        }
    }
}

StringStore.en = {
    add_new: 'Add New',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    i_understand: 'I understand',
    noun: 'Noun',
    nouns: 'Nouns',
    quiz: 'Quiz',
    save: 'Save',
    verb: 'Verb',
    verbs: 'Verbs',

    // Intro
    Level00: {
        help1: 'This program will help you build an English composition.',
        help2: 'In order to do that you must first learn how to build smaller pieces of English.',
        help3: 'You can then assemble the small pieces of English into larger components.',
        help4: 'You will learn how to do this by following these lessons.',
        help5: 'You are presently on Level 0. In order to proceed to the next level you will need to pass the quiz.'
    },

    // Nouns
    Level01: {
        help10: 'The things around us are called <strong>nouns</strong>.',
        quiz1: 'Can you add a new noun?',
        quiz2: 'Can you delete a noun from this list?',
        quiz3: 'Can you change the spelling of a noun?'
    },

    // Verbs
    Level02: {
        help10: 'The actions we can take are called <strong>verbs</strong>',
        quiz1: 'Can you add a new verb?',
        quiz2: 'Can you delete a verb from this list?',
        quiz3: 'Can you change the spelling of a verb?'
    },

    // Definite or Indefinite noun
    Level03: {
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

    // Phrase
    Level04: {
        help10: 'A group of words that work together is called a \'phrase\'.',
        help11: 'Building phrases is just the beginning. Later will we assemble phrases together into larger components.',
    },

    // Noun Phrase
    Level05: {
        help10: 'The first type of phrase to learn to build is called a \'noun phrase\'.',
        help11: 'In a noun phrase we start with a single noun and then add other words to enhance the meaning.'
    },

    // Plural or Singular
    Level06: {
        help10: 'When we write nouns must know how many of something we are writing about.',
        help11: 'For example are we writing about one cat or more than one cat?',
        help12: 'If we are writing about only one of something, then we use the base form of the noun.',
        help13: 'If we are writing about more than one, then we use the plural form of the noun.'
    },

    // Past Tense
    Level07: {
        help10:'We start with a \'base\' form of the verb and then we make changes to it according to the rules of grammar.',
        help11:'For example: If we performed the verb in the past we use the \'past tense\' form of the verb.',
        help12:'The base form of the verb is changed into the past-tense form according to certain rules.'
    },

    LevelControl: {
        level: 'Level',
        nextLevel: 'Next Level',
        previousLevel: 'Previous Level',
        reset: 'Reset'
    }
}

StringStore.zh = {
    add_new: '添加新',
    cancel: '取消',
    delete: '删除',
    edit: '编辑',
    i_understand: '我明白',
    noun: 'Noun',
    nouns: '名词 Nouns',
    quiz: '测试',
    save: '保存',
    verb: 'Verb',
    verbs: '动词 Verbs',

    Level00: {
        help1: '这个程序将帮助您建立一个英语文章。',
        help2: '为了做到这一点你必须首先学习如何构建英语的小块（句子和段落）。',
        help3: '然后,您可以将英语的小块组装成更大的组件。',
        help4: '通过以下课程您将知道如何学习英语。',
        help5: '你目前是0级，为了继续下一个阶段需要通过测验。'
    },
    Level01: {
        help10: '我们周围的人、事物、地点或抽象概念的名称叫做名词',
        quiz1: '你可以添加一个新的名词吗?',
        quiz2: '你可以从这个列表中删除一个名词吗?',
        quiz3: '你能改变一个名词的拼写吗?'
    },
    Level02: {
        help10: '陈述人或事物动作、情况、变化的词叫做动词',
        quiz1: '你可以添加一个新的动词吗?',
        quiz2: '你可以从这个列表中删除一个动词吗?',
        quiz3: '你能改变一个动词的拼写吗?'
    },
    // Definite or Indefinite noun
    Level03: {
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

    xLevel03: {
        help10: '当我们写名词时必须知道名词的形式。.',
        help11: '例如我们写关于一只猫或多只猫吗?',
        help12: '如果我们只写一个东西,我们用名词的基本形式。',
        help13: '如果我们写不止一个,那么我们使用名词的复数形式。'
    },
    LevelControl: {
        level: '级',
        nextLevel: '下一級',
        previousLevel: '上一級',
        reset: '返回'
    }
}

export default new StringStore()
