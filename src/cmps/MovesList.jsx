import { Link } from 'react-router-dom'

export function MovesList(props) {
  const { moves, title } = props
  return (
    <ul className="moves-list">
      {moves.map((move) => (
        <li key={move.id} className="move-item">
          <h3>
            To:
            <Link to={`/contact/${move.to._id}`}>{move.to.name}</Link>
          </h3>

          <h3>BTC: {move.amount}</h3>
          <h3>At: {new Date(move.at).toLocaleString()}</h3>
        </li>
      ))}
    </ul>
  )
}
