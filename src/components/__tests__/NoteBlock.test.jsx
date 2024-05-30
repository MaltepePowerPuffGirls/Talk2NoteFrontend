import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, test, expect } from "vitest";
import NoteBlock from "../NoteComponents/NoteBlock/NoteBlock";

describe("NoteBlock Component", () => {
  test("renders NoteBlock with provided text", () => {
    const text = "This is a test note.";
    render(<NoteBlock text={text} />);
    
    const paragraph = screen.getByText(text);
    expect(paragraph).toBeInTheDocument();
  });

  test("renders default text when no text is provided", () => {
    render(<NoteBlock text="" />);
    
    const defaultText = "This raw text cannot be converted.";
    const paragraph = screen.getByText(defaultText);
    expect(paragraph).toBeInTheDocument();
  });
});
