import { render, screen } from "@testing-library/react";
import HeroItem from "@/components/HeroItem";
import { Hero } from "@/types/hero";
import { hero } from "@/constants/hero";

describe("HeroItem component", () => {

  it("should renders corectly", () => {
    render(<HeroItem hero={hero} />);

    const heroElement = screen.getByRole("listitem");

    expect(heroElement).toBeInTheDocument();
  });

  it("should render hero name", () => {
    render(<HeroItem hero={hero} />);

    const heroNameElement = screen.getByRole("heading");

    expect(heroNameElement).toBeInTheDocument();
    expect(heroNameElement).toHaveTextContent(hero.name);
  });

  it("should render gender, height, and mass if they are not 'unknown'", () => {
    render(<HeroItem hero={hero} />);

    const heroGenderElement = screen.getByText(hero.gender);
    const heroHeightElement = screen.getByText(hero.height);
    const heroMassElement = screen.getByText(hero.mass);

    expect(heroGenderElement).toBeInTheDocument();
    expect(heroHeightElement).toBeInTheDocument();
    expect(heroMassElement).toBeInTheDocument();
  });

  it("should not render gender, height, or mass if they are 'unknown'", () => {
    const newHero: Hero = {
      ...hero,
      gender: "unknown",
      height: "unknown",
      mass: "unknown",
    };
    render(<HeroItem hero={newHero} />);

    const heroGenderElement = screen.queryByText(hero.gender);
    const heroHeightElement = screen.queryByText(hero.height);
    const heroMassElement = screen.queryByText(hero.mass);

    expect(heroGenderElement).not.toBeInTheDocument();
    expect(heroHeightElement).not.toBeInTheDocument();
    expect(heroMassElement).not.toBeInTheDocument();
  });

  it("should render the button with the correct href", () => {
    render(<HeroItem hero={hero} />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", `/${hero.id}`);
  });
});
