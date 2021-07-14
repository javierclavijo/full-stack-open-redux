import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {initializeAnecdotes, voteAnecdote} from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes
        .filter(a => a.content.includes(state.filter)))
    const dispatch = useDispatch()

    useEffect(async () => {
        dispatch(initializeAnecdotes())
    }, [dispatch])

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voteAnecdote(anecdote))
    }

    return (<div>
        {anecdotes
            .sort((a1, a2) => a2.votes - a1.votes)
            .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
    </div>)
}

export default AnecdoteList