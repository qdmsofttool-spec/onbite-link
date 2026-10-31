import type { Folder, LinkItem } from "./types";

export const folders: Folder[] = [
  { id: 1, name: "개발", count: 4 },
  { id: 2, name: "디자인", count: 3 },
  { id: 3, name: "읽을거리", count: 2 },
  { id: 4, name: "기타", count: 1 },
];

export const links: LinkItem[] = [
  { id: "1", title: "Next.js 공식 문서", description: "App Router, 서버 컴포넌트, 캐싱 등 Next.js 전반을 다루는 공식 문서입니다.", url: "https://nextjs.org/docs", folderId: 1, createdAt: "2026-10-30" },
  { id: "2", title: "Tailwind CSS", description: "유틸리티 퍼스트 CSS 프레임워크 공식 사이트.", url: "https://tailwindcss.com", folderId: 1, createdAt: "2026-10-29" },
  { id: "3", title: "React 문서", description: "React 19의 새로운 기능과 레퍼런스를 확인할 수 있습니다.", url: "https://react.dev", folderId: 1, createdAt: "2026-10-28" },
  { id: "4", title: "MDN Web Docs", description: "웹 기술에 대한 신뢰할 수 있는 레퍼런스 문서.", url: "https://developer.mozilla.org", folderId: 1, createdAt: "2026-10-27" },
  { id: "5", title: "Figma", description: "협업 기반 UI 디자인 도구.", url: "https://figma.com", folderId: 2, createdAt: "2026-10-26" },
  { id: "6", title: "Dribbble", description: "디자이너들의 작업물과 영감을 모아둔 커뮤니티.", url: "https://dribbble.com", folderId: 2, createdAt: "2026-10-25" },
  { id: "7", title: "Refactoring UI", description: "개발자를 위한 실용적인 UI 디자인 팁 모음.", url: "https://refactoringui.com", folderId: 2, createdAt: "2026-10-24" },
  { id: "8", title: "Hacker News", description: "개발 관련 뉴스와 토론이 활발한 커뮤니티.", url: "https://news.ycombinator.com", folderId: 3, createdAt: "2026-10-23" },
  { id: "9", title: "Smashing Magazine", description: "웹 디자인과 개발에 대한 깊이 있는 아티클.", url: "https://smashingmagazine.com", folderId: 3, createdAt: "2026-10-22" },
  { id: "10", title: "GitHub", description: "코드 호스팅과 협업 플랫폼.", url: "https://github.com", folderId: 4, createdAt: "2026-10-21" },
];
