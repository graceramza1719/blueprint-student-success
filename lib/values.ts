export interface ValueOption {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export const VALUE_OPTIONS: ValueOption[] = [
  { id: "helping", name: "Helping Others", description: "I want my work to make someone's life better", emoji: "🤝" },
  { id: "creativity", name: "Creativity", description: "I want to make, design, or build things", emoji: "🎨" },
  { id: "stability", name: "Stability", description: "I need a job I can count on to pay the bills", emoji: "🏠" },
  { id: "independence", name: "Independence", description: "I want to be my own boss or work on my own terms", emoji: "🔑" },
  { id: "family", name: "Family", description: "I want a schedule that lets me be there for my people", emoji: "❤️" },
  { id: "community", name: "Community", description: "I want to stay close to home and serve my neighborhood", emoji: "🌍" },
  { id: "learning", name: "Learning", description: "I want to keep growing and figuring out new things", emoji: "📚" },
  { id: "leadership", name: "Leadership", description: "I want to be in charge and make decisions", emoji: "🏆" },
  { id: "money", name: "Money", description: "I want to earn enough to never stress about bills again", emoji: "💰" },
  { id: "recognition", name: "Recognition", description: "I want to be respected and known for what I do", emoji: "⭐" },
  { id: "adventure", name: "Adventure", description: "I want variety - no two days the same", emoji: "⚡" },
  { id: "justice", name: "Justice", description: "I want to fight for what's right and stand up for people", emoji: "⚖️" },
  { id: "technology", name: "Technology", description: "I want to work with computers, apps, or gadgets", emoji: "💻" },
  { id: "health", name: "Health", description: "I want to help people stay well and take care of their bodies", emoji: "🩺" },
  { id: "nature", name: "Nature", description: "I want to work outside or with the environment", emoji: "🌿" },
  { id: "expression", name: "Expression", description: "I want to perform, write, or tell stories", emoji: "🎤" },
];

export const VALUE_NAME_MAP = VALUE_OPTIONS.reduce<Record<string, string>>((acc, value) => {
  acc[value.id] = value.name;
  return acc;
}, {});
