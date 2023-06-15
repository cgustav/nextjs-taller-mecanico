import { useDispatch, useSelector } from "react-redux";
import { USER_ROLES, logout, selectUser } from "../../features/auth/authSlice";
import {
  useEffect,
  useState,
  PropsWithChildren,
  Fragment,
  ReactNode,
  FC,
} from "react";

// export interface ProtectedItemProps {
//   whiteList: [];
//   children: any;
// }

type ConditionalComponentProps = {
  whiteList: string[];
  children: ReactNode;
};

const ProtectedItem: FC<ConditionalComponentProps> = ({
  whiteList,
  children,
}) => {
  const authenticated = useSelector(selectUser);

  const userRole = authenticated?.role;
  const isLoggedIn = userRole !== null && userRole !== undefined;

  useEffect(() => {}, [isLoggedIn, authenticated, userRole]);

  const shouldDisplayProtectedContent = (wl?: string[]): boolean => {
    const criteria = wl ? wl : [USER_ROLES.PERSONNEL, USER_ROLES.ADMIN];
    return isLoggedIn && criteria.includes(userRole);
  };

  return shouldDisplayProtectedContent(whiteList) ? <>{children}</> : <></>;
};

export default ProtectedItem;
