import { Hero } from "@/types/hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVenusMars,
  faRulerVertical,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type Props = {
  hero: Hero;
};

function HeroItem({ hero }: Props) {
  return (
    <li className="bg-gray-800 border border-yellow-500 rounded-lg shadow-lg p-6 max-w-lg mx-auto w-3/4 flex flex-col gap-5">
      <h2 className="text-white text-2xl font-bold">{hero.name}</h2>
      <div className="flex justify-between items-center text-gray-300 gap-3 flex-wrap">
        {hero.gender !== "unknown" && (
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faVenusMars}
              className="text-yellow-500 mr-2"
            />
            <p>{hero.gender}</p>
          </div>
        )}
        {hero.height !== "unknown" && (
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faRulerVertical}
              className="text-yellow-500 mr-2"
            />
            <p>{hero.height}</p>
          </div>
        )}
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
      <Link href={`/${hero.id}`}>
        <button className="bg-yellow-500 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-yellow-400 transition duration-200">
          Дізнатися більше
        </button>
      </Link>
    </li>
  );
}

export default HeroItem;
