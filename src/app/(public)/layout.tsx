export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full bg-gray-950 h-full justify-center items-center flex">
        {children}
    </div>
  );
}