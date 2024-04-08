export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ClassNameWithChildrenProps extends ChildrenProps {
  className?: string;
}

export interface ISystemLog {
  type: "system" | "user";
  content: string;
  timestamp: Date;
}
