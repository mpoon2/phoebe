import React from "react";
import { animated } from "react-spring";
import { useAnimation } from "./useAnimation";
import "./sidebar-post.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons'

const LOCAL_STORAGE_KEY = "isSidebarOpen";

function useSidebar() {
  const persistedState =
    typeof window === "undefined"
      ? false
      : localStorage.getItem(LOCAL_STORAGE_KEY) === "true";

  const [isOpen, setIsOpen] = React.useState(true);
  const toggle = () => setIsOpen(value => !value);

  // Persist to localStorage
  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(isOpen));
  }, [isOpen]);

  // Rehydrate with persisted data
  React.useEffect(() => {
    setIsOpen(persistedState);
  }, []);

  return { isOpen, toggle };
}

export default function SideBar() {
  const { isOpen, toggle } = useSidebar();
  const styles = useAnimation(isOpen);

  return (
    <div className="sidebar-div hidden lg:block">
      <animated.div className="sidebar" style={styles.sidebar}>
        <div className="sidebar-top flex flex-row">
          <animated.p className="sidebar-title w-full hideElement" style={styles.hideElement}>
            Sidebar
          </animated.p>
          <button className="sidebar-toggle" onClick={toggle}>
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <FontAwesomeIcon icon={faChevronLeft} size="s" />
            ) : (
              <FontAwesomeIcon icon={faChevronRight} size="s" />
            )}
          </button>
        </div>
      </animated.div>
      <animated.div className="main" style={styles.main}>
      </animated.div>
    </div>
  );
}