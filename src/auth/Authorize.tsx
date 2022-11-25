import { ReactElement, useState } from "react";

export default function Authorize(props: authorizeProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);

  return <>{isAuthorized ? props.authorized : props.notAuthorized}</>;
}

interface authorizeProps {
  authorized: ReactElement;
  notAuthorized?: ReactElement;
  role?: string;
}
