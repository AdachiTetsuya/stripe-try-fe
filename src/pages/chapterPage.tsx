import { useEffect, useState } from "react";
import { Chapter } from "utils/types/chapter";
import { getChapters } from "api/service/chapter";
import ChapterItem from "components/chapterItem";

export default function ChapterPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    getChapters().then((response) => {
      setChapters(response);
    });
  }, []);

  return (
    <div>
      チャプターりすと
      {chapters.map((chapter) => {
        return <ChapterItem chapter={chapter} key={chapter.id} />;
      })}
    </div>
  );
}
