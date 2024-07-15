import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Flow } from "@/components/Flow";
import "@testing-library/jest-dom/extend-expect";
import { hero } from "@/constants/hero";
import { films } from "@/constants/films";
import { starships } from "@/constants/starships";

class ResizeObserver {
  callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    this.callback([{ target } as ResizeObserverEntry], this);
  }

  unobserve() {}

  disconnect() {}
}

class DOMMatrixReadOnly {
  m22: number;
  constructor(transform: string) {
    const scale = transform?.match(/scale\(([1-9.])\)/)?.[1];
    this.m22 = scale !== undefined ? +scale : 1;
  }
}

let init = false;

export const mockReactFlow = () => {
  if (init) return;
  init = true;

  global.ResizeObserver = ResizeObserver;

  // @ts-ignore
  global.DOMMatrixReadOnly = DOMMatrixReadOnly;

  Object.defineProperties(global.HTMLElement.prototype, {
    offsetHeight: {
      get() {
        return parseFloat(this.style.height) || 1;
      },
    },
    offsetWidth: {
      get() {
        return parseFloat(this.style.width) || 1;
      },
    },
  });

  (global.SVGElement as any).prototype.getBBox = () => ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
};

mockReactFlow();

jest.mock("@xyflow/react", () => ({
  Background: () => <div>Background</div>,
  ReactFlow: ({ nodes, edges, children, onNodeClick }: any) => (
    <div>
      {nodes.map((node: any) => (
        <div
          key={node.id}
          data-testid={`node-${node.id}`}
          onClick={() => onNodeClick({}, node)}
        >
          {node.data.label}
        </div>
      ))}
      {children}
    </div>
  ),
}));

describe("Flow component", () => {
  it("should render correctly and find hero node", () => {
    render(<Flow hero={hero} films={films} starships={starships} />);

    const heroNode = screen.getByTestId(`node-${hero.id}`);

    expect(heroNode).toBeInTheDocument();
    expect(heroNode).toHaveTextContent(hero.name);
  });

  it("should render film nodes", () => {
    render(<Flow hero={hero} films={films} starships={starships} />);

    const filmNode1 = screen.getByTestId(`node-film-${films[0].id}`);
    const filmNode2 = screen.getByTestId(`node-film-${films[1].id}`);

    expect(filmNode1).toBeInTheDocument();
    expect(filmNode1).toHaveTextContent(`Film: ${films[0].title}`);
    expect(filmNode2).toBeInTheDocument();
    expect(filmNode2).toHaveTextContent(`Film: ${films[1].title}`);
  });

  it("should render starship nodes", () => {
    render(<Flow hero={hero} films={films} starships={starships} />);

    const starshipNode1 = screen.getByTestId(
      `node-starship-${starships[0].id}`
    );
    const starshipNode2 = screen.getByTestId(
      `node-starship-${starships[1].id}`
    );

    expect(starshipNode1).toBeInTheDocument();
    expect(starshipNode1).toHaveTextContent(`StarShip: ${starships[0].name}`);
    expect(starshipNode2).toBeInTheDocument();
    expect(starshipNode2).toHaveTextContent(`StarShip: ${starships[1].name}`);
  });

  it("should handle node click and set modal content", async () => {
    render(<Flow hero={hero} films={films} starships={starships} />);

    const heroNode = screen.getByTestId(`node-${hero.id}`);

    expect(screen.queryByTestId("modal-content")).toBeNull();

    userEvent.click(heroNode);

    await waitFor(() => {
      const modalContentElement = screen.getByTestId("modal-content");
      expect(modalContentElement).toBeInTheDocument();
    });
  });
});
