import React from 'react'
import MuxPlayer from '@mux/mux-player-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Image from 'next/image'

export default function VideoLibraryPage() {
  const speedCatalog = [
    {
      name: 'Warmup/ Elasticity',
      description:
        'Elasticity exercises enhance your ability to quickly absorb and release energy for more dynamic movements but also double as an effective warm-up.',
      videos: [
        {
          video_num: 'C0923',
          id: '01qFT2Y7ABip9eXMGkul6gKFn01Gs02T35aSLi8cOisgtU',
          playback_id: 'Rr4NjtFFHYITZ1scaHx5NAaTlv92CwpHGCQvQ18302OA',
          category: 'warmup',
          title: 'Verticle Pogos',
          uploaded: true,
        },
        {
          video_num: 'C0924',
          id: 'F6Vq025z9XOJt23NdqzdCd9xmd4FcuXf017nCpBL14xSQ',
          playback_id: 'ru01a84tdERNQTifnccp2Y4kytmT01kOoqLcJKX01kVQJQ',
          category: 'warmup',
          title: 'Side to Side Pogos',
          uploaded: true,
        },
        {
          video_num: 'C0925',
          id: 'eUGkKfrBqQbSNhEu7z8FyZzjULpgWdRtyEOU1OX0299Y',
          playback_id: '5f2ZxfQxiIuHrmQ1XEN2ttN9tyCmrcQIdHimjf02rGLU',
          category: 'warmup',
          title: 'Lateral Pogos',
          uploaded: true,
        },
        {
          video_num: 'C0926',
          id: 'ILhxLjOmdPHQrb02rvqiqp02963fxHzBOObqAqG6OiXFE',
          playback_id: 'KlYerfZ5qGda51dk1H0200X01ROjPXumGlAANUQHE00IliQ',
          category: 'warmup',
          title: 'Skipping Rope',
          uploaded: true,
        },
        {
          video_num: 'C0927',
          id: 'wAuwePBLgc7eWzNRkP3YZwgwieuu01YRcXyXsBAA4bzo',
          playback_id: 'sM1B4luxiN7wJo00w47zBwm4vKFNEU334hkFMf1EAci4',
          category: 'warmup',
          title: 'Single Leg Skipping Rope',
          uploaded: true,
        },
        {
          video_num: 'C0928',
          id: '8YqQ9HGnE01klLwss01PDDAk8e7dX01y5gpouNPneu1dMs',
          playback_id: 'deh5zWhBth63DWN2ib8UJPl6XffXEERxovY016LxUUOY',
          category: 'warmup',
          title: 'Hurdle Hops',
          uploaded: true,
        },
        {
          video_num: 'C0929',
          id: 'eonQ9GcVm00sB4P02nmlzxhJ7INZT8897AAyqKWxF9800o',
          playback_id: 'GwwtY027uxy4i3ved00r4B8szgjR5SS01YL00ajBN739i7E',
          category: 'warmup',
          title: 'Single Leg FLFLF Hurdle Hops',
          uploaded: true,
        },
      ],
    },
    {
      name: 'Power',
      description:
        'Power exercises are designed to maximize your speed and explosiveness, enabling your muscles to exert peak force in the shortest possible time.',
      videos: [
        {
          video_num: 'C0897',
          id: '27cEqq0239s3jjJ5qSTPhUDMPQIABwHGft9sALxfvl1Y',
          playback_id: '3OuaEpG3MHF01x6h7Hbos9u9tYO4MLJHGslydpw5r9sU',
          category: 'power',
          title: 'Medball Heave',
          uploaded: true,
        },
        {
          video_num: 'C0898',
          id: '3mettPjwllQysWsufF9nCxEi3wDtDPHaOKVCYuc9OvM',
          playback_id: 'tRb6AQlz4maLZcKP7m9XW5J3BUMCh1Pp101ziVeyz8Fw',
          category: 'power ',
          title: 'Medball Overhead Toss',
          uploaded: true,
        },
        {
          video_num: 'C0900',
          id: 'oi3cNwmDmp8N7cy1nNPtLYndraSZx6ECbDKs02I2idX8',
          playback_id: 'RJryBTswaSYoG01wjrQTCKx9aXtpVUa00Ktm8E7BY01V400',
          category: 'power',
          title: 'Medball Side Toss',
          uploaded: true,
        },
        {
          video_num: 'C0901',
          id: '6H6b0202A8e3iUUxoy2Ih65OBFfYgNR3gCX201hzm4op5A',
          playback_id: 'AvyyIBNcFAP9Pf7AIoubvQpww4g1283O02Vvfyrtu6wQ',
          category: 'power',
          title: 'Medball Broad Jump',
          uploaded: true,
        },
        {
          video_num: 'C0902',
          id: 'S009m6saSecGBlk6CpHzCY9f01AqqwlG2EWlQoCMbtgRY',
          playback_id: 'ek5lZRvxUrbVzxiExJyMW7roUDR3wWJCj45MP7tPthE',
          category: 'power ',
          title: 'Medball Slam',
          uploaded: true,
        },
        {
          video_num: 'C0903',
          id: 'i0101RbpPdLaLX019zNKc4cY5DsV5TZltgJt3z6uq5QFI4',
          playback_id: 'pKpsGB02w02KqFtLLJ93Xn7kCtv01iUFv7d2jNpLjou2JI',
          category: 'power',
          title: 'Tuck Jumps',
          uploaded: true,
        },
        {
          video_num: 'C0904',
          id: 'YB1iWAxDu102wqlFHylDDD1FFxZvoUab74FE41zbsEzs',
          playback_id: 'K93QM7SdZGlqtlc1MCCnPYDkSqICyqLbLPFnmGiSn9k',
          category: 'power',
          title: 'Squat Jump',
          uploaded: true,
        },
        {
          video_num: 'C0905',
          id: 'THmxR00Wcl8Vv57DpubTiiIR4jSx3vHaNFgqeuClaUiI',
          playback_id: '2PNCqBDDjTDa49wEBVPyfKIEuzGBmMibdLK01sXtLaFY',
          category: 'power',
          title: 'Alt Lunge Jump',
          uploaded: true,
        },
        {
          video_num: 'C0906',
          id: '7kzAUT02B7zErFzTVTn02QU00zsJqXEuf9G3k02tLoajolg',
          playback_id: 'Xjon9X4p6suli008zKOvjGxlnZTGG6frKZAZR40101m6Cw',
          category: 'power',
          title: 'Skater Jumps',
          uploaded: true,
        },
      ],
    },
    {
      name: 'Hip / Ankle',
      description:
        'End-range hip isometrics boost your speed by intensifying muscle fiber recruitment, crucial for powerful hip extensions during sprints and jumps.',
      videos: [
        {
          video_num: 'C0969',
          id: 'jSSoF3HkWZeFipHuSuimlYS00pEXshHDpGuFfQf02Jzyw',
          playback_id: 'x5cqLqbbAvD8Kf6x00OMIpBfPs007KlXwUN5UJdRUjGYM',
          category: 'hip/iso',
          title: '90-90 Back-leg',
          uploaded: true,
        },
        {
          video_num: 'C0970',
          id: 'XR4a9ERw9Pj7R8LEZv001SKDRO2JGc01wg3UeIle0101ilk',
          playback_id: 'CJfyt5NPmaeY00DozNCjWIusyguenOLnadzTZgEx00t01k',
          category: 'hip/iso',
          title: '90-90 Front-leg',
          uploaded: true,
        },
        {
          video_num: 'C0971',
          id: '73KGCxgg7IQNdjoERBbI13k1sixt4d7NdJD4TXTT1JE',
          playback_id: 'Y1W4EnHXa02JIACQjxWWrKDsWm00017ARJbg500RGQ4MfzM',
          category: 'hip/iso',
          title: '90-90 Front-leg 2',
          uploaded: true,
        },
        {
          video_num: 'C0972',
          id: 'PozgZRA9ZzXjLqFNL2Ej2ubsQODgA79kq9Imt8rLgX8',
          playback_id: 'JfGibfMDRPglD4LCw1e6oI02YqYCKlHhnP8I46t9p23Y',
          category: 'hip/iso',
          title: 'Barbell Hip Iso',
          uploaded: true,
        },
        {
          video_num: 'C0973',
          id: '00TvZSlL6tJWnz6gPML61L9gniiHo77X8SEu3IzDZKfk',
          playback_id: 'AnEA00md02AIeseaOf19Isls7YEOnvoaNdLJUltUJMtpk',
          category: 'hip/iso',
          title: 'Barbell Hip Iso 2',
          uploaded: true,
        },
        {
          video_num: 'C0974',
          id: 'Yg01VHaV02jOYpYxx8d5t00QjpouKF01YCB00iwarCHiA2HI',
          playback_id: 'sGjcyqk011IKn4G502JWwS1yAPAcpndZQ1V5JLzgJ9hU8',
          category: 'hip/iso',
          title: 'Elevated Toes Squat',
          uploaded: true,
        },
        {
          video_num: 'C0975',
          id: 'kdjFmz01yiOWx1MNwUFx1UlpLbE3LvUUrhNF01GUrLEO00',
          playback_id: 'xCggbrwoj6umKH8yEVCLJlqbFlcLVC01hyby02F01nOrjA',
          category: 'hip/iso',
          title: 'Tibialis Raise',
          uploaded: true,
        },
        {
          video_num: 'C0977',
          id: 'OPGaxBOfBDTas22v2n02kb6qTK9ABKqfAXlztgf6He01o',
          playback_id: 'dmafb7TCc6KcDtTX29G00zJ5k02oL01JwKkJWyIXjQ5FyQ',
          category: 'hip/iso',
          title: 'Ankle Lean Over',
          uploaded: true,
        },
      ],
    },
    {
      name: 'Jumps/ Plyometrics',
      description:
        'Jumping plyometrics are essential for developing explosive power and blistering speed. They activate and strengthen your fast-twitch muscle fibers, which are crucial for rapid, forceful movements. Regular plyometric training translates into greater jump height and faster sprint starts, making you more dynamic in every action.',
      videos: [
        {
          video_num: 'C0907',
          id: '6dzsXjMDN6lEUDZuVvASMkcaoDCip4Thwca27Aj8vvk',
          playback_id: 'sKCg302Lfh2np5e4fzH01CZXvQKQdSYFb2QHFUEtYAe2k',
          category: 'jumps',
          title: 'Single Broad Jump',
          uploaded: true,
        },
        {
          video_num: 'C0908',
          id: '5Gb7LZ00eXGQhQ1N3SlDc5qg01CIkfSir0002ak01lbTLXHE',
          playback_id: '7m5024A2t3JkN7S5LW00Slog3J3yq007zXDLARG01Q1NQEw',
          category: 'jumps',
          title: 'Double Broad Jump',
          uploaded: true,
        },
        {
          video_num: 'C0909',
          id: 'gUzz2WGODnQdvquLjN9gq5UpAxjd01DByAiXFR1fS84w',
          playback_id: 'tpViBOaICEMtuSzswjgM1otT3bZvoQWkMUe9pzxEm7E',
          category: 'jumps',
          title: 'Triple Broad Jump',
          uploaded: true,
        },
        {
          video_num: 'C0911',
          id: 'QLz9yzRd3Dy2EedmcNJTinEUAacaRSgkRKK8VROxTkU',
          playback_id: 'SQM5jV0215xo8FXTowMVKQ02MnzkXrBe5R4ZQdpmvNovM',
          category: 'jumps',
          title: 'Single Leg Broad Jump',
          uploaded: true,
        },
        {
          video_num: 'C0912',
          id: '4mt7uVCCCnDPhBJVr005qoPdEVhUmCfgaPQMpoXMgzoE',
          playback_id: 'zVGTg6c4DbENaYswFJ9TIEDa5mfp2m0102t1st5rwANT4',
          category: 'jumps',
          title: 'Single Leg Double Broad Jump',
          uploaded: true,
        },
        {
          video_num: 'C0913',
          id: 'qTcBHHV1HqHfHHIv5A3Pr02Is58iDAGJwscWz4orDPFA',
          playback_id: 'JIM1gOuG3sdQByD1eFXnyD6egCIHPPYzSEqnQ01pMD3I',
          category: 'jumps',
          title: 'Single Leg Triple Broad Jump',
          uploaded: true,
        },
        {
          video_num: 'C0914',
          id: 'u02mWy63WYQSj335bK00d2Ki3901uJw7Rs41A31TD0102PzM',
          playback_id: 'HOwwMTNdXJbJASXVW3w47xZunbPvYjpRuBCjoBLGLlQ',
          category: 'jumps',
          title: "Knees' to Single Broad Jump",
          uploaded: true,
        },
        {
          video_num: 'C0915',
          id: 'lhX01ORKGc2EBRxERl4Mqmm502NkvdKZFgi4BXEANomUc',
          playback_id: 'tnooD1V2rD9VCzCt3KK54CFj2LZwKAnPaScWudSnVeU',
          category: 'jumps',
          title: "Knees' to Single Leg Broad Jump",
          uploaded: true,
        },
        {
          video_num: 'C0916',
          id: 'mXfSCo1emsVM01nwr7Bc3mPiT1zkvv2V7uRY00banpBk00',
          playback_id: 'DSkslkeSaXgPNlSHqE81HBBA172sJBKV6u00mZm85ZHc',
          category: 'jumps',
          title: "Weighted Knees' to Broad Jump",
          uploaded: true,
        },
        {
          video_num: 'C0917',
          id: '01CSy00ps00XMLn1CiXg8o02ZXpCYbPXJk1lhERKsbvXoUA',
          playback_id: 'Fn3xJDCWo00gUmvqPZyro8n4EqMALu6aTOpEhsL00rNXs',
          category: 'jumps',
          title: "Weighted Knees' to Single Leg Broad Jump",
          uploaded: true,
        },
        {
          video_num: 'C0918',
          id: 'F9ye30200C02GCEariL2003aw01CFlw1SNAqXdATjrU00KHF00',
          playback_id: '6RFwXg5bx1Tn0100YO8m5low00ydn1g7rRMjP8pirLgPHc',
          category: 'jumps',
          title: 'Weighted Broad Jump',
          uploaded: true,
        },
        {
          video_num: 'C0919',
          id: 'StsHjjt6oNrSGGOYQDp02GfkzX8IRZpwdFjqCEfuKY4Q',
          playback_id: 'ivrXJuPhgREwBywiuHowMA2A32K2ICVdlrrix9hUiNk',
          category: 'jumps',
          title: 'Weighted Single Leg Broad Jump',
          uploaded: true,
        },
        {
          video_num: 'C0920',
          id: '4Nwhx6nypMn3Rr5Qt5uCcr2tzPFUV6Y9WPYkcb4dO02U',
          playback_id: 'sth4mFe8MJ3GZqId3Hiy828yzuSnHr7JUnqMziye5QQ',
          category: 'jumps ',
          title: 'Single Leg, Forward, Lateral, Forward',
          uploaded: true,
        },
        {
          video_num: 'C0922',
          id: '0101GEkc02TKJL02xodjltYkAsQj1AGZ1tJ2C2AfuQYbTNo',
          playback_id: 'DjAVA01RjfGAaUeBEGzliv1KdErN1OcEZqD61aZWRi3s',
          category: 'jumps',
          title: 'Single Leg, Forward, Lateral',
          uploaded: true,
        },
        {
          video_num: 'C0949',
          id: 'JbqivvFiiEMNO6jv02IXaiPaStZ23yB9gxyer02N5GPzw',
          playback_id: 'KLamIdncGnSgEfnroEp6TATQ01JAYyXt01Ly02LGXAi1ZA',
          category: 'jumps',
          title: 'Depth Jump',
          uploaded: true,
        },
        {
          video_num: 'C0950',
          id: 'uUg3xRYo01OpfCNxB6ZPhFnAPMcU1QM01QBmE84gBNSZ8',
          playback_id: 'LSH3NDWt700Z6Ki5YhBHouBlNSSpbaSd02NZvNeOA56pA',
          category: 'jumps',
          title: 'Depth Double Jump',
          uploaded: true,
        },
        {
          video_num: 'C0951',
          id: '43201Jv21FyEKQhxn00XTJXlWpSzYz4royZdaLZSPFyJI',
          playback_id: 'ejKBYaOZq9axT4ZLzZtWJSwUK2SVLMkPbQ027msDkceg',
          category: 'jumps',
          title: 'Single Leg Depth Jump',
          uploaded: true,
        },
        {
          video_num: 'C0953',
          id: 'B4a02mLAsc3rr6nZobAhP2EM7o00qXAkzaGW6dJjRcuNU',
          playback_id: '4CCEHWcPQ00Dh1xIqycM12EkirsVMMvL6WGLcDi009bbc',
          category: 'jumps',
          title: 'Higher Depth Jump',
          uploaded: true,
        },
      ],
    },
    {
      name: 'Sprints',
      description:
        'Different sprinting variations are crucial for enhancing your speed by developing quick acceleration, sustained top-end speed, and explosive power. Each variation specifically targets and improves the muscle actions and energy systems essential for rapid, powerful movements, directly boosting your speed performance across various distances. ',
      videos: [
        {
          video_num: 'C0933',
          id: 'x3ucAsnXJwhhee00XtL02MmX6rg4wQnG2eF8Rdnq3EVno',
          playback_id: 'BwDmWY01Pp01RXGO02lDI7h3nvrOa6LR4W3lYa5XPdK9rc',
          category: 'sprint',
          title: 'Falling Sprint',
          uploaded: true,
        },
        {
          video_num: 'C0934',
          id: '0201BZUuXVlvhpS8DVY9g8v88u00ebeIL53lppNc27pEP8',
          playback_id: 'Q3OI4yImUOql01cGRgts6H5TA401X7t01KXirE2XsGrpH4',
          category: 'sprint',
          title: 'Forward Lunge to Sprint',
          uploaded: true,
        },
        {
          video_num: 'C0935',
          id: 'oqPYnc4K7ha02WSme4gK00jkSxX2VnllusH2t01A00pdAxU',
          playback_id: '00ROwl1J4qEluKa02iMMctzcErEkVWzP9UPfqd401WvnWA',
          category: 'sprint',
          title: 'Single Leg Lateral Jump Start Sprint',
          uploaded: true,
        },
        {
          video_num: 'C0936',
          id: 'igVbUx4cZPaKk7vZa1CuFtBBu7QoeCTB02gjjkwHzTP00',
          playback_id: 'rsLff4zKJtGnGnwqkI00cqhr3d2eN01wJsSymDi00Mk5hU',
          category: 'sprint',
          title: 'Backpeddle to Sprint',
          uploaded: true,
        },
        {
          video_num: 'C0937',
          id: 'VB95bvksqWJXVxBX7ENPPU4011gHYAEL7tVF9q81HynY',
          playback_id: 'qhH1gfkFu4NQs7U3owHCm9kJVVlCQoT6uDsvRNJHmeY',
          category: 'sprint',
          title: 'Hurdle to Sprint',
          uploaded: true,
        },
        {
          video_num: 'C0939',
          id: 'H1SL9ilFjXhY8Et85Cy3wNhukYVnCid8Rgz1MVYkYRg',
          playback_id: 'n02kdtMQQ36LOR02QKjLDqG00ePo02W6geD4wFxdM5p1E5A',
          category: 'sprint',
          title: 'Crossover to Sprint',
          uploaded: true,
        },
        {
          video_num: 'C0942',
          id: 'pNdkTGypvL7k6hTLN8E00Jjmr5Cionl02QY8cY7IMVPsM',
          playback_id: 'YcC4jhCgyHSngaRTlM1Oosofarsh5Oz9jsDXZu01Rb01M',
          category: 'sprint',
          title: 'Shuffle Stop to Sprint',
          uploaded: true,
        },
        {
          video_num: 'C0944',
          id: 'wDmU01oPsvq3IBJx02e00DnatfqHcH3vZA0200B8628mCzuE',
          playback_id: 'j9YKmm018ag18sNUDj3vSuo6ITZtrL4R7gaIHMZrkn1s',
          category: 'sprint',
          title: 'Pushup to Sprint',
          uploaded: true,
        },
        {
          video_num: 'C0945',
          id: '00Hag10100aEDV6zTZv4i00wpCiCWy7YEzwkhWEa3s9B3q4',
          playback_id: 'ULsEjmA15cBX1i3MNZBPnTsS00JgTUH9R00HGzJL01rY2k',
          category: 'sprint',
          title: 'Lateral Lunge to Sprint',
          uploaded: true,
        },
        {
          video_num: 'C0946',
          id: 'wKGKhyV4LSm4yx9Q4uAzIjWbZFOpQ1FUc3MV5xhLqSM',
          playback_id: '2KvYnIhUG00Y01FAjF32Y9l2rRtpncTMlr2uD6X5Z8HRI',
          category: 'sprint',
          title: 'OG Sprint',
          uploaded: true,
        },
        {
          video_num: 'C0947',
          id: 'nFUCpM02gOqcY00hnyXbB3u021zkljHMjBW00AQoXkzGneQ',
          playback_id: 'iZFnU7FHJV5x027aQps8H0102ldo4UvV73nKhxK9eR7ONQ',
          category: 'sprint',
          title: "Knees' to Single Leg Lateral to Sprint",
          uploaded: true,
        },
        {
          video_num: 'C0954',
          id: 'zKFqR4vHHQxyaoNGnsYPcmF3hwdfBfHgoY3C2H2pr68',
          playback_id: 'jLvjKZ02UKSNhBxdYzPry2aVeZUUFfwn7LP00Qsgv02L5A',
          category: 'sprint',
          title: 'Crossover to Curve Sprint',
          uploaded: true,
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Speed Training Video Library</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Master your speed with our comprehensive collection of training videos. Each category
            targets specific aspects of athletic performance to help you reach your peak potential.
          </p>
        </div>

        <div className="space-y-16">
          {speedCatalog.map((category, categoryIndex) => (
            <section key={categoryIndex} className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{category.name}</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.videos.map((exercise, i) => (
                  <Dialog key={i}>
                    <DialogTrigger asChild>
                      <div className="relative group hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <Image
                          src={`https://image.mux.com/${exercise.playback_id}/thumbnail.png`}
                          alt="Video Thumbnail"
                          width={720}
                          height={480}
                          className="aspect-video object-cover rounded-lg"
                        />
                        <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md">
                          <h3 className="text-sm font-semibold line-clamp-1">{exercise.title}</h3>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="w-full min-w-[90vw] max-w-[90vw] p-2">
                      <DialogHeader className="absolute top-2 left-2 z-4 bg-black/50 text-white px-2 py-1 rounded-md">
                        <DialogTitle>{exercise.title}</DialogTitle>
                      </DialogHeader>
                      <MuxPlayer
                        className="w-full rounded-lg shadow-lg"
                        streamType="on-demand"
                        playbackId={exercise.playback_id}
                        metadata={{
                          video_id: exercise.id,
                          video_title: exercise.title,
                        }}
                        style={{ aspectRatio: 16 / 9 }}
                      />
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
