import React from "react";
import {newAnecdote} from "../reducers/anecdoteReducer";
import {connect} from 'react-redux'

const AnecdoteForm = (props) => {
    const createAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.newAnecdote(anecdote)
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div><input name="anecdote"/></div>
                <button>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    newAnecdote
}
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm