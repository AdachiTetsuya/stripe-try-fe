import { Link } from "react-router-dom";

import { Chapter } from "utils/types/chapter";

type ChapterItemProps = {
  chapter: Chapter;
};

const ChapterItem: React.FC<ChapterItemProps> = ({ chapter }) => {
  return chapter.isLocked ? (
    <div>
      <Link to={`/purchase`}>
        <p>{chapter.title}</p>
      </Link>
    </div>
  ) : (
    <div>
      <Link to={`/chapter/${chapter.id}`}>
        <p>{chapter.title}</p>
      </Link>
    </div>
  );
};

export default ChapterItem;
