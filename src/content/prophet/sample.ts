import type { ProphetArticle } from "./types";
import cannabis from "../../assets/cannabis_integration.jpg";
import sameer from "../../assets/sameer1.jpg";

export const SAMPLE_ARTICLE: ProphetArticle = {
  episode: "EPISODE #01",
  date: "WEDNESDAY, 26 NOVEMBER, 2025",
  interviewee: "Sameer Kazmi",

  headline: "Small Talk is not real Conversation:",

  body: [
    `Opening the Door:
He asked me once—on a rainy afternoon in the Mensa, sunlight flickering in like it couldn’t decide whether to stay—“Why don’t you write a book?”
He said it casually, like a passing comment.
But some questions don’t pass. They settle.
At the time, I laughed it off. A writer? Me?
But here we are—life nudging me onto paths I didn’t even mark on the map.
Campus is full of people like that. We sit beside each other in lectures, swipe our cards at the same Mensa counter, nod politely on the bus. Familiar strangers.
We exchange the surface-level lines we’ve been trained to use:
“How was your weekend?”
“What did you have for lunch?”
But the real questions—
What’s heavy in your heart?
What dream keeps you awake?—
those stay quiet.
Too intimate for hallways. Too honest for convenience.
And yet, sometimes, someone unexpected appears…and you recognize a part of yourself in their story before you even know their name.`,
    `The Fiction of Familiarity
On a campus of thousands, you start drawing silent portraits of people.
A quick glance.
A vibe.
A guess.
But we don’t know anyone until they let us.
And most of us are waiting for someone to ask the kind of question that makes the mask slip—just a little.
Sameer was one of those people to me.
We’d crossed paths before—probably stood in line at Netto together, sat across from each other in the library without knowing it.
But it wasn’t until the interview that the sketch became a face, became a person, became a story.

3. The Interview
I placed my phone in the middle of the table.
Group Room 3.
Two chairs, a recorder, and the kind of silence that feels like a third participant.
“I’ll start now,” I told him.
My voice steadier than my heartbeat.
I expected myself to be nervous—but I watched the tension jump into him instead.
Arms shifting, back straightening, eyes searching.
He wasn’t scared of the question.
He was scared of being seen.
Humans are strange that way.
Sometimes the spotlight burns more than it illuminates.
“Relax,” I said. “It’s not an interrogation. Just a conversation.”
But that’s the thing:
Real conversation always asks for more than answers.
It asks for honesty.

Life’s Detours
As the recorder hummed, Sameer began to talk.
Not in polished monologue—in pieces.
The kind of pieces you only share when you’ve stopped pretending everything is fine.
He grew up in Karachi—a city that teaches you survival before it teaches you dreams.
And yet he held onto one anyway: building worlds through games.
Creating places people could step into, explore, escape, understand.
Germany wasn’t an accident.
It was a compass he followed long before he knew the coordinates.
He built his way into a job.
Then into a career.
Then—suddenly—out of both.
The high dissolved.
The certainty collapsed.
The “I’ve made it” became “Where do I begin again?”
Losing something you thought was permanent is its own kind of earthquake.
But losing it early in life is also a gift—a brutal one, a quiet one, but a gift nonetheless.
It puts you back where you actually belong:
at the start of the road you were meant to take, not the one you happened to land on.`,
  ],
  afterword: {
    title: "After the black line",
    body: [
      "Picture the spread on Dailymotion: the columns breathe, the sidebar’s black line pins the parchment in place, and then everything pauses. That same line becomes a divider, a cue that the tone can shift. Underneath it, the narration can stretch out, get more personal, invite sketches and notes that don’t quite fit the prim columns above.",
      "This is where the real tinkering happens. We can drop in follow-ups from the interview, progress logs from the startup build, or sketches from campus conversations. The black stroke gives readers permission to scroll past the formal story and watch the work-in-progress unfold — a living development diary stitched right under the feature.",
    ],
  },
  extendedBody: {
    title: "New Body",
    image: {
      src: sameer,
      alt: "Interview snapshot with notebooks spread across the table",
    },
    body: [
      "Below the divider is where each interview keeps breathing. The photo anchors the memory of the room while the right-hand notes capture what’s still unfolding after publication.",
      "Use this slot in every feature to log follow-up questions, progress updates, or sketches from the next conversation so readers see the process as it happens.",
    ],
  },
  sidebar: {
    title: "Hot News ❤️‍🔥" ,
    items: [
      {
        img: cannabis,
        title: "Integration, not escape:",
        text: "weed shouldn’t be a daily hiding spot, but a conscious, limited part of life — a tool you choose, not a crutch you need.",
      },
      {
        title: "When asked about integration of weed in people's life",
        text: "Samir argues not for quitting weed forever, but for integrating it into life without letting it become an escape route. For him, the real problem isn’t the joint — it’s when you need it just to feel okay, instead of facing what life is trying to teach you.",
      },
    ],
  },
};
