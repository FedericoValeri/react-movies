import { ReactElement } from "react";
import Loading from "./Loading";

export default function GenericList(props: geenricListProps) {
  if (!props.list) {
    if (props.loadingUI) {
      return props.loadingUI;
    }
    return <Loading />;
  } else if (props.list.length === 0) {
    if (props.emptyListUI) {
      return props.emptyListUI;
    }
    return <>There are no elements to display.</>;
  } else {
    return props.children;
  }
}

interface geenricListProps {
  list: any;
  loadingUI?: ReactElement;
  emptyListUI?: ReactElement;
  children: ReactElement;
}
