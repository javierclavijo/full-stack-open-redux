import anecdoteService from "../services/anecdoteService";
import {setNotification} from "./notificationReducer";

const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const initialState = []

export const voteAnecdote = (anecdote) => {
    return async dispatch => {
        const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
        await anecdoteService.update(newAnecdote)
        dispatch({
            type: "VOTE",
            data: anecdote
        })
        dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
    }
}

export const newAnecdote = (anecdote) => {
    return async dispatch => {
        const anecdoteBody = {
            content: anecdote,
            id: getId(),
            votes: 0
        }
        await anecdoteService.createNew(anecdoteBody)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: anecdoteBody
        })
        dispatch(setNotification(`Added anecdote '${anecdote}'`, 5))
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INITIALIZE',
            data: anecdotes
        })
    }
}

const reducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'VOTE':
            const newState = [...state]
            newState.find(n => n.id === action.data.id).votes += 1
            return newState
        case 'NEW_ANECDOTE':
            return [...state, action.data]
        case 'INITIALIZE':
            return action.data
        default:
            return state
    }
}

export default reducer