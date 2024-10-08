import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ChallengeList from "./ChallengeList";
import Challenge from "../interfaces/Challenge";
import { describe, expect, it, vi } from "vitest";

describe("ChallengeList Component", () => {
  it("renders a list of challenges", () => {
    // 创建一个测试挑战数组
    const challenges: Challenge[] = [
      { id: 1, monthName: "April", description: "Challenge 1" }, 
      { id: 2, monthName: "March", description: "Challenge 2" }, 
    ];

    // 创建一个空的 setChallenges 函数（可以使用 jest.fn() 来创建一个模拟函数）
    const setChallenges = vi.fn();

    // 渲染 ChallengeList 组件
    render(
      <ChallengeList challenges={challenges} setChallenges={setChallenges} />
    );

    // 断言：确保挑战项是否在文档中
    expect(screen.getByText("Challenge 1")).toBeInTheDocument();
    expect(screen.getByText("Challenge 2")).toBeInTheDocument();
  });

  it("renders an empty list when there are no challenges", () => {
    const challenges: Challenge[] = [];
    const setChallenges = vi.fn();

    render(
      <ChallengeList challenges={challenges} setChallenges={setChallenges} />
    );

    // 断言：确保列表为空
    expect(screen.queryByText("Challenge 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Challenge 2")).not.toBeInTheDocument();
  });
});
