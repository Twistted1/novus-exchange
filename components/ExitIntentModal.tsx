export default function ExitIntentModal({ open, onClose }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="glass p-6 max-w-md w-full">
        <h3 className="text-xl font-bold">Join the Newsletter</h3>
        <p className="mt-2 text-gray-300">Get sharp insights, twice weekly.</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 rounded-lg bg-red-600">Close</button>
      </div>
    </div>
  )
}

