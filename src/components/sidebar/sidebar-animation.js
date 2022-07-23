import { useSpring, to } from "react-spring"

export function setVisibility(isOpen) {
  const isShown = isOpen
    ? "xl:relative absolute xl:block xl:h-full h-screen"
    : "xl:hidden absolute"
  const sidebar = isShown

  return { sidebar }
}

export function useAnimation(isOpen) {
  const { translate } = useSpring({
    translate: [isOpen ? 0 : -120],
  })
  const sidebar = {
    transform: to(translate, x => `translateX(${x}%)`),
  }

  return { sidebar }
}
