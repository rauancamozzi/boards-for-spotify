interface GridProps {
  colSpan?: number;
  rowSpan?: number;
  children?: React.ReactNode;
}

const GridItem: React.FC<GridProps> = ({ colSpan = 1, rowSpan = 1, children }) => {
  return (
    <div className={ `col-span-${colSpan} row-span-${rowSpan} rounded-2xl bg-stone-800 border-purple border-[1px] p-4` }>
      { children }
    </div>
  );
};

export default GridItem;