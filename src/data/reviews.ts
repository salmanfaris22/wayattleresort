// REAL guest reviews only, added with the guest's permission. Never write or edit a review here yourself.
// The section stays hidden while this list is empty.
export interface Review {
  name: string; // as the guest agreed, e.g. "Anu, Kochi"
  text: string; // the guest's own words
  rating: 1 | 2 | 3 | 4 | 5; // the rating the guest gave
  trip: string; // e.g. "Family trip, December 2026"
}

export const reviews: Review[] = [];
