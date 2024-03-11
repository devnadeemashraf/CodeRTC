export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ClassNameWithChildrenProps extends ChildrenProps {
  className?: string;
}
