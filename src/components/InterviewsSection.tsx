import { useMemo, useState } from "react";

import { INTERVIEWS } from "../content/interviews";
import type { Interview } from "../types/content";

import { InterviewCard } from "./InterviewCard";
import styles from "./InterviewsSection.module.css";

type InterviewsSectionProps = {
  onOpen?: (interview: Interview) => void;
};

export function InterviewsSection({ onOpen }: InterviewsSectionProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<"new" | "old">("new");
  const [limit, setLimit] = useState(12);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(INTERVIEWS.map((interview) => interview.category)))],
    []
  );

  const items = useMemo(() => {
    let list = [...INTERVIEWS];

    if (category !== "All") {
      list = list.filter((interview) => interview.category === category);
    }

    if (query.trim()) {
      const text = query.toLowerCase();
      list = list.filter((interview) => {
        const haystack = (
          interview.title +
          interview.person +
          interview.excerpt +
          interview.tags.join(" ")
        ).toLowerCase();

        return haystack.includes(text);
      });
    }

    list.sort((a, b) =>
      sort === "new"
        ? b.dateISO.localeCompare(a.dateISO)
        : a.dateISO.localeCompare(b.dateISO)
    );

    return list;
  }, [category, query, sort]);

  const visible = items.slice(0, limit);
  const canLoadMore = limit < items.length;

  return (
    <div>
      <div className={styles.controls}>
        <input
          className={styles.input}
          placeholder="Search interviews…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <select
          className={styles.select}
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((entry) => (
            <option key={entry} value={entry}>
              {entry}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={sort}
          onChange={(event) => setSort(event.target.value as "new" | "old")}
        >
          <option value="new">Newest first</option>
          <option value="old">Oldest first</option>
        </select>
      </div>

      <div className={styles.grid}>
        {visible.map((item) => (
          <InterviewCard key={item.id} item={item} onOpen={onOpen} />
        ))}
      </div>

      {canLoadMore && (
        <div className={styles.loadMoreWrap}>
          <button className={styles.btn} onClick={() => setLimit((value) => value + 12)}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
}