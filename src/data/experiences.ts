// Things guests often ask us to arrange. Availability depends on the resort; we confirm when booking.

export const experiences = [
  {
    title: 'Morning plantation walk',
    text: 'An hour on the estate paths with the planters, through tea, coffee and pepper vines, while the mist is still lifting. Most plantation stays offer one.',
    image: 'experiences/tea-plantation-walk-vythiri',
    size: 'feature',
  },
  {
    title: 'Banana-leaf Kerala meal',
    text: 'Rice, sambar, avial, thoran, pickles and payasam, served on a leaf at lunch. Many resorts make it if you order a day ahead.',
    image: 'experiences/kerala-sadya-banana-leaf',
    size: 'tall',
  },
  {
    title: 'Evening campfire',
    text: 'A fire on the lawn after dark, with tapioca and chilli chutney or a barbecue. Ask us for resorts that allow it.',
    image: 'experiences/evening-campfire',
    size: 'regular',
  },
  {
    title: 'Birding before breakfast',
    text: 'Malabar whistling thrushes, barbets, bulbuls and hornbills are common in the estates and forest edges. Go out at first light.',
    image: 'experiences/malabar-whistling-thrush',
    size: 'regular',
  },
  {
    title: 'Chembra and Banasura treks',
    text: 'We can help arrange a jeep and guide for the Chembra Peak trek or a Banasura Hill walk. Forest permits are issued on the day.',
    image: 'experiences/chembra-heart-lake-trek',
    size: 'wide',
  },
  {
    title: 'Ayurveda massage',
    text: 'Abhyanga oil massage and steam at resorts with a spa or a licensed centre nearby. Tell us when you book.',
    image: null,
    size: 'regular',
  },
  {
    title: 'Kerala breakfast',
    text: 'Appam with egg curry, puttu and kadala, or dosa and chutney, with local coffee. Breakfast is included at most resorts we book.',
    image: 'experiences/kerala-appam-egg-curry',
    size: 'regular',
  },
] as const;
