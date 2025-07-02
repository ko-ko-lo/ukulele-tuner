type LinkButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  onClick,
}) => (
  <button className="as-link" onClick={onClick}>
    {children}
  </button>
);
