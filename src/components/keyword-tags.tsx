type KeywordTagsProps = {
  items: readonly string[];
};

export function KeywordTags({ items }: KeywordTagsProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-line bg-white/5 px-3 py-1 font-mono text-xs text-muted-strong backdrop-blur-sm"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
