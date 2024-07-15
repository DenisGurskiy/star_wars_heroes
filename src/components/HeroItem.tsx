import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVenusMars,
  faRulerVertical,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { HeroType } from "@/types/heroType";

// Define the Props type for the component, which includes a hero of type HeroType
type Props = {
  hero: HeroType;
};

// Functional component to render a hero item
function HeroItem({ hero }: Props) {
  return (
    // List item containing hero details, styled with Tailwind CSS classes
    <li className="bg-gray-800 border border-yellow-500 rounded-lg shadow-lg p-6 max-w-lg mx-auto w-3/4 flex flex-col gap-5">
      <h2 className="text-white text-2xl font-bold">{hero.name}</h2>
      <div className="flex justify-between items-center text-gray-300 gap-3 flex-wrap">
        {/* Display hero's gender if it's known */}
        {hero.gender !== "unknown" && (
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faVenusMars}
              className="text-yellow-500 mr-2"
            />
            <p>{hero.gender}</p>
          </div>
        )}
        {/* Display hero's height if it's known */}
        {hero.height !== "unknown" && (
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faRulerVertical}
              className="text-yellow-500 mr-2"
            />
            <p>{hero.height}</p>
          </div>
        )}
        {/* Display hero's mass if it's known */}
        {hero.mass !== "unknown" && (
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faWeightHanging}
              className="text-yellow-500 mr-2"
            />
            <p>{hero.mass}</p>
          </div>
        )}
      </div>
      {/* Link to the hero's detail page */}
      <Link href={`/${hero.id}`}>
        <button className="bg-yellow-500 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-yellow-400 transition duration-200">
          Дізнатися більше
        </button>
      </Link>
    </li>
  );
}

// Export the component as the default export
export default HeroItem;
