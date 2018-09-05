const SAMPLE_REAL_TRACKS = JSON.parse(`
{
  "tracks": [
    {
      "name": "Let This",
      "artists": [
        "Sango",
        "Ago"
      ],
      "album": "North",
      "artwork": "https://i.scdn.co/image/64be3a266fe0d13305007f6d163a09a09d401650",
      "id": "0vS9uytpN9tZpXhywMfM8m"
    },
    {
      "name": "You",
      "artists": [
        "Sam Gouthro"
      ],
      "album": "SoulSam EP",
      "artwork": "https://i.scdn.co/image/fc014505e2dea40ebbe83e7f199064a8e5761805",
      "id": "4CxXbwusZ39LZAKY2dDXVL"
    },
    {
      "name": "Pasadena (feat. Vic Mensa)",
      "artists": [
        "Donnie Trumpet",
        "Vic Mensa"
      ],
      "album": "Donnie Trumpet & Emilio Chestevez",
      "artwork": "https://i.scdn.co/image/452ce214f8360a25fed9c86c23f233a0bf9f7a87",
      "id": "1IfhjPjiTYrTFxyRlV5QRN"
    },
    {
      "name": "Flow",
      "artists": [
        "Crooked Colours"
      ],
      "album": "Vera",
      "artwork": "https://i.scdn.co/image/793d17bcd054f0be307497c5555ffa19d8283ae8",
      "id": "0BQ0ZzRiojTMbWeMbNw6LF"
    },
    {
      "name": "Mistakes",
      "artists": [
        "San Cisco"
      ],
      "album": "Gracetown",
      "artwork": "https://i.scdn.co/image/89f7d57dadc93fc48f6417fb0f14d26b403a65f5",
      "id": "7eGaFUtczpN2BNnyw2AblM"
    },
    {
      "name": "Take Time",
      "artists": [
        "Awon"
      ],
      "album": "Matte Black Soul",
      "artwork": "https://i.scdn.co/image/c682bd08477204df47a4e4c078cb104a5f264e93",
      "id": "2QqAVlaV6Y45ebsXxfS5i8"
    }
  ],
  "audio": "https://p.scdn.co/mp3-preview/42438aa2672ec35b8442eb0a5228aa9082facd16?cid=68d8d5adac344ad59fa37afc65eb1b13"
}
`);

const SAMPLE_TRACKS = [
    {
        id: 0,
        name: 'Mellow Beats',
        artist: 'Spotify',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/1.png'
    },
    {
        id: 1,
        name: 'Tempest',
        artist: 'SOHN',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/2.png'
    },
    {
        id: 2,
        name: 'Lose My Head',
        artist: 'RUFUS',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/3.png'
    },
    {
        id: 3,
        name: 'Phenomenon',
        artist: 'Just A Gent',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/4.png'
    },
    {
        id: 4,
        name: 'Battas',
        artist: 'Mazde',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/5.png'
    },
    {
        id: 5,
        name: 'Rewind',
        artist: 'Louis Futon',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/6.png'
    }
];

const NEXT_TRACKS = [
    {
        id: 0,
        name: 'SDFDSFS',
        artist: 'Spotify',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/1.png'
    },
    {
        id: 1,
        name: 'SDFDSF',
        artist: 'SOHN',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/2.png'
    },
    {
        id: 2,
        name: 'SDFDSFSD',
        artist: 'RUFUS',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/3.png'
    },
    {
        id: 3,
        name: 'SDFSDSSS',
        artist: 'Just A Gent',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/4.png'
    },
    {
        id: 4,
        name: 'SFDSSS',
        artist: 'Mazde',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/5.png'
    },
    {
        id: 5,
        name: 'SSSSSS',
        artist: 'Louis Futon',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/6.png'
    }
];

export { SAMPLE_TRACKS, NEXT_TRACKS, SAMPLE_REAL_TRACKS };
