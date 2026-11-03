// What guests can do at and around the resort.
// TODO(launch): owner to confirm which of these the resort really offers, and the prices.

export const experiences = [
  {
    title: 'Morning plantation walk',
    text: 'An hour on the estate paths with our caretaker, through tea, coffee and pepper vines, while the mist is still lifting off the valley. Free for guests.',
    image: 'experiences/tea-plantation-walk-vythiri',
    size: 'feature',
  },
  {
    title: 'Banana-leaf Kerala meal',
    text: 'Rice, sambar, avial, thoran, pickles and payasam, served on a leaf at lunch. Order a day ahead.',
    image: 'experiences/kerala-sadya-banana-leaf',
    size: 'tall',
  },
  {
    title: 'Evening campfire',
    text: 'A fire on the lawn after dark, with tapioca and chilli chutney or grilled chicken.',
    image: 'experiences/evening-campfire',
    size: 'regular',
  },
  {
    title: 'Birding before breakfast',
    text: 'Malabar whistling thrushes, barbets, bulbuls and hornbills visit the silver oaks. Binoculars at the front desk.',
    image: 'experiences/malabar-whistling-thrush',
    size: 'regular',
  },
  {
    title: 'Chembra and Banasura treks',
    text: 'We book permits, a jeep and a packed breakfast for the Chembra Peak trek or a Banasura Hill walk.',
    image: 'experiences/chembra-heart-lake-trek',
    size: 'wide',
  },
  {
    title: 'Ayurveda massage',
    text: 'Abhyanga oil massage and steam by a trained therapist from a licensed centre in Kalpetta, in your room or the spa hut. Book a day ahead.',
    image: null,
    size: 'regular',
  },
  {
    title: 'Kerala breakfast',
    text: 'Appam with egg curry, puttu and kadala, or dosa and chutney, with estate coffee. Included in every stay.',
    image: 'experiences/kerala-appam-egg-curry',
    size: 'regular',
  },
] as const;
