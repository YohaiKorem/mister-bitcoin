import { Link } from 'react-router-dom'
import { useState } from 'react'
export function MovesList(props) {
  const { moves, title, isDetailsCmp } = props
  const [sortCriteria, setSortCriteria] = useState('date') // initialize sort criteria to 'date'

  // define the sorting function based on the current sort criteria
  const getSortedMoves = () => {
    if (sortCriteria === 'date') {
      return moves.sort((a, b) => new Date(b.at) - new Date(a.at))
    } else if (sortCriteria === 'amount') {
      return moves.sort((a, b) => b.amount - a.amount)
    }
  }

  const sortedMoves = getSortedMoves()
  return (
    <section className="moves-list-container">
      <div className="btns-container">
        <button
          className="btn btn-purple"
          onClick={() => setSortCriteria('date')}>
          Sort by moves date
        </button>
        <button
          className="btn btn-purple"
          onClick={() => setSortCriteria('amount')}>
          Sort by moves amount
        </button>
      </div>
      {sortedMoves.length > 0 ? (
        <ul className="moves-list">
          <h2>{title}</h2>
          {sortedMoves.map((move) => (
            <li key={move.id} className="move-item">
              {!isDetailsCmp && (
                <h3>
                  <Link
                    to={`/contact/${move.to?._id}`}>{`To: ${move.to?.name}`}</Link>
                </h3>
              )}

              <h3>BTC: {move.amount}</h3>
              <h3>At: {new Date(move.at).toLocaleString()}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <div>No moves yet</div>
      )}
    </section>
  )
}
