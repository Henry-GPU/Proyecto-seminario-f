//import './StatusBadge.css'

function StatusBadge({ estado }) {
  const colors = {
    'Pendiente  ': '#E3A43D',
    'Morosisimo': '#F28B82',
    'Moroso': '#AECBFA',
    'Solvente': '#81C995'
  }

  return (
    <span className="status-badge" style={{ backgroundColor: colors[estado] }}>
      {estado}
    </span>
  )
}

export default StatusBadge
