export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full justify-center items-center flex">
        {children}
    </div>
  );
}