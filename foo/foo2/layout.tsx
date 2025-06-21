export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div>{children}</div>
      </body>
    </html>
  )
}
