type KeywordTagsProps = {
  items: readonly string[];
};

export function KeywordTags({ items }: KeywordTagsProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          // 地球儀の点描の上に重なるため、下地を暗く敷いて可読性を確保する
          className="rounded-full border border-line bg-black/40 px-3 py-1 font-mono text-xs text-muted-strong backdrop-blur-md"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
