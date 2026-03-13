import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'หน้าแรก',
      href: getPermalink('/'),
    },
    {
      text: 'ทดลองพิมพ์',
      href: getPermalink('/try'),
    },
    {
      text: 'บทความ',
      href: getPermalink('/articles'),
    },
    {
      text: 'คำถามที่พบบ่อย',
      icon: 'tabler:download',
      href: getPermalink('/faq'),
    },
  ],
  actions: [{ text: 'ดาวน์โหลด', href: '/download', icon: 'tabler:download' }],
};

export const footerData = {
  socialLinks: [
    { ariaLabel: 'Discord Guild', icon: 'tabler:brand-discord', href: 'https://discord.gg/aNbFWTmuHU' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/manoonchai/manoonchai' },
  ],
  footNote: `
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://github.com/narze">@narze</a> and <a class="text-blue-600 underline dark:text-muted" href="https://github.com/manoonchai"> Manoonchai Layout Community</a> with ❤️ and 🦶
  `,
};
