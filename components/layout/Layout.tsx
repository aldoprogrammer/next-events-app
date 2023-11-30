import { ReactElement } from "react";
import MainHeader from "./MainHeader";

function Layout(props: { children: ReactElement<HTMLElement> }) {
  return (
    <>
    <title>Aldo - Event's App</title>
      <MainHeader />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
