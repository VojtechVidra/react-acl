import React, { PropsWithChildren } from "react";

interface Props {
  activeFilter?: boolean;
  onFilterChange(value: undefined | boolean): void;
}

export const TodoFilter = ({ onFilterChange, activeFilter }: Props) => {
  return (
    <>
      <h2>Filter</h2>

      <FilterButton
        active={activeFilter === true}
        onClick={() => onFilterChange(true)}
      >
        Done
      </FilterButton>
      <FilterButton
        active={activeFilter === false}
        onClick={() => onFilterChange(false)}
      >
        Not done
      </FilterButton>
      <FilterButton
        active={typeof activeFilter === "undefined"}
        onClick={() => onFilterChange(undefined)}
      >
        None
      </FilterButton>
    </>
  );
};

type ButtonProps = PropsWithChildren<{
  active: boolean;
  onClick(): void;
}>;

const FilterButton = ({ active, onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={active ? { color: "darkblue", fontWeight: "bold" } : undefined}
    >
      {children}
    </button>
  );
};
