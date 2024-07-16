import { Film } from "@/types/film";
import { HeroType } from "@/types/heroType";
import { Starship } from "@/types/starship";
import React, { FC } from "react";

// Define the props type for the Modal component
type Props = {
  elem: Film | Starship | HeroType;
  closeModal: (value: Film | Starship | HeroType | null) => void;
};

// Functional component to render a modal with details of a hero, film, or starship
export const Modal: FC<Props> = ({ elem, closeModal }) => {
  const properties = Object.entries(elem); // Convert object properties to an array of [key, value] pairs

  return (
    // Wrapper div to center the modal and cover the entire viewport
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay to close the modal when clicked */}
      <div
        data-testid="modal-background"
        className="fixed inset-0 bg-slate-400 bg-opacity-50"
        onClick={() => closeModal(null)}
      ></div>
      {/* Modal content container */}
      <div className="w-3/4 h-auto absolute z-50 rounded-lg m-4 bg-gray-800 border border-yellow-500 shadow-lg p-6 max-w-screen-lg mx-auto overflow-y-auto max-h-dvh">
        {/* Close button */}
        <div className="w-full flex justify-end">
          <button
            className="text-white hover:text-gray-300 transition-all duration-200"
            onClick={() => closeModal(null)}
          >
            {/* SVG icon for the close button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Modal content */}
        <div className="w-full">
          <h2 className="text-xl text-white font-bold mb-4 text-center">
            Details
          </h2>
          <table className="table-auto w-full text-white">
            <tbody>
              {/* Render each property of the element */}
              {properties.map(([key, value]) => (
                <tr key={key}>
                  <td className="border border-gray-600 px-4 py-2 whitespace-nowrap">
                    {key}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {Array.isArray(value) ? (
                      // Render array values as a list
                      <ul className="flex gap-3 flex-wrap">
                        {value.map((item, index) => (
                          <li key={index}>{String(item)}</li>
                        ))}
                      </ul>
                    ) : (
                      // Render single values as a string
                      String(value)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
