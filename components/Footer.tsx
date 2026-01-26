export default function Footer() {
  return (
    <footer className="py-6 glass border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
        <div className="mb-2 md:mb-0">&copy; {new Date().getFullYear()} Novus Exchange. All rights reserved.</div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
