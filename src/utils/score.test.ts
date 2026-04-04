import { describe, it, expect } from "vitest";
import Score from "./score";
import { Labels, ScoreCard } from "../types";

describe("Score utility", () => {
  const dantaiLabels: Labels = { id: "dantai", name: "Dantai", labels: [] };
  const dantaiIntlLabels: Labels = { id: "dantai_intl", name: "Dantai Intl", labels: [] };
  const tenkaiMainLabels: Labels = { id: "tenkai_intl_main", name: "Tenkai Main", labels: [] };

  describe("calcTotal", () => {
    it("calculates the total score correctly for legacy dantai", () => {
      const rows = [
        { id: 0, key: 0, value: 1 },
        { id: 1, key: 1, value: 2 },
        { id: 2, key: 2, value: 3 },
        { id: 3, key: 3, value: 4 },
        { id: 4, key: 4, value: 5 },
        { id: 5, key: 5, value: 0.5 },
      ];
      const expected = (1 + 2 + 3 + 4 + 5 + 0.5) / 5;
      expect(Score.calcTotal(rows, dantaiLabels)).toBe(expected);
    });

    it("calculates the total score correctly for Dantai Intl", () => {
      const rows = [
        { id: 0, key: 0, value: 2 }, // Lost Sync: 2 * 0.1 = 0.2
        { id: 1, key: 1, value: 3 }, // Basic Tech: 3 * 0.1 = 0.3
        { id: 2, key: 2, value: 1 }, // Balance: 1 * 0.3 = 0.3
        { id: 3, key: 3, value: 8.5 }, // Rank
        { id: 4, key: 4, value: 0.2 }, // Handspring bonus
        { id: 5, key: 5, value: 0.2 }, // Cartwheel bonus
        { id: 6, key: 6, value: 0 }, // Somersault bonus
        { id: 7, key: 7, value: 0.8 }, // Twisted bonus
      ];
      expect(Score.calcTotal(rows, dantaiIntlLabels)).toBeCloseTo(8.9);
    });
  });

  describe("getStanding", () => {
    const history: ScoreCard[] = [
      {
        eventId: "dantai",
        scores: [
          { id: 0, key: 0, value: 1 },
          { id: 1, key: 1, value: 2 },
          { id: 2, key: 2, value: 3 },
          { id: 3, key: 3, value: 4 },
          { id: 4, key: 4, value: 5 },
          { id: 5, key: 5, value: 0 },
        ], // Total: 3
      },
      {
        eventId: "tenkai",
        scores: [
          { id: 0, key: 0, value: 10 },
          { id: 1, key: 1, value: 10 },
          { id: 2, key: 2, value: 10 },
          { id: 3, key: 3, value: 10 },
          { id: 4, key: 4, value: 10 },
          { id: 5, key: 5, value: 0 },
        ], // Total: 10 (different event)
      },
      {
        eventId: "dantai",
        scores: [
          { id: 0, key: 0, value: 2 },
          { id: 1, key: 1, value: 2 },
          { id: 2, key: 2, value: 3 },
          { id: 3, key: 3, value: 4 },
          { id: 4, key: 4, value: 5 },
          { id: 5, key: 5, value: 0 },
        ], // Total: 3.2
      },
    ];

    it("returns the correct standing within the same event type", () => {
      const newScore = [
        { id: 0, key: 0, value: 1 },
        { id: 1, key: 1, value: 1 },
        { id: 2, key: 2, value: 1 },
        { id: 3, key: 3, value: 1 },
        { id: 4, key: 4, value: 1 },
        { id: 5, key: 5, value: 0 },
      ]; // Total: 1
      expect(Score.getStanding(history, newScore, dantaiLabels)).toBe(3);
    });

    it("is not affected by scores in other event types", () => {
      const newScore = [
        { id: 0, key: 0, value: 5 },
        { id: 1, key: 1, value: 5 },
        { id: 2, key: 2, value: 5 },
        { id: 3, key: 3, value: 5 },
        { id: 4, key: 4, value: 5 },
        { id: 5, key: 5, value: 0 },
      ]; // Total: 5 (Higher than dantai scores, lower than tenkai score)
      expect(Score.getStanding(history, newScore, dantaiLabels)).toBe(1);
    });
  });

  describe("isTie", () => {
    const history: ScoreCard[] = [
      {
        eventId: "dantai",
        scores: [
          { id: 0, key: 0, value: 1 },
          { id: 1, key: 1, value: 2 },
          { id: 2, key: 2, value: 3 },
          { id: 3, key: 3, value: 4 },
          { id: 4, key: 4, value: 5 },
          { id: 5, key: 5, value: 0 },
        ], // Total: 3
      },
    ];

    it("returns true if there is a tie in the same event", () => {
      const newScore = [
        { id: 0, key: 0, value: 1 },
        { id: 1, key: 1, value: 2 },
        { id: 2, key: 2, value: 3 },
        { id: 3, key: 3, value: 4 },
        { id: 4, key: 4, value: 5 },
        { id: 5, key: 5, value: 0 },
      ]; // Total: 3
      expect(Score.isTie(history, newScore, dantaiLabels)).toBe(true);
    });

    it("returns false if there is a tie only in a different event", () => {
      const tenkaiHistory: ScoreCard[] = [
        {
          eventId: "tenkai",
          scores: [
            { id: 0, key: 0, value: 1 },
            { id: 1, key: 1, value: 2 },
            { id: 2, key: 2, value: 3 },
            { id: 3, key: 3, value: 4 },
            { id: 4, key: 4, value: 5 },
            { id: 5, key: 5, value: 0 },
          ], // Total: 3 (different event)
        }
      ];
      const newScore = [
        { id: 0, key: 0, value: 1 },
        { id: 1, key: 1, value: 2 },
        { id: 2, key: 2, value: 3 },
        { id: 3, key: 3, value: 4 },
        { id: 4, key: 4, value: 5 },
        { id: 5, key: 5, value: 0 },
      ]; // Total: 3
      expect(Score.isTie(tenkaiHistory, newScore, dantaiLabels)).toBe(false);
    });
  });
});
