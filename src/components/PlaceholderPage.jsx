const PlaceholderPage = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <div className="text-6xl mb-4">🚧</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default PlaceholderPage
