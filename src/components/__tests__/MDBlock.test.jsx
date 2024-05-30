import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; 
import MDBlock from "../NoteComponents/MDBlock/MDBlock";

describe("MDBlock Component", () => {
    test("renders MDBlock component with markdown text", () => {
      const markdownText = "# This is a heading\n\nThis is a paragraph with **bold** text.";
      
      render(<MDBlock markdownText={markdownText} />);
      
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("This is a heading");
  
      const paragraph = screen.getByText((content, element) => {
        const hasText = (node) => node.textContent === "This is a paragraph with bold text.";
        const elementHasText = hasText(element);
        const childrenDontHaveText = Array.from(element?.children || []).every(child => !hasText(child));
        return elementHasText && childrenDontHaveText;
      });
      expect(paragraph).toBeInTheDocument();
      expect(paragraph.innerHTML).toContain("<strong>bold</strong>");
    });
  
    test("renders nothing when markdownText is empty", () => {
      const { container } = render(<MDBlock markdownText="" />);
      expect(container.firstChild).toBeNull();
    });
});