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
    i_understand: 'I understand',
    nouns: 'Nouns',
    quiz: 'Quiz',
    level00: {
        help1: 'This program will help you build an English composition.',
        help2: 'In order to do that you must first learn how to build smaller pieces of English.',
        help3: 'You can then assemble the small pieces of English into larger components.',
        help4: 'You will learn how to do this by following these lessons.',
        help5: 'You are presently on Level 0. In order to proceed to the next level you will need to pass the quiz.'
    }
}
StringStore.zh = {
    i_understand: '我明白',
    nouns: 'Nouns',
    quiz: '测试',
    level00: {
        help1: '这个程序将帮助您建立一个英语作文。',
        help2: '为了做到这一点你必须首先学习如何构建英语的小块（句子和段落）。',
        help3: '然后,您可以将英语的小块组装成更大的组件。',
        help4: '通过以下课程您将知道如何学习英语。',
        help5: '你目前是0级，为了继续下一个阶段需要通过测验。'
    }
}

export default new StringStore()
