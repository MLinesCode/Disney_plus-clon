const CDN = (hash, w = 400) =>
  `https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/${hash}/scale?width=${w}&aspectRatio=1.78&format=jpeg`

export const sliderItems = [
  { id: 1, image: '/images/slider-badging.jpg', title: 'Marvel Studios' },
  { id: 2, image: '/images/slider-badag.jpg', title: 'Star Wars' },
  { id: 3, image: '/images/slider-scale.jpg', title: 'Disney Originals' },
  { id: 4, image: '/images/slider-scales.jpg', title: 'Pixar Films' },
]

const POSTER =
  '6EA416AD3B15FCC1BADC817A932A57FFF707556DB2233FFCB4CFEB7C8EEDE23C'
const DETAIL_BG =
  '4F39B7E16726ECF419DD7C49E011DD95099AA20A962B0B10AA1881A70661CE45'
const DETAIL_LOGO =
  'D7AEE1F05D10FC37C873176AAA26F777FC1B71E7A6563F36C6B1B497CAB1CEC2'

const posterUrl = CDN(POSTER)

export const movieRows = [
  {
    id: 'recommended',
    title: 'Recommended for You',
    movies: [
      { id: 1, title: 'WandaVision', poster: posterUrl },
      { id: 2, title: 'The Mandalorian', poster: posterUrl },
      { id: 3, title: 'Luca', poster: posterUrl },
      { id: 4, title: 'Black Widow', poster: posterUrl },
      { id: 5, title: 'Soul', poster: posterUrl },
      { id: 6, title: 'Raya', poster: posterUrl },
      { id: 7, title: 'Falcon & Winter Soldier', poster: posterUrl },
      { id: 8, title: 'Cruella', poster: posterUrl },
    ],
  },
  {
    id: 'trending',
    title: 'Trending Now',
    movies: [
      { id: 9, title: 'Avengers: Endgame', poster: posterUrl },
      { id: 10, title: "Doctor Strange", poster: posterUrl },
      { id: 11, title: 'The Jungle Book', poster: posterUrl },
      { id: 12, title: 'Iron Man', poster: posterUrl },
      { id: 13, title: 'Thor', poster: posterUrl },
      { id: 14, title: 'Captain America', poster: posterUrl },
    ],
  },
  {
    id: 'new',
    title: 'New to Disney+',
    movies: [
      { id: 15, title: 'Hawkeye', poster: posterUrl },
      { id: 16, title: 'Eternals', poster: posterUrl },
      { id: 17, title: 'Shang-Chi', poster: posterUrl },
      { id: 18, title: 'What If...?', poster: posterUrl },
      { id: 19, title: 'Loki', poster: posterUrl },
      { id: 20, title: 'Ms. Marvel', poster: posterUrl },
      { id: 21, title: 'Moon Knight', poster: posterUrl },
      { id: 22, title: 'She-Hulk', poster: posterUrl },
    ],
  },
]

export const detailMovie = {
  background: CDN(DETAIL_BG, 1440),
  logo: CDN(DETAIL_LOGO, 1440),
}
