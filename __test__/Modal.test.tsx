import { Modal } from "@/components/UI/modal";
import { hero } from "@/constants/hero";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Modal component", () => {
  it("should renders corectly", () => {
    const closeModal = jest.fn();

    render(<Modal elem={hero} closeModal={closeModal} />);

    const modalElement = screen.getByText("Details");
    expect(modalElement).toBeInTheDocument();
  });

  it("should render modal with details", () => {
    const closeModal = jest.fn();

    render(<Modal elem={hero} closeModal={closeModal} />);

    expect(screen.getByText(hero.id)).toBeInTheDocument();
    expect(screen.getByText(hero.name)).toBeInTheDocument();
  });

  it("should call closeModal when clicking background", async () => {
    const closeModal = jest.fn();

    render(<Modal elem={hero} closeModal={closeModal} />);

    const background = screen.getByTestId("modal-background");
    userEvent.click(background);

    await waitFor(() => {
      expect(closeModal).toHaveBeenCalledTimes(1);
    });
  });

  it("should call closeModal when clicking close button", async () => {
    const closeModal = jest.fn();

    render(<Modal elem={hero} closeModal={closeModal} />);

    const closeButton = screen.getByRole("button");
    userEvent.click(closeButton);

    await waitFor(() => {
      expect(closeModal).toHaveBeenCalledTimes(1);
    });
  });
});
