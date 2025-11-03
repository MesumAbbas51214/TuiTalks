import type { ProphetArticle } from "./types";

export const SAMPLE_ARTICLE: ProphetArticle = {
  issue: "ISSUE #1",
  dateText: "TUESDAY, 01 JUNE, 2021",
  cost: "5 KUNTS",
  headline: "More than 500 million copies of the Harry Potter books sold",
  dek: "Twenty years ago, readers around the world first discovered the magical story of Harry Potter…",
  hero: {
    src: "https://ebookfriendly.com/wp-content/uploads/2015/12/New-covers-for-Harry-Potter-ebooks-animated.gif",
    alt: "Harry Potter Book set by J.K Rowling",
  },
  body: [
    "Twenty years ago, readers around the world first discovered the magical story of Harry Potter, created by J.K. Rowling. We can now reveal that, since that moment, half a billion Harry Potter books have now been sold. On average, this means one in fifteen people in the world owns a Harry Potter book. The 500 million sales are across the seven books in the series and the three companion volumes, in print and eBook versions.",
    "First published by Bloomsbury in 1997, the books have now been translated into over 80 different languages across the world, with more to come. From Albanian to Azerbaijani to Hebrew to Hawaiian, the stories are becoming accessible to more people all the time.",
  ],
  sidebar: {
    title: "Hot News!",
    items: [
      {
        img: "https://i.gifer.com/MGXa.gif",
        title: "WIZARD MAGICIAN BREAKS STATUTE OF SECRECY ON CHRISTMAS EVE",
        text: "This Christmas Eve a performer of the magical arts… (Click to read the whole article)",
      },
    ],
  },
};
