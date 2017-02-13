import React from 'react';

import classnames from 'classnames';

function AppView(props) {
    return (
        <div>
            {/*<Header {...props} >*/}
            <Main nouns={props.nouns} />
            {/*<Footer {...props} />*/}
        </div>
    );
}

/*function Header(props) {
    return (
        <header id="header">
            <h1>nouns</h1>
            <NewNoun {...props} />
        </header>
    );
}*/

function Main(props) {
    if (props.nouns.size === 0) {
        return null;
    }

    // If this were expensive we could move it to the container.
    //const areAllComplete = props.nouns.every(noun => noun.complete);


    return (
        <section id="main">
            {/*<input
                checked={areAllComplete ? 'checked' : ''}
                id="toggle-all"
                type="checkbox"
                onChange={props.onToggleAllNouns}
            />
            <label htmlFor="toggle-all">
                Mark all as complete
            </label> */}
            <ul id="noun-list">
                {[...props.nouns.values()].reverse().map(noun => (
                    <NounItem
                        key={noun.id}
                        editing={props.editing}
                        noun={noun}
                        onDeleteNoun={props.onDeleteNoun}
                        onEditNoun={props.onEditNoun}
                        onStartEditingNoun={props.onStartEditingNoun}
                        onStopEditingNoun={props.onStopEditingNoun}
                        onToggleNoun={props.onToggleNoun}
                    />
                ))}
            </ul>
        </section>
    )
}

/*function Footer(props) {
    if (props.nouns.size === 0) {
        return null;
    }

    const remaining = props.nouns.filter(noun => !noun.complete).size;
    const completed = props.nouns.size - remaining;
    const phrase = remaining === 1 ? ' item left' : ' items left';

    let clearCompletedButton = null;
    if (completed > 0) {
        clearCompletedButton =
            <button
                id="clear-completed"
                onClick={props.onDeleteCompletedNouns}>
                Clear completed ({completed})
            </button>
    }

    return (
        <footer id="footer">
      <span id="noun-count">
        <strong>
          {remaining}
        </strong>
          {phrase}
      </span>
            {clearCompletedButton}
        </footer>
    );
}

const ENTER_KEY_CODE = 13;
function NewNoun(props) {
    const addNoun = () => props.onAdd(props.draft);
    const onBlur = () => addNoun();
    const onChange = (event) => props.onUpdateDraft(event.target.value);
    const onKeyDown = (event) => {
        if (event.keyCode === ENTER_KEY_CODE) {
            addNoun();
        }
    };
    return (
        <input
            autoFocus={true}
            id="new-noun"
            placeholder="What needs to be done?"
            value={props.draft}
            onBlur={onBlur}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
}
*/
function NounItem(props) {
    const {editing, noun} = props;
    //const isEditing = editing === noun.id;
    const isEditing = false
    //const onDeleteNoun = () => props.onDeleteNoun(noun.id);
    //const onStartEditingNoun = () => props.onStartEditingNoun(noun.id);
    //const onToggleNoun = () => props.onToggleNoun(noun.id);

    // Construct the input for editing a task if necessary.
    //let input = null;
    //if (isEditing) {
        //const onChange = (event) => props.onEditNoun(noun.id, event.target.value);
        //const onStopEditingNoun = props.onStopEditingNoun;
        //const onKeyDown = (event) => {
            //if (event.keyCode === ENTER_KEY_CODE) {
                //onStopEditingNoun();
            //}
        //};
        /*input =
            <input
                autoFocus={true}
                className="edit"
                value={noun.text}
                onBlur={onStopEditingNoun}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />;*/
    //}

    return (
        <li>
            <div className="view">

                <label >
                    {noun.base}
                </label>
            </div>
        </li>
    );
}

export default AppView