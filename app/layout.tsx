export const metadata = {
  title: 'Novus Exchange',
  description: 'AI-powered analysis with a clean glass UI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#0b0f1a", color: "#fff", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
