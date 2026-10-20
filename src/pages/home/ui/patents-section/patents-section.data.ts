import type { Patent } from '@/entities/patent/patent.types';

const buildGoogleDrivePdfUrl = (fileId: string) => `https://drive.google.com/file/d/${fileId}/view`;

const buildPatentPreviewUrl = (filePath: string) =>
  `https://ik.imagekit.io/dilanmirror/${filePath}`;

const patentDocsUrl =
  'https://drive.google.com/drive/u/3/folders/1i7uHXRGp5VNqelmnjxtZdo91f0aVlJUy';
const patentLicensesUrl =
  'https://drive.google.com/drive/folders/162FNAUwUlmxwaGWAAOVNDyMdPcJxfY3K';
const pctPatentDocUrl = 'https://drive.google.com/file/d/16IVk373yCk9PfAMivw7NaDP8-2fxnlGk/view';

type PatentDefinition = {
  code: Patent['code'];
  status: Exclude<Patent['status'], null>;
  pdfFileId: string;
  previewFileName: string;
};

const eurasianGrantedPatent = {
  pdfFileId: '1cDDV7qmdSq_9vQF2jEItc3M0E0satDv_',
  previewFileName: 'patents/granted/Patent_Eurasia.jpg',
} as const;

const europePendingPatent = {
  pdfFileId: '1US93xjNZBk4_-GOHLSNZ8jDCnhKwdhhg',
  previewFileName: 'patents/eu.png',
} as const;

const aripoPendingPatent = {
  pdfFileId: '1ksTFcZIyz_5TM-rqEkBVkWUSbkDbZe2B',
  previewFileName: 'patents/aripo.jpg',
} as const;

const sharedPatentDefinitions = (
  codes: Patent['code'][],
  status: Exclude<Patent['status'], null>,
  shared: { pdfFileId: string; previewFileName: string },
): PatentDefinition[] =>
  codes.map((code) => ({
    code,
    status,
    pdfFileId: shared.pdfFileId,
    previewFileName: shared.previewFileName,
  }));

const mockPatentDefinitions: PatentDefinition[] = [
  {
    code: 'au',
    status: 'confirmed',
    pdfFileId: '1tpXrZeQPl5-Cm_dE0wiXo5vZ3XGAakhQ',
    previewFileName: 'patents/au2.jpg',
  },
  ...sharedPatentDefinitions(
    ['az', 'am', 'by', 'kg', 'kz', 'ru', 'tj', 'tm'],
    'confirmed',
    eurasianGrantedPatent,
  ),
  {
    code: 'ae',
    status: 'pending',
    pdfFileId: '1t8CatoTi7sE52u07SypQVZCykGGHNyOT',
    previewFileName: 'patents/ae.jpg',
  },
  ...sharedPatentDefinitions(
    [
      'al',
      'at',
      'be',
      'bg',
      'ch',
      'cy',
      'cz',
      'de',
      'dk',
      'ee',
      'es',
      'fi',
      'gb',
      'gr',
      'hr',
      'hu',
      'ie',
      'is',
      'it',
      'li',
      'lt',
      'lu',
      'lv',
      'mc',
      'md',
      'me',
      'mk',
      'mt',
      'nl',
      'no',
      'pl',
      'pt',
      'ro',
      'rs',
      'se',
      'si',
      'sk',
      'sm',
    ],
    'pending',
    europePendingPatent,
  ),
  ...sharedPatentDefinitions(
    ['bw', 'gh', 'gm', 'ke', 'ls', 'mw', 'tz'],
    'pending',
    aripoPendingPatent,
  ),
  {
    code: 'bh',
    status: 'pending',
    pdfFileId: '1zurVTJEux1aFU7O31gRHgJ6gWgYMidoQ',
    previewFileName: 'patents/bh.jpg',
  },
  {
    code: 'br',
    status: 'pending',
    pdfFileId: '1c4TlAVpSo24k2gKZ6TTL0sSN5FcupdRR',
    previewFileName: 'patents/br.jpg',
  },
  {
    code: 'ca',
    status: 'pending',
    pdfFileId: '1DQ6RtRDp_9pneSKhzwzItG8Q7V50RouV',
    previewFileName: 'patents/ca.jpg',
  },
  {
    code: 'cn',
    status: 'pending',
    pdfFileId: '1PQrtD6xYRPPBCmjy13Qk8LtBWifsbgBH',
    previewFileName: 'patents/cn.jpg',
  },
  {
    code: 'eg',
    status: 'pending',
    pdfFileId: '1NQc3fDtJc9E61ij68xZxF2IACkRse0PK',
    previewFileName: 'patents/eg.jpg',
  },
  {
    code: 'fr',
    status: 'pending',
    pdfFileId: '1WBRIICtOuUl4h4NDD9waCEfixwc7Kv7v',
    previewFileName: 'patents/fr.png',
  },
  {
    code: 'hk',
    status: 'pending',
    pdfFileId: '1H2JGw_38z1PVhvEqYvMqSsQy-w1gcNbI',
    previewFileName: 'patents/hk.jpg',
  },
  {
    code: 'id',
    status: 'pending',
    pdfFileId: '1VoNNl_uUb-vjvfGqX_YB61GVclIlJYH8',
    previewFileName: 'patents/id.jpg',
  },
  {
    code: 'il',
    status: 'pending',
    pdfFileId: '1z3uwzDHddBEzlV-0X2MfpbRA1W1uYfCx',
    previewFileName: 'patents/il.jpg',
  },
  {
    code: 'in',
    status: 'pending',
    pdfFileId: '1OM1p30Ggk2-mCdbFBom2XKoCJacEdCLX',
    previewFileName: 'patents/in.jpg',
  },
  {
    code: 'jp',
    status: 'pending',
    pdfFileId: '1uptQbVOSC6s7wve7QKADAjDvdUzhohWd',
    previewFileName: 'patents/jp.jpg',
  },
  {
    code: 'kr',
    status: 'pending',
    pdfFileId: '1Oy5Vvh-zPx_CU3ZMEYjTXwivezx7cZBN',
    previewFileName: 'patents/kr.jpg',
  },
  {
    code: 'kw',
    status: 'pending',
    pdfFileId: '1dY4n4m2O8KyMUZgIgzmKwT3dsiX0-kR6',
    previewFileName: 'patents/kw.jpg',
  },
  {
    code: 'mx',
    status: 'pending',
    pdfFileId: '1iErSvnoczOsbgCpHZDmUE0_oMSqVwMu0',
    previewFileName: 'patents/mx.jpg',
  },
  {
    code: 'nz',
    status: 'pending',
    pdfFileId: '1JDs2ltF3aULLDQgscwMdmOBWXSS-B_QB',
    previewFileName: 'patents/nz.jpg',
  },
  {
    code: 'om',
    status: 'pending',
    pdfFileId: '1W9wPjMvfmin5BaMqQ2cZ3i7hXiSkTkJR',
    previewFileName: 'patents/om.jpg',
  },
  {
    code: 'qa',
    status: 'pending',
    pdfFileId: '1g66nGxvv3G-Z6ObxP8t2OsC3DEKWS8w4',
    previewFileName: 'patents/qa.jpg',
  },
  {
    code: 'sa',
    status: 'pending',
    pdfFileId: '1dfQYmiEmTDQH3nLKOucCRz0AGdZbbtMX',
    previewFileName: 'patents/sa.jpg',
  },
  {
    code: 'sg',
    status: 'pending',
    pdfFileId: '1xHzDzLkh3ht-7oQHp5eyxC98bzdvrbBg',
    previewFileName: 'patents/sg.jpg',
  },
  {
    code: 'th',
    status: 'pending',
    pdfFileId: '1UObqtG6-mgaQQCD4TOi5mHnqsAS4HEzC',
    previewFileName: 'patents/th.jpg',
  },
  {
    code: 'tr',
    status: 'pending',
    pdfFileId: '1YNLSx3CWmfkMlidz6f9oCBKAYAQnKU53',
    previewFileName: 'patents/tr.jpg',
  },
  {
    code: 'ua',
    status: 'pending',
    pdfFileId: '1udNtnxvijLv8wNbj4MFCaIYihofAC1Of',
    previewFileName: 'patents/ua.jpg',
  },
  {
    code: 'us',
    status: 'pending',
    pdfFileId: '11cgCpsx7gdvJvuVZU-IVlHE8o2AYyFJw',
    previewFileName: 'patents/us.jpg',
  },
  {
    code: 'vn',
    status: 'pending',
    pdfFileId: '1QSjPn5RNu7mH6OgBlKCpn1QtW2cTy6l0',
    previewFileName: 'patents/vn.jpg',
  },
];

const mockPatents: Patent[] = mockPatentDefinitions.map(
  ({ code, status, pdfFileId, previewFileName }) => ({
    code,
    status,
    pdf: buildGoogleDrivePdfUrl(pdfFileId),
    url: buildPatentPreviewUrl(previewFileName),
  }),
);

export const patentsSectionLinks = {
  docsUrl: patentDocsUrl,
  licensesDocUrl: patentLicensesUrl,
  pctDocUrl: pctPatentDocUrl,
} as const;

export { mockPatents };
