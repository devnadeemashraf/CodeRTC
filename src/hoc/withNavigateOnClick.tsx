import React from "react";
import { useNavigate } from "react-router-dom";

const withNavigateOnClick = <P extends object>(
  Component: React.ComponentType<P>,
  route: string
) => {
  const NavigateOnClick: React.FC<P> = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(route);
    };

    return (
      <div onClick={handleClick}>
        <Component {...(props as P)} />
      </div>
    );
  };

  return NavigateOnClick;
};

export default withNavigateOnClick;
