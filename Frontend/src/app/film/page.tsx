import TransitionWrapper from "../components/TransitionWrapper";
import FilmScene from "./FilmScene";
import "./film.css";

/**
 * Film: the vinyl page's sibling. Each case study is a roll of 35mm film;
 * loading one into the camera and firing the shutter opens the case study.
 * Not linked from the site yet. See README.md in this folder.
 */
export default function FilmPage() {
  return (
    <TransitionWrapper>
      <div className="film-page">
        <FilmScene />
      </div>
    </TransitionWrapper>
  );
}
