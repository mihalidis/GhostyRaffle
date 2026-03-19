export interface Participant {
  name: string;
  email: string;
}

export interface Match {
  giver: Participant;
  receiver: Participant;
}

/**
 * Creates a perfect Hamiltonian cycle so every person gives exactly one gift
 * and receives exactly one gift. No one is assigned to themselves.
 * Matches are never persisted — they exist only during the API call.
 */
export function createMatches(participants: Participant[]): Match[] {
  if (participants.length < 3) {
    throw new Error("At least 3 participants required.");
  }

  const shuffled = shuffle([...participants]);

  // Build cycle: 0→1, 1→2, ..., n-1→0
  return shuffled.map((giver, i) => ({
    giver,
    receiver: shuffled[(i + 1) % shuffled.length],
  }));
}

/**
 * Cryptographically secure random integer in [0, max).
 * Uses crypto.getRandomValues — available in Node.js 15+ and all modern browsers.
 */
function secureRandomInt(max: number): number {
  const array = new Uint32Array(1);
  // Rejection sampling to eliminate modulo bias
  const limit = 2 ** 32 - (2 ** 32 % max);
  let value: number;
  do {
    crypto.getRandomValues(array);
    value = array[0];
  } while (value >= limit);
  return value % max;
}

/** Fisher-Yates shuffle using a CSPRNG. */
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
