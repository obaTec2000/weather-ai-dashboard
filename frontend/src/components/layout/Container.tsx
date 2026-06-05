interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5 ${className}`}>
      {children}
    </div>
  );
}
