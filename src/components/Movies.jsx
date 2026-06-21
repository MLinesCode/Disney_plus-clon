import React from 'react'
import { movieRows } from '../data/movies'
import MovieRow from './MovieRow'

function Movies() {
  return (
    <div>
      {movieRows.map((row) => (
        <MovieRow key={row.id} title={row.title} movies={row.movies} />
      ))}
    </div>
  )
}

export default Movies
