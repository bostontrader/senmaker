// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import StringActionTypes from './StringActionTypes'
import StringsEN         from './StringsEN'
import StringsZH         from './StringsZH'
import AppDispatcher     from '../AppDispatcher'
import {langCode}        from '../I18NConstants'
import AppActionTypes    from '../app/AppActionTypes'

import {localStorageAvailable} from '../LocalStorage'
import {migrate}               from '../LocalStorage'
const localStorageKey:string = 'StringStore'

// We want to provide a migration capacity for the format of this store.  It's serialized
// into localStorage and there's no telling when old versions will be seen in the future.
const initialStates:Array<Object> = [Map({v:1, lang: langCode.zh})]

/**
 * This store differs from the others.
 *
 * In this store want to save the language choice to
 * localState and we _do not_ want to save the blizzard of strings.  But for the ordinary
 * operation of the app, we _do_ want the strings in the state.  We must therefore engage
 * in contortions to append and prune the strings from the state where applicable.
 *
 */
class StringStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {
        if (localStorageAvailable) {
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = migrate(fromJS(JSON.parse(localStorageState)), initialStates)
                if(originalParse.get('lang') === langCode.zh) originalParse = originalParse.set('strings', StringsZH)
                else if(originalParse.get('lang') === langCode.en) originalParse = originalParse.set('strings', StringsEN)
                // else max fubar error

                return originalParse
            }
        }

        return initialStates.slice(-1)[0].set('strings', StringsZH)
    }
    
    reduce(state:Object, action:Object):Object {

        let newState:Object = state

        switch (action.type) {

            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = initialStates.slice(-1)[0].set('strings', StringsZH)
                break
            
            case StringActionTypes.ON_LANG_EN:
                newState = newState.set('lang', langCode.en)
                newState = newState.set('strings', StringsEN)
                break

            case StringActionTypes.ON_LANG_ZH:
                newState = newState.set('lang', langCode.zh)
                newState = newState.set('strings', StringsZH)
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        // We don't need to save all these strings to localStorage but we do
        // want to save the language selection.
        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.delete('strings').toJSON()))

        return newState
    }
}

/*StringsEN = {

    misc: {
        add_new: 'Add New',
        adjectivs: 'Adjectives',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        i_understand: 'I understand',
        introduction: 'Introduction',
        noun: 'Noun',
        nouns: 'Nouns',
        noun_phrase: 'Noun Phrase',
        quiz: 'Quiz',
        save: 'Save',
        verb: 'Verb',
        verbs: 'Verbs',
    },

    intro: { // 0
        title: 'Introduction 引言',
        help10: 'This program will help you build an English composition.',
        help11: 'In order to do that you must first learn how to build smaller pieces of English.',
        help12: 'You can then assemble the small pieces of English into larger components.',
        help13: 'You will learn how to do this by following these lessons.',
        quiz10: 'You are presently on Level 0. In order to proceed to the next level you will need to pass the quiz.'
    },

    nound: { // 1
        title: 'Nouns 名词',
        help10: 'The things around us are called nouns.',
        help11: 'In order to study English you will use many nouns.',
        help12: 'This is the dictionary of nouns that you can use.',
        help13: 'At this time there are very few nouns but you can add more nouns whenever you like.',
        quiz1: 'Can you add a new noun?',
        quiz2: 'Can you delete a noun from this list?',
        quiz3: 'Can you change the spelling of a noun?'
    },

    definiteness: { // 2
        title: 'Definite or Indefinite',
        help10: 'Nouns are usually preceded by the word \'a\', \'an\', or \'the\'.  These three words are called \'articles\'.',
        help11: 'The word \'the\' is called the \'definite article\'. Nouns in English are frequently preceded by the definite article when the speaker believes that the listener already knows what he is referring to.',
        help12: 'For example: Buy the car. Which particular car is already known and is definite.',
        help13: 'The words \'a\' and \'an\' are called  \'indefinite articles\'. Nouns in English have an indefinte article before them when the speaker is referring to any one of a class of similar items but does not know which particular item.',
        help14: 'In this case we use \'a\' when the noun starts with a consonant and \'an\' when the noun starts with a vowel. We use this rule in order to make pronunciation better.',
        help15: 'For example: Buy a car. The particular car to buy is indefinite.',
        help16: 'For example: Buy an apple. The particular apple to buy is indefinite.',

        quiz1: 'Select a noun',
        quiz2: 'Select \'definite\' or \'indefinite\'.',
        quiz3: 'Can you see that the article changes?',
        quiz4: 'I can see it change'
    },

    phrase: { // 3
        title: 'Phrases 短语',
        help10: 'A group of words that work together is called a \'phrase\'.',
        help11: 'Building phrases is just the beginning. Later we will assemble phrases together into larger components.',
    },

    np: { // 4
        title: 'Noun Phrases 名词短语',
        help10: 'The first type of phrase to learn to build is called a \'noun phrase\'.',
        help11: 'To make a noun phrase start with a single noun and then add other words to enhance the meaning.',
        help12: 'You have already seen your first noun phrase in the \'definite\' or \'indefinite\' lesson.  When you selected a noun and definite or indefinite you produced a two-word noun phrase.',
        help13: 'A noun phrase usually has more than one word.  But it might only have a single noun.',
        quiz1: 'Can you add a new noun phrase?',
        quiz2: 'Can you change the noun in a noun phrase?',
        quiz3: 'Can you change the article in a noun phrase?',
        quiz4: 'Can you delete a noun phrase?'
    },

    //np: { // 4
    //title: 'Noun Phrases 名词短语',
    //help10: 'The first type of phrase to learn to build is called a \'noun phrase\'.',
    //help12: 'You have already seen your first noun phrase in the \'definite\' or \'indefinite\' lesson.'
    // In that lesson you made a two-word noun phrase.',
    //help13: 'A noun phrase usually has more than one word, but it might only have a single noun.',
    //},

    adjectivd: { // 5
        title: 'Adjectives 形容词',
        help10: 'We add meaning to noun phrases by using adjectives.',
        help11: 'In order to study English you will use many adjectives.',
        help12: 'This is the dictionary of adjectives that you can use.',
        help13: 'At this time there are very few adjectives but you can add more adjectives whenever you like.',
        quiz1: 'Can you add a new adjective?',
        quiz2: 'Can you delete an adjective from this list?',
        quiz3: 'Can you change the spelling of an adjective?'
    },

    npAdjective: { // 6
        title: 'Noun Phrase 名词短语 with Adjectives 形容词',
        help10: 'A Noun Phrase can have any number of adjectives.',
        quiz1: 'Can you add an adjective?',
        quiz2: '',
        quiz3: '',

    },

    verbd: { // 7
        title: 'Verbs 动词',
        help10: 'The actions that we can take are called verbs.',
        help11: 'In order to study English you will use many verbs.',
        help12: 'This is the dictionary of verbs that you can use.',
        help13: 'At this time there are very few verbs but you can add more verbs whenever you like.',
        quiz1: 'Can you add a new verbs?',
        quiz2: 'Can you delete a verbs from this list?',
        quiz3: 'Can you change the spelling of a verbs?'
    },

    verbConjugation: { // 8
        title: 'Verb Conjugation',
        help10: 'Every verb has a \'base\' form and four other variations.',
        help11: 'For example: \'steals\', \'stole\', \'stealing\', and \'stolen\' are the four variations of the base verb \'steal\',',
        help12: 'We use the different variations of the verbs according to the rules of grammar.',
        help13: 'The process of making these variations is called \'conjugation\'.',
        help14: 'You can find the conjugations of a verb in a dictionary.',
        help15: 'Many of the conjugations have patterns that you will notice.',
        help16: 'However, there are so many exceptions to the patterns that it will be best to use a dictionary in order to conjugate your verbs.'
    },

    pastForm: { // 9
        title: 'Verb Past Form',
        help10: 'The first verb conjugation that we will examine is the \'past\' form.',
        help11: 'When an action happens in the past then we use the \'past\' form of the verb.'
    },

    verbTime: { // 10
        title: 'Verb Time',
        help10: 'When does the verb happen?  Did it happen in the past? Is it happening now?  Will it happen in the future?',
        help11: 'This choice will determine which conjugation to use.',
        help12: 'The verb may also need additional words added to it because of this choice.'
    },

    vp: { // 11
        title: 'Verb Phrases',
        help10: 'The next type of phrase to learn to build is called a \'verb phrase\'.',
        help11: 'verbs and verb phrases are very complicated so you must proceed slowly and carefully in order to understand them.',
        help12: 'A verb phrase usually has more than one word, but it might only have a single verb.',
        quiz1: 'Can you add a new verb phrase?',
        quiz2: 'Can you change the verb in a verb phrase?',
        quiz3: 'Can you change the time of a verb phrase?',
        quiz4: 'Can you delete a verb phrase?'
    },

    lessonNavigator: {
        level: 'Level',
        nextLevel: 'Next Level',
        previousLevel: 'Previous Level',
        reset: 'Reset'
    }
}

StringsZH = {

    misc: {
        add_new: '添加新',
        adjectivs: 'Adjectives',
        cancel: '取消',
        delete: '删除',
        edit: '编辑',
        i_understand: '我明白',
        introduction: '引言',
        noun: 'Noun',
        nouns: '名词 Nouns',
        noun_phrase: 'Noun Phrase',
        quiz: '测试',
        save: '保存',
        verb: 'Verb',
        verbs: '动词 Verbs',
    },

    intro: { // 0
        title: 'Introduction 引言',
        help10: '这个程序将帮助您建立一个英语文章。',
        help11: '为了做到这一点你必须首先学习如何构建英语的小块（句子和段落）。',
        help12: '然后,您可以将英语的小块组装成更大的组件。',
        help13: '通过以下课程您将知道如何学习英语。',
        quiz10: '你目前是0级，为了继续下一个阶段需要通过测验。'
    },

    nound: { // 1
        title: 'Nouns 名词',
        help10: '我们周围的东西叫做名词(noun)。',
        help11: '为了学习英文，你将会使用很多名词(noun)。',
        help12: '这是你可以使用的名词(noun)字典。',
        help13: '在开始只有少量的名词(noun)，但你可以随时添加更多的名词(noun)。',
        quiz1: '你可以添加一个新的名词(noun)吗?',
        quiz2: '你可以从这个列表中删除一个名词(noun)吗?',
        quiz3: '你能改变一个名词(noun)的拼写吗?'
    },

    definiteness: { // 2
        title: 'Definite（确定）or Indefinite（或不确定）',
        help10: '名词通常这个词之前\'a\', \'an\',或\'the\'. 这三个词被称为\'articles\' （冠词）',
        help11: '这个单词\'the\'叫做\'definite article\' (定冠词)。在英语中，名词往往在前面的一篇文章中出现，当演讲者相信听众已经知道他指的是什么。',
        help12: '例如:买 \'the car\'。哪辆车已经是已知的，而且是确定的。',
        help13: '这些单词\'a\'和\'an\'被称为\'indefinite articles\'(不定冠词)。名词在他们之前有一个不定冠词，指的是同类类似的东西，但不知道具体指的哪个。',
        help14: '在这种情况下，当名词从辅音开始时，使用\'a\'，当名词从元音开始时，使用\'an\'。 我们使用这个规则来使发音更好。',
        help15: '例如:买 \'a car\'。 那辆车是不确定的。',
        help16: '例如:买 \'an apple\'。 苹果是不确定的。',

        quiz1: '选择一个noun的',
        quiz2: '选择 确定（\'definite\'） 或 不确定（\'indefinite\'）.',
        quiz3: '你能看到冠词(article)的改变吗？',
        quiz4: '我可以看到它的改变'
    },

    phrase: { // 3
        title: 'Phrases 短语',
        help10: '一组合作的词汇被称为短语 \'phrase\'。',
        help11: '建造短语只是开始。 稍后我们会将短语组合成更大的组件。',
    },

    np: { // 4
        title: 'Noun Phrases 名词短语',
        help10: '学习构建的第一个短语叫\'名词短语\' (noun phrase)',
        help11: '组建一个名词短语(noun phrase)，从一个名词(noun)开始然后再加上其他词来增强意思。',
        help12: '你已经见过你的第一个名词(noun)短语\'确定\'（definite)或\'不确定\'(indefinite)课。 当你选择了一个名词,\'确定\'(definite)或\'不确定\'(indefinite)你产生由两个词名词短语(noun phrase)。',
        help13: '名词短语(noun phrase)通常有不止一个词。它有时可能只有一个名词(noun)。',
        quiz1: '你能添加一个新的名词短语(noun phrase)吗?',
        quiz2: '你能改变名词短语(noun phrase)中的名词(noun)吗?',
        quiz3: '你能改变名词短语(noun phrase)中的冠词(article)吗?',
        quiz4: '你能删除名词短语(noun phrase)吗?'
    },

    adjectivd: { // 5
        title: 'Adjectives 形容词',
        help10: '我们可以增加形容词来增强名词短语的意思',
        help11: '为了学习英文，你将会使用很多形容词(adjective)。',
        help12: '这是你可以使用的形容词(adjective)字典。',
        help13: '在开始只有少量的形容词(adjective)，但你可以随时添加更多的形容词(adjective)。',
        quiz1: '你可以添加一个新的形容词(adjective)吗?',
        quiz2: '你可以从这个列表中删除一个形容词(adjective)吗?',
        quiz3: '你能改变一个形容词(adjective)的拼写吗?'
    },

    npAdjective: { // 6
        title: 'Noun Phrase 名词短语 with Adjectives 形容词',
        help10: '名词短语可以有任意数量的形容词.'
    },

    verbd: { // 7
        title: 'Verbs 动词',
        help10: 'The actions that we can take are called verbs.',
        help11: '为了学习英文，你将会使用很多动词(verb)。',
        help12: '这是你可以使用的动词(verb)字典。',
        help13: '在开始只有少量的动词(verb)，但你可以随时添加更多的动词(verb)。',
        quiz1: '你可以添加一个新的动词(verb)吗?',
        quiz2: '你可以从这个列表中删除一个动词(verb)吗?',
        quiz3: '你能改变一个动词(verb)的拼写吗?'
    },

    verbConjugation: { // 8
        title: 'Verb Conjugation',
        help10: 'Every verb has a \'base\' form and four other variations.',
        help11: 'For example: \'steals\', \'stole\', \'stealing\', and \'stolen\' are the four variations of the base verb \'steal\',',
        help12: 'We use the different variations of the verbs according to the rules of grammar.',
        help13: 'The process of making these variations is called \'conjugation\'.',
        help14: 'You can find the conjugations of a verb in a dictionary.',
        help15: 'Many of the conjugations have patterns that you will notice.',
        help16: 'However, there are so many exceptions to the patterns that it will be best to use a dictionary in order to conjugate your verbs.'
    },

    pastForm: { // 9
        title: 'Verb Past Form',
        help10: 'The first verb conjugation that we will examine is the \'past\' form.',
        help11: 'When an action happens in the past then we use the \'past\' form of the verb.'
    },

    verbTime: { // 10
        title: 'Verb Time',
        help10: 'When does the verb happen?  Did it happen in the past? Is it happening now?  Will it happen in the future?',
        help11: 'This choice will determine which conjugation to use.',
        help12: 'The verb may also need additional words added to it because of this choice.'
    },

    vp: { // 11
        title: 'Verb Phrases',
        help10: 'The next type of phrase to learn to build is called a \'verb phrase\'.',
        help11: 'verbs and verb phrases are very complicated so you must proceed slowly and carefully in order to understand them.',
        help12: 'A verb phrase usually has more than one word, but it might only have a single verb.',
        quiz1: 'Can you add a new verb phrase?',
        quiz2: 'Can you change the verb in a verb phrase?',
        quiz3: 'Can you change the time of a verb phrase?',
        quiz4: 'Can you delete a verb phrase?'
    },

    lessonNavigator: {
        level: '级',
        nextLevel: '下一級',
        previousLevel: '上一級',
        reset: '返回'
    }
}

StringStore.initialState = StringsZH*/

export default new StringStore()
